import React from "react";
import Layout from "../components/layout/Layout";
import ResourcesList from "../components/resources/ResourcesList";
import { SectionHeader } from "../components/layout/Section";
import { graphql } from "gatsby";
import ApplicationCost from "../components/splits/ApplicationCost";

const ResourcesPage = ({
  pageContext,
  data: {
    contentYaml: { title, body },
    allResourcesYaml: { nodes: resources }
  }
}) => {
  return (
    <Layout context={pageContext} page={"resources"}>
      <section className="o-wrapper c-section">
        <SectionHeader title={title} body={body} />
        <ResourcesList resources={resources} />
        <ApplicationCost />
      </section>
    </Layout>
  );
};

export default ResourcesPage;

export const query = graphql`
  query($lang: String!) {
    contentYaml(slug: { eq: "resources" }, lang: { eq: $lang }) {
      title
      body
    }
    allResourcesYaml(filter: { lang: { eq: $lang } }, sort: {fields: [order], order: [ASC]}) {
      nodes {
        slug
        title
        image {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
