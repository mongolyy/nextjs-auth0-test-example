import React from 'react';
import type { AppProps } from 'next/app';
import { UserProvider } from '@auth0/nextjs-auth0';
import Layout from '../components/layout';

export default function App({ Component, pageProps }: AppProps): React.ReactElement<AppProps> {
  const { user } = pageProps;

  return (
    <UserProvider user={user}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  );
}
