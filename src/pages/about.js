import React from "react";
import Layout from "../components/layout/Layout";
import { graphql } from "gatsby";
import { findSection, Section } from "../components/layout/Section";
import History from "../components/splits/history/History";
import Team from "../components/splits/team/Team";
import Pride from "../components/splits/pride/Pride";
import LastScene from "../components/splits/LastScene";
import Jobs from "../components/about/jobs/Jobs";

const AboutPage = ({
  pageContext,
  data: {
    contentYaml: { sections }
  }
}) => {
  return (
    <Layout context={pageContext} page={"services"}>
      <LastScene />
      <Section section={findSection(sections, "team")}>
        <Team />
      </Section>
      <Section
        section={findSection(sections, "history")}
        modifier={"light-bg"}
        withoutEyebrow
      >
        <History />
      </Section>
      <Jobs section={findSection(sections, "jobs")} />
      <Section section={findSection(sections, "pride")} withoutEyebrow>
        <Pride />
      </Section>
    </Layout>
  );
};

export default AboutPage;

export const query = graphql`
  {
    contentYaml(slug: { eq: "about" }) {
      title
      sections {
        slug
        title
        body
        link
      }
    }
  }
`;
