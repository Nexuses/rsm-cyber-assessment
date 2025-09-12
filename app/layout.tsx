import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'RSM Cyber Assessment Tool',
  description: 'RSM Cyber Assessment Tool',
  generator: 'RSM Cyber Assessment Tool',
  icons: {
    icon: 'https://22527425.fs1.hubspotusercontent-na2.net/hubfs/22527425/RSM%20Kuwait%20ESG/Favicon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
