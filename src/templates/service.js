import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout/Layout";
import Slices from "../components/slices/Slices";
import HubspotForm from "../components/forms/HubspotForm";

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
    <div className="o-wrapper l-content-sidebar">
      <article>{service.slices && <Slices slices={service.slices} />}</article>
      {service.aside && (
        <aside className="u-padding-vertical">
          <h2 className="c-heading c-heading--3">{service.aside.title}</h2>
          {service.aside.subtitle && (
            <h3 className="c-heading c-heading--4">{service.aside.subtitle}</h3>
          )}
          <HubspotForm formId={service.aside.formId} />
        </aside>
      )}
    </div>
  </Layout>
);

export const query = graphql`
  query($slug: String!, $lang: String!) {
    servicesYaml(slug: { eq: $slug }, lang: { eq: $lang }) {
      slug
      layout
      aside {
        title
        subtitle
        formId
      }
      title
      slices {
        title
        type
        subtitle
        id
        body
        list
        links {
          excerpt
          frontmatter {
            title
            image {
              childImageSharp {
                fluid(maxWidth: 250) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
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
