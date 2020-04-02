import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout/Layout";
import LinkToService from "../components/services/LinkToService";
import Slices from "../components/slices/Slices";

const RelatedCategory = ({ category, services, service }) => (
  <section className="c-section">
    <div className="o-wrapper">
      <h3 className="c-section__header c-h3">
        Discover our other services for {category.title}
      </h3>
      <ul>
        {category.services
          .filter(slug => slug !== service.slug)
          .map(slug => (
            <li key={slug}>
              <LinkToService slug={slug}>{slug}</LinkToService>
            </li>
          ))}
      </ul>
    </div>
  </section>
);

const ServicePage = ({
  data: {
    servicesYaml: post,
    categoriesYaml: category,
    allServicesYaml: services
  },
  pageContext
}) => (
  <Layout context={pageContext} page={"blog"}>
    <article>
      {post.slices && <Slices slices={post.slices} />}

      {category && (
        <RelatedCategory
          category={category}
          services={services}
          service={post}
        />
      )}
    </article>
  </Layout>
);

export const query = graphql`
  query($slug: String!) {
    servicesYaml(slug: { eq: $slug }) {
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
