import React, { useContext } from "react";
import { I18nContext } from "../i18n/I18n";
import { Link } from "gatsby";
import locales from "../../constants/locales";

const LocalizedLink = ({ route, children }) => {
  const lang = useContext(I18nContext);

  return <Link to={`${locales[lang].path}${route}`}>{children}</Link>;
};

export default LocalizedLink;
