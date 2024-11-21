import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Layout from '@/components/Layout'
import { AuthProvider } from '@/services/auth-context'  // Importa el AuthProvider

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GRATUS',
  description: 'Your one-stop shop for all things',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider> {/* Envuelve el Layout en el AuthProvider */}
          <Layout>{children}</Layout>
        </AuthProvider>
      </body>
    </html>
  )
}