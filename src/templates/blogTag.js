import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout/Layout";
import BlogList from "../components/blog/BlogList";
import LocalizedLink from "../components/links/LocalizedLink";

const BlogTag = ({
  data: {
    posts: { nodes }
  },
  pageContext
}) => (
  <Layout context={pageContext} page={"blog"} title={"The belighted blog"}>
    <section className={"o-wrapper c-section"}>
      <h1 className="c-heading c-heading--1">
        <LocalizedLink to={`/blog`}>Belighted blog</LocalizedLink>
        {" >  "}
        {pageContext.title}
      </h1>
      <BlogList nodes={nodes} />
    </section>
  </Layout>
);

export const query = graphql`
  query MyQuery($tag: String!, $lang: String!) {
    posts: allMarkdownRemark(
      sort: { fields: frontmatter___date, order: [DESC] }
      filter: {
        fields: { collection: { eq: "articles" } }
        frontmatter: {
          lang: { eq: $lang }
          tags: { elemMatch: { value: { eq: $tag } } }
        }
      }
    ) {
      nodes {
        ...BlogPostItem
      }
    }
  }
`;

export default BlogTag;
