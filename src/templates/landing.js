import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout/Layout";
import { MDXRenderer } from "gatsby-plugin-mdx";

const Landing = ({
  data: {
    mdx: {
      body,
      frontmatter: { slug, title }
    }
  },
  pageContext
}) => {
  return (
    <Layout context={pageContext} page={slug} title={title}>
      <div className="o-wrapper c-wysiwyg">
        <MDXRenderer>{body}</MDXRenderer>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query LandingPage($lang: String!, $slug: String!) {
    mdx(frontmatter: { slug: { eq: $slug }, lang: { eq: $lang } }) {
      frontmatter {
        title
        slug
      }
      body
    }
  }
`;

export default Landing;
