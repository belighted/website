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
import CustomConsultation from "../components/splits/CustomConsultation";

const ServicesPage = ({
  pageContext,
  data: {
    contentYaml: { sections, formId },
    customConsultation
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

      <section className="c-section">
        <div className="o-wrapper">
          <HubspotForm formId={formId} />
        </div>
      </section>
      <CustomConsultation customConsultation={customConsultation} />
    </Layout>
  );
};

export default ServicesPage;

export const query = graphql`
  query ServicesPage($lang: String!) {
    customConsultation: markdownRemark(
      frontmatter: { slug: { eq: "custom-consultation" }, lang: { eq: $lang } }
    ) {
      frontmatter {
        title
        cta {
          title
          link
        }
      }
      html
    }
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
