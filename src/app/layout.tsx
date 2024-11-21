import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Layout from '@/components/Layout';
import { AuthProvider } from '@/services/auth-context'; // Importa el AuthProvider
import { Toaster } from 'react-hot-toast'; // Importa Toaster

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GRATUS',
  description: 'Your one-stop shop for all things',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Layout>{children}</Layout>
          <Toaster position="top-right" reverseOrder={false} />
        </AuthProvider>
      </body>
    </html>
  );
}
