import type { FC } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import React from 'react';

interface SeoProps {
  title?: string;
}

export const Seo: FC<SeoProps> = (props) => {
  const { title } = props;

  const fullTitle = title ? title + ' | SMS: Show My Service' : 'Dashboard';

  return (
    <Head>
      <title>{fullTitle}</title>
    </Head>
  );
};

Seo.propTypes = {
  title: PropTypes.string,
};
