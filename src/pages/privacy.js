import React from "react";
import Layout from "../components/layout/Layout";
import { graphql } from "gatsby";

const AboutPage = ({
  pageContext,
  data: {
    markdownRemark: {
      html,
      frontmatter: { title }
    }
  }
}) => {
  return (
    <Layout context={pageContext} page={"privacy"}>
      <main className="c-section">
        <div className="o-wrapper">
          <div className="c-heading c-heading--1 u-margin-bottom">{title}</div>
          <div
            className="c-wysiwyg"
            dangerouslySetInnerHTML={{ __html: html }}
          ></div>
        </div>
      </main>
    </Layout>
  );
};

export default AboutPage;

export const query = graphql`
  query PrivacyPage($lang: String!) {
    markdownRemark(
      frontmatter: { slug: { eq: "privacy" }, lang: { eq: $lang } }
    ) {
      html
      frontmatter {
        title
      }
    }
  }
`;
