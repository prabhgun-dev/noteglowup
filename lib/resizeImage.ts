/**
 * Resize an image File in the browser to keep the upload under Vercel's 4.5 MB body limit.
 * Returns a JPEG File scaled so the longest edge is at most `maxEdge` pixels.
 * Falls back to the original file if the browser can't decode the source
 * (e.g. HEIC on non-Safari) — caller should handle that case if needed.
 */
export async function resizeImage(
  file: File,
  maxEdge = 1568,
  quality = 0.85,
): Promise<File> {
  // Skip resize for very small files — saves time on already-tiny uploads
  if (file.size < 800_000) return file;

  return new Promise<File>((resolve) => {
    const url = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      const ratio = Math.min(maxEdge / img.width, maxEdge / img.height, 1);
      const width = Math.round(img.width * ratio);
      const height = Math.round(img.height * ratio);

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        URL.revokeObjectURL(url);
        return resolve(file);
      }

      // White background so JPEG conversion of transparent PNGs looks clean
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          URL.revokeObjectURL(url);
          if (!blob) return resolve(file);
          const name = file.name.replace(/\.[^.]+$/, '') + '.jpg';
          resolve(new File([blob], name, { type: 'image/jpeg' }));
        },
        'image/jpeg',
        quality,
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      // Browser couldn't decode — fall back to original file (server may handle e.g. HEIC)
      resolve(file);
    };

    img.src = url;
  });
}
