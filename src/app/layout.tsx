import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import Providers from '@/components/providers';
import { Grid } from '@mui/material';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Helpdesk',
  description: 'Your favorite facebook helpdesk'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Providers>
          <Grid
            sx={{
              height: '100vh',
              width: '100vw'
            }}
          >
            {children}
          </Grid>
        </Providers>
      </body>
    </html>
  );
}
