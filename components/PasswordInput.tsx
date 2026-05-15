'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

type Props = {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  minLength?: number;
};

export function PasswordInput({
  value,
  onChange,
  placeholder = 'password',
  required = true,
  minLength,
}: Props) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input
        type={show ? 'text' : 'password'}
        required={required}
        minLength={minLength}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 pr-12 rounded-full bg-cream border border-ink/15 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-candy"
      />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full text-ink-mute hover:text-ink hover:bg-rose-light flex items-center justify-center transition-colors"
        aria-label={show ? 'Hide password' : 'Show password'}
        tabIndex={-1}
      >
        {show ? <EyeOff size={15} /> : <Eye size={15} />}
      </button>
    </div>
  );
}
