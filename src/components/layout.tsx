import React from 'react';
import Head from 'next/head';

import Header from './header';

type LayoutProps = React.PropsWithChildren<{}>;

const Layout: React.FunctionComponent<LayoutProps> = ({ children }: LayoutProps) => (
  <>
    <Head>
      <title>Next.js with Auth0</title>
    </Head>

    <Header />

    <main>
      <div className="container">{children}</div>
    </main>
  </>
);

export default Layout;
