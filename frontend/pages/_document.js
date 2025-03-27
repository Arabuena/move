import { Html, Head, Main, NextScript } from 'next/document'
import crypto from 'crypto'

function generateNonce() {
  return crypto.randomBytes(16).toString('base64')
}

export default function Document() {
  const nonce = generateNonce()

  return (
    <Html lang="pt-BR">
      <Head nonce={nonce}>
        <meta httpEquiv="Content-Security-Policy" content={`script-src 'self' 'nonce-${nonce}' 'unsafe-inline' 'unsafe-eval' https://*.googleapis.com https://*.crisp.chat`} />
        <link rel="icon" type="image/svg+xml" href="/icon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript nonce={nonce} />
      </body>
    </Html>
  )
} 