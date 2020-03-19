import React, { useContext } from "react";
import { I18nContext } from "../i18n/I18n";
import { Link } from "gatsby";
import locales from "../../constants/locales";
import LocalizedLink from "../links/LocalizedLink";

const LinkToCase = ({ slug, children }) => {
  return <LocalizedLink children={children} route={`/clients/${slug}`} />;
};

export default LinkToCase;
