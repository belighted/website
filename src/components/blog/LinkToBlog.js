import React, { useContext } from "react";
import { I18nContext } from "../i18n/I18n";
import { Link } from "gatsby";
import locales from "../../constants/locales";
import LocalizedLink from "../links/LocalizedLink";

const LinkToBlog = ({ slug, children }) => {
  return <LocalizedLink children={children} route={`/blog/${slug}`} />;
};

export default LinkToBlog;
