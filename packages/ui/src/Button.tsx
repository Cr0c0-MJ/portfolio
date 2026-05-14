import type { ButtonHTMLAttributes, ReactNode } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'ghost';
}

export function Button({ children, variant = 'primary', style, ...rest }: ButtonProps) {
  const base = {
    padding: '0.6rem 1.1rem',
    borderRadius: 8,
    border: '1px solid currentColor',
    cursor: 'pointer',
    fontWeight: 500,
  } as const;

  const palette =
    variant === 'primary'
      ? { background: '#111', color: '#fff', borderColor: '#111' }
      : { background: 'transparent', color: '#111' };

  return (
    <button {...rest} style={{ ...base, ...palette, ...style }}>
      {children}
    </button>
  );
}
