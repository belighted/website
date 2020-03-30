import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout/Layout";

const BlogArticle = ({ data: { postsYaml: post }, pageContext }) => (
  <Layout context={pageContext} page={"blog"}>
    <article>
      <h2>{post.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: post.body }}></div>
    </article>
  </Layout>
);

export const query = graphql`
  query($slug: String!) {
    postsYaml(slug: { eq: $slug }) {
      slug
      title
      body
    }
  }
`;

export default BlogArticle;
