import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import PageHeader from '@/components/page-header'
import '@rainbow-me/rainbowkit/styles.css';
import { Providers } from './providers';


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tributary',
  description: 'Where Support Flows, Impact Grows',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
        <body className={inter.className}>
          <Providers>
            <main className="bg-blue-800 text-white flex min-h-screen flex-col p-8">
              <PageHeader />
              {children}
            </main>
          </Providers>
        </body>
    </html>
  )
}
