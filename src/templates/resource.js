import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout/Layout";
import Slices from "../components/slices/Slices";
import OurHistory from "../components/splits/OurHistory";

const ServicePage = ({
  data: { resourcesYaml: post, history },
  pageContext
}) => (
  <Layout context={pageContext} page={"resource"}>
    <section className="c-section">
      <div className="o-wrapper">
        <h1 className="c-heading c-heading--1 c-heading--title">
          {post.title}
        </h1>
      </div>
      <article>{post.slices && <Slices slices={post.slices} />}</article>
    </section>
    <OurHistory history={history} />
  </Layout>
);

export const query = graphql`
  query($slug: String!, $lang: String!) {
    resourcesYaml(slug: { eq: $slug }, lang: { eq: $lang }) {
      slug
      title
      slices {
        title
        type
        subtitle
        id
        body
      }
    }
    history: markdownRemark(
      frontmatter: { slug: { eq: "our-history" }, lang: { eq: $lang } }
    ) {
      frontmatter {
        title
        cta {
          title
          link
        }
      }
      html
    }
  }
`;

export default ServicePage;
