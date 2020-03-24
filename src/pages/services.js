import React from "react";
import Layout from "../components/layout/Layout";
import { graphql } from "gatsby";
import { findSection, Section } from "../components/sections";
import ProcessesList from "../components/processes/ProcessesList";
import CategoriesList from "../components/categories/CategoriesList";
import TechnologiesList from "../components/partials/technologies/TechnologiesList";

const ServicesPage = ({
  pageContext,
  data: {
    contentYaml: { title, sections }
  }
}) => {
  return (
    <Layout context={pageContext} page={"services"}>
      <Section section={findSection(sections, "hero")}></Section>
      <Section section={findSection(sections, "process")}>
          <ProcessesList/>
      </Section>
      <Section section={findSection(sections, "categories")}>
          <CategoriesList showServices/>
      </Section>
      <Section section={findSection(sections, "technologies")}>
          <TechnologiesList/>
      </Section>
    </Layout>
  );
};

export default ServicesPage;

export const query = graphql`
  {
    contentYaml(slug: { eq: "services" }) {
      title
      sections {
        slug
        title
        body
      }
    }
  }
`;