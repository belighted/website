import React from "react";
import Header from "./Header";
import Helmet from "react-helmet";
import useSiteMetadata from "../../static_queries/useSiteMetadata";
import Footer from "./Footer";
import "../../scss/index.scss";
import { I18nContext } from "../i18n/I18n";

export default function Layout({ context, children, page }) {
  const { title, description } = useSiteMetadata();

  return (
    <I18nContext.Provider value={context.lang}>
      <div className='l-layout'>
        <Helmet>
          <html lang={context.lang} />
          <title>{title}</title>
          <meta name="description" content={description} />
          <link rel="shortcut icon" href="/logo-belighted.png" />
        </Helmet>
        <Header page={page} context={context} />
        <div className={"l-layout__body"}>{children}</div>
        <Footer page={page} context={context} />
      </div>
    </I18nContext.Provider>
  );
}
