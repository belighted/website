import React from "react";
import Header from "./Header";
import Helmet from "react-helmet";
import useSiteMetadata from "../static_queries/useSiteMetadata";

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
    </section>
  );
}
