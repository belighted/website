import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout/Layout";
import LinkToService from "../components/services/LinkToService";

const RelatedCategory = ({ category, services, service }) => (
  <section className="c-section">
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
    <article className="o-wrapper">
      <section className="c-section">
        <h2>{post.title}</h2>
      </section>

      {post.sections &&
        post.sections.map(section => (
          <div className={"c-section"}>
            <div
              className="o-wrapper c-wysiwyg"
              dangerouslySetInnerHTML={{ __html: section }}
            />
          </div>
        ))}

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
      sections
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
