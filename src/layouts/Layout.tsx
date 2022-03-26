import NavBar from '@components/navbar';
import Head from 'next/head';
import { ReactNode } from 'react';

export type LayoutProps = {
  title?: string;
  children: ReactNode;
};

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title || 'technical-test-spacedevs'}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />

      {children}
    </>
  );
};

export default Layout;
