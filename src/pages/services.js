import React from "react";
import Layout from "../components/layout/Layout";
import { graphql } from "gatsby";
import { findSection, Section } from "../components/layout/Section";
import ProcessesList from "../components/processes/ProcessesList";
import CategoriesList from "../components/categories/CategoriesList";
import TechnologiesList from "../components/partials/technologies/TechnologiesList";
import HeroServices from "../components/services/hero/HeroServices";
import LeadingBrands from "../components/splits/LeadingBrands";
import HubspotForm from "../components/forms/HubspotForm";

const ServicesPage = ({
  pageContext,
  data: {
    contentYaml: { sections, formId }
  }
}) => {
  return (
    <Layout context={pageContext} page={"services"}>
      <HeroServices section={findSection(sections, "hero")} />
      <Section section={findSection(sections, "process")}>
        <ProcessesList />
      </Section>
      <LeadingBrands />
      <Section
        section={findSection(sections, "categories")}
        modifier={"light-bg"}
        withoutEyebrow={true}
      >
        <CategoriesList showServices />
      </Section>
      <Section section={findSection(sections, "technologies")}>
        <TechnologiesList />
      </Section>
      <section className="c-section c-section--dark-bg">
        <HubspotForm formId={formId} />
      </section>
    </Layout>
  );
};

export default ServicesPage;

export const query = graphql`
  query ServicesPage($lang: String!) {
    contentYaml(slug: { eq: "services" }, lang: { eq: $lang }) {
      title
      formId
      sections {
        slug
        title
        body
      }
    }
  }
`;
