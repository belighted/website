import React from "react";
import Layout from "../components/layout/Layout";
import { graphql } from "gatsby";
import { findSection, Section } from "../components/layout/Section";
import History from "../components/about/history/History";
import Team from "../components/about/team/Team";
import Pride from "../components/about/pride/Pride";
import LastScene from "../components/splits/LastScene";
import Jobs from "../components/about/jobs/Jobs";
import Culture from "../components/splits/Culture";

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
      <Culture/>
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
