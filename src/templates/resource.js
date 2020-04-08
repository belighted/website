import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout/Layout";
import Slices from "../components/slices/Slices";
import OurHistory from "../components/splits/OurHistory";

const ServicePage = ({ data: { resourcesYaml: post }, pageContext }) => (
  <Layout context={pageContext} page={"blog"}>
    <article>{post.slices && <Slices slices={post.slices} />}</article>
    <OurHistory />
  </Layout>
);

export const query = graphql`
  query($slug: String!) {
    resourcesYaml(slug: { eq: $slug }) {
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
  }
`;

export default ServicePage;
