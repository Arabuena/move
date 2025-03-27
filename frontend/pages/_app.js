import Head from 'next/head';
import '../styles/globals.css'
import { motion, AnimatePresence } from 'framer-motion'

function MyApp({ Component, pageProps, router }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="theme-color" content="#6366f1" />
        <meta httpEquiv="Content-Security-Policy" content="base-uri 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://*.crisp.chat; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.googleapis.com https://*.crisp.chat; img-src 'self' blob: data: https://*.googleapis.com https://*.gstatic.com https://*.crisp.chat; font-src 'self' data: https://fonts.gstatic.com; connect-src 'self' https://*.googleapis.com https://move-k987.onrender.com/api wss://*.crisp.chat; frame-src 'self' https://*.googleapis.com https://*.crisp.chat; worker-src 'self' blob:; child-src blob:; form-action 'self'; manifest-src 'self'; media-src 'self' https://*.crisp.chat; object-src 'none'; default-src 'self' https://*.crisp.chat wss://*.crisp.chat" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <AnimatePresence mode="wait">
        <motion.div
          key={router.route}
          initial="initialState"
          animate="animateState"
          exit="exitState"
          transition={{
            duration: 0.75
          }}
          variants={{
            initialState: {
              opacity: 0,
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
            },
            animateState: {
              opacity: 1,
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
            },
            exitState: {
              clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)",
            },
          }}
        >
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
    </>
  )
}

export default MyApp 