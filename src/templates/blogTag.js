import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout/Layout";
import { SectionHeader } from "../components/sections";
import BlogList from "../components/blog/BlogList";

const BlogTag = ({
  data: {
    allPostsYaml: { nodes }
  },
  pageContext
}) => (
  <Layout context={pageContext} page={"blog"}>
    <section className={"o-wrapper c-section"}>
      <SectionHeader title={"Blog"} body={pageContext.title} />
      <BlogList nodes={nodes} />
    </section>
  </Layout>
);

export const query = graphql`
  query MyQuery($tag: String!, $lang: String!) {
    allPostsYaml(
      filter: {
        lang: { eq: $lang }
        tags: { elemMatch: { value: { eq: $tag } } }
      }
    ) {
      nodes {
        ...BlogPostItem
      }
    }
  }
`;

export default BlogTag;
