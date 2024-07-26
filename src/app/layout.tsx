import type { Metadata } from 'next';
import { Rubik } from 'next/font/google';

import './globals.css';
import ModalContainer from '@/components/client/ModalContainer';
import SessionProvider from '@/components/client/SessionProvider';

const inter = Rubik({ subsets: ['latin', 'latin-ext'] });

export const metadata: Metadata = {
  title: 'SaturnApp',
  description: 'My personal app.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          {children}
          <ModalContainer />
        </SessionProvider>
      </body>
    </html>
  );
}
