import React, { useEffect } from "react";
import Header from "./Header";
import Helmet from "react-helmet";
import useSiteMetadata from "../../static_queries/useSiteMetadata";
import Footer from "./Footer";
import "../../scss/index.scss";
import { I18nContext } from "../i18n/I18n";
import SubFooter from "./components/SubFooter";
import { MDXProvider } from "@mdx-js/react";
import HubspotForm from "../forms/HubspotForm";
import moment from "moment";
import 'moment/locale/fr';

const shortcodes = { HubspotForm };

export default function Layout({ context, children, page, title }) {
  const { description } = useSiteMetadata();
  useEffect(() => {
    moment.locale(context.lang);
    return () => {};
  }, [context.lang]);

  return (
    <MDXProvider components={shortcodes}>
      <I18nContext.Provider value={context.lang}>
        <div className="l-global-layout">
          <Helmet>
            <html lang={context.lang} />
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="shortcut icon" href="/logo-belighted.png" />
          </Helmet>
          <div className="l-global-layout__nav">
            <Header page={page} context={context} />
          </div>
          <div className={"l-global-layout__body"}>{children}</div>
          <Footer page={page} context={context} />
          <SubFooter page={page} context={context} />
        </div>
      </I18nContext.Provider>
    </MDXProvider>
  );
}
