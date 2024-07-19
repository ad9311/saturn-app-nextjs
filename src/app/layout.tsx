import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import SessionProvider from './auth/sign-in/SessionProvider';
import './globals.css';
import ClientProvider from '@/providers/ClientProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SaturnApp',
  description: 'My personal app.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <ClientProvider>{children}</ClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
