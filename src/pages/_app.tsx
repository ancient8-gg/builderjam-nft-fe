import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { darkTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit';

import { ToastProvider } from '../components/Toast';

import { config } from '../wagmi';

const ancient8Theme = darkTheme({
  accentColor: '#c3c3c3',
  accentColorForeground: '#53c709',
  borderRadius: 'none',
});

const client = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <RainbowKitProvider theme={ancient8Theme}>
          <Head>
            <title>Ancient8 BuilderJam NFT</title>
            <link href='/favicon.png' rel='icon' />
          </Head>
          <ToastProvider>
            <Component {...pageProps} />
          </ToastProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default MyApp;
