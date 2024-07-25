import type { Metadata } from 'next';
import { Oxygen } from 'next/font/google';

import './globals.css';
import ModalContainer from '@/components/client/ModalContainer';

const inter = Oxygen({ subsets: ['latin', 'latin-ext'], weight: ['300', '400', '700'] });

export const metadata: Metadata = {
  title: 'SaturnApp',
  description: 'My personal app.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <ModalContainer />
      </body>
    </html>
  );
}
