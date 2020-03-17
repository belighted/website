import React from "react";
import Header from "./Header";
import Helmet from "react-helmet";
import useSiteMetadata from "../../static_queries/useSiteMetadata";
import Footer from "./Footer";
import "../../scss/index.scss";

export default function Layout({ context, children, page }) {
  const { title, description } = useSiteMetadata();

  return (
    <section>
      <Helmet>
        <html lang={context.lang} />
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <Header page={page} context={context} lang={"fr"} />
      <div className={""}>{children}</div>
      <Footer page={page} context={context} lang={"fr"} />
    </section>
  );
}
