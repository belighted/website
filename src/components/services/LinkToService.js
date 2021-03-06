import React, { useContext } from "react";
import { I18nContext } from "../i18n/I18n";
import { Link } from "gatsby";
import locales from "../../constants/locales";

const LinkToService = ({ slug, children }) => {
  const lang = useContext(I18nContext);

  return <Link to={`${locales[lang].path}/services/${slug}`}>{children}</Link>;
};

export default LinkToService;
