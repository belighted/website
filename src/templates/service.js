import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout/Layout";
import Slices from "../components/slices/Slices";

const ServicePage = ({
  data: {
    servicesYaml: service,
    categoriesYaml: category,
    allServicesYaml: services
  },
  pageContext
}) => (
  <Layout
    context={pageContext}
    page={`/services/${service.slug}`}
    title={service.title}
  >
    <article>{service.slices && <Slices slices={service.slices} />}</article>
  </Layout>
);

export const query = graphql`
  query($slug: String!, $lang: String!) {
    servicesYaml(slug: { eq: $slug }, lang: { eq: $lang }) {
      slug
      title
      slices {
        title
        type
        subtitle
        id
        body
        list
        image {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
        process {
          id
          title
          body
        }
        columns {
          title
          body
        }
        cta {
            link
            label
        }
      }
    }
    categoriesYaml(services: { in: [$slug] }) {
      title
      short_description
      services
    }
    allServicesYaml {
      nodes {
        slug
        title
      }
    }
  }
`;

export default ServicePage;
