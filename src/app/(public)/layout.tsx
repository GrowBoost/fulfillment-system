import React from 'react';
// The root layout (app/layout.tsx) already handles <html> and <body> tags,
// as well as global styles and theme providers.
// This public layout should only render its children.

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>{children}</>
  );
}
