import React from "react";
import Layout from "../components/Layout";
import BlogList from "../components/BlogList";

export default function IndexPage({ pageContext }) {
  return (
    <Layout context={pageContext} page={"home"}>
      <section>
        Belighted
        <BlogList />
      </section>
    </Layout>
  );
}
