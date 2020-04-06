import React, { useContext } from "react";
import { I18nContext } from "../i18n/I18n";
import { Link } from "gatsby";
import locales from "../../constants/locales";

const LocalizedLink = ({ to, children, className }) => {
  const lang = useContext(I18nContext);

  return (
    <Link className={className} to={`${locales[lang].path}${to}`}>
      {children}
    </Link>
  );
};

export default LocalizedLink;
