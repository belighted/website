import React from "react";
import Layout from "../components/layout/Layout";
import BlogList from "../components/blog/BlogList";
import { SectionHeader } from "../components/layout/Section";
import { graphql } from "gatsby";

const BlogPage = ({
  pageContext,
  data: {
    allPostsYaml: { nodes }
  }
}) => {
  return (
    <Layout context={pageContext} page={"blog"}>
      <section className={"o-wrapper c-section"}>
        <SectionHeader
          title={"Latest SaaS & Software Stories"}
          body={"Popular on our blog right now"}
        />
        <BlogList nodes={nodes} />
      </section>
    </Layout>
  );
};

export const query = graphql`
  {
    allPostsYaml(
      sort: { fields: [date], order: DESC }
      filter: { lang: { eq: "en" } }
    ) {
      nodes {
        ...BlogPostItem
      }
    }
  }
`;

export default BlogPage;
