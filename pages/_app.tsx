import { CacheProvider, EmotionCache } from '@emotion/react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { getName } from '../common/name-helper'
import { protectedRoutes } from '../common/protected-routes'
import createEmotionCache from '../components/create-emotion-cache'
import theme from '../components/theme'

const clientSideEmotionCache = createEmotionCache()

interface MyAppProperties extends AppProps {
  emotionCache?: EmotionCache
}

function MyApp(properties: MyAppProperties) {
  const router = useRouter()

  useEffect(() => {
    const name = getName()

    if (protectedRoutes[router.pathname] && name === null) {
      router.push('/login')
    }

    if (!protectedRoutes[router.pathname] && name !== null) {
      router.push('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps,
  } = properties
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  )
}

export default MyApp
