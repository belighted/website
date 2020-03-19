import React, { useContext } from "react";
import { I18nContext } from "../i18n/I18n";
import { Link } from "gatsby";
import locales from "../../constants/locales";

const LinkToResource = ({ slug, children }) => {
  const lang = useContext(I18nContext);

  return <Link to={`${locales[lang].path}/resources/${slug}`}>{children}</Link>;
};

export default LinkToResource;
