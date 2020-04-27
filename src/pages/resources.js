import React from "react";
import Layout from "../components/layout/Layout";
import ResourcesList from "../components/resources/ResourcesList";
import { SectionHeader } from "../components/layout/Section";
import CustomConsultation from "../components/splits/CustomConsultation";
import { graphql } from "gatsby";

const ResourcesPage = ({
  pageContext,
  data: {
    contentYaml: { title, body },
    allResourcesYaml: { nodes: resources },
    customConsultation
  }
}) => {
  return (
    <Layout context={pageContext} page={"resources"}>
      <section className="o-wrapper c-section">
        <SectionHeader title={title} body={body} />
        <ResourcesList resources={resources} />
        <CustomConsultation customConsultation={customConsultation} />
      </section>
    </Layout>
  );
};

export default ResourcesPage;

export const query = graphql`
  query($lang: String!) {
    customConsultation: mdx(
      frontmatter: { slug: { eq: "custom-consultation" }, lang: { eq: $lang } }
    ) {
      frontmatter {
        title
        cta {
          title
          link
        }
      }
      body
    }
    contentYaml(slug: { eq: "resources" }, lang: { eq: $lang }) {
      title
      body
    }
    allResourcesYaml(filter: { lang: { eq: $lang } }) {
      nodes {
        slug
        title
      }
    }
  }
`;
