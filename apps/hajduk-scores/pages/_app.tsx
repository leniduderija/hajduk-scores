import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from '../common/createEmotionCache';
import theme from '../common/theme';
import Layout from '../components/layout/Layout';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface CustomAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function CustomApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: CustomAppProps) {
  return (
    <CacheProvider value={emotionCache}>
      <ChakraProvider theme={theme}>
        <Layout>
          <Head>
            <title>Hajduk Scores</title>
          </Head>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </CacheProvider>
  );
}

export default CustomApp;
