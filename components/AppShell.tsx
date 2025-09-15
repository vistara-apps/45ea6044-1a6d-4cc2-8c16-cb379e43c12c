'use client';

import { ReactNode } from 'react';

interface AppShellProps {
  children: ReactNode;
  variant?: 'default' | 'glass';
}

export function AppShell({ children, variant = 'default' }: AppShellProps) {
  const shellClasses = variant === 'glass' 
    ? 'backdrop-blur-md bg-surface/80' 
    : 'bg-surface';

  return (
    <div className={`min-h-screen ${shellClasses}`}>
      <div className="relative">
        {children}
      </div>
    </div>
  );
}
