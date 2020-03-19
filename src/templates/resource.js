import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout/Layout";
import DevNote from "../components/dev/DevNote";

const ServicePage = ({
  data: {
    resourcesYaml: post,
  },
  pageContext
}) => (
  <Layout context={pageContext} page={"blog"}>
    <article className="o-wrapper">
      <section className="c-section">
        <h2>{post.title}</h2>
        <DevNote>Description of {post.slug}</DevNote>
      </section>
    </article>
  </Layout>
);

export const query = graphql`
  query($slug: String!) {
    resourcesYaml(slug: { eq: $slug }) {
      slug
      title
    }
  }
`;

export default ServicePage;
