import type { FC } from "react";
import Head from "next/head";
import PropTypes from "prop-types";

interface SeoProps {
  title?: string;
}

export const Seo: FC<SeoProps> = (props) => {
  const { title } = props;

  const fullTitle = title
    ? title + " - MDA - Kham suc khoe"
    : "MDA - Khám sức khoẻ";

  return (
    <Head>
      <title>{fullTitle}</title>
    </Head>
  );
};

Seo.propTypes = {
  title: PropTypes.string,
};
