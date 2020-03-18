/* components/Layout.tsx */

import { Fragment, FunctionComponent } from 'react';
import Head from 'next/head';

interface ILayoutProps {
  pageTitle: string;
}

const Layout: FunctionComponent<ILayoutProps> = props => {
  return (
    <Fragment>
      <Head>
        <meta charSet='utf-8' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, shrink-to-fit=no'
        />
        <title>{props.pageTitle || 'Live Polls App'}</title>
      </Head>
      {props.children}
    </Fragment>
  );
};

export default Layout;
