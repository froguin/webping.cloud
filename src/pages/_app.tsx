import { AppProps } from 'next/app'
import React from 'react'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  )
}
