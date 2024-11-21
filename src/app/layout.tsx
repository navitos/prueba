import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Layout from '@/components/Layout';
import { AuthProvider } from '@/services/auth-context'; 
import { Toaster } from 'react-hot-toast'; 
import { CartProvider } from '@/app/cart/cart_provider';

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
          <CartProvider> 
            <Layout>{children}</Layout>
          </CartProvider>
        </AuthProvider>
        <Toaster position="top-right" reverseOrder={false} />
      </body>
    </html>
  );
}
