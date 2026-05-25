import { AppProps } from 'next/app'
import React from 'react'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import localFont from 'next/font/local'

const GeistSans = localFont({
  src: '../fonts/geist-sans/Geist-Variable.woff2',
  variable: '--font-geist-sans',
  weight: '100 900',
})

const GeistMono = localFont({
  src: '../fonts/geist-mono/GeistMono-Variable.woff2',
  variable: '--font-geist-mono',
  weight: '100 900',
})
import './globals.css'

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <div className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <Component {...pageProps} />
      <Analytics />
      <SpeedInsights />
    </div>
  )
}
