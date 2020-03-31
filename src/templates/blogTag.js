import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout/Layout";
import BlogList from "../components/blog/BlogList";
import LocalizedLink from "../components/links/LocalizedLink";

const BlogTag = ({
  data: {
    allPostsYaml: { nodes }
  },
  pageContext
}) => (
  <Layout context={pageContext} page={"blog"}>
    <section className={"o-wrapper c-section"}>
      <h1 className="c-heading c-heading--1">
        <LocalizedLink route={`/blog`}>
          Belighted blog
        </LocalizedLink>{" >  "}
        {pageContext.title}
      </h1>
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
