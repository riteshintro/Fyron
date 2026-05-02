import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { RootProvider } from 'fumadocs-ui/provider';
import 'fumadocs-ui/style.css';

export const metadata: Metadata = {
  title: {
    template: '%s | Fyron',
    default: 'Fyron — Laravel-style Node.js framework',
  },
  description:
    'Fyron is a Laravel-inspired Node.js framework built on Fastify 5, Drizzle ORM, and TypeScript.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
