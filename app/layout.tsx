import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import WhatsAppButton from '@/components/WhatsAppButton'
import { ThemeProvider } from '@/components/ThemeContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
          title: 'SIVAKASI KARGIL CRACKERS - Premium Fireworks & Crackers',
  description: 'Premium quality fireworks and crackers for all occasions. Best prices, wide selection, and safe delivery across South India.',
  keywords: 'crackers, fireworks, diwali crackers, new year crackers, sparklers, rockets, fountains',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="pt-24">
        <ThemeProvider>
          {children}
          <WhatsAppButton />
        </ThemeProvider>
      </body>
    </html>
  )
} 