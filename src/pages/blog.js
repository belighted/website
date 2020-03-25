import React from "react";
import Layout from "../components/layout/Layout";
import BlogList from "../components/BlogList";
import { SectionHeader } from "../components/sections";

const BlogPage = ({ pageContext }) => {
  return (
    <Layout context={pageContext} page={"blog"}>
      <section className={"o-wrapper c-section"}>
        <SectionHeader
          title={"Latest SaaS & Software Stories"}
          body={"Popular on our blog right now"}
        />
        <BlogList />
      </section>
    </Layout>
  );
};

export default BlogPage;
