import React from "react";
import Layout from "../components/layout/Layout";
import { graphql } from "gatsby";
import { findSection, Section } from "../components/sections";
import History from "../components/about/history/History";
import Team from "../components/about/team/Team";
import Pride from "../components/about/pride/Pride";
import LastScene from "../components/splits/LastScene";

const AboutPage = ({
  pageContext,
  data: {
    contentYaml: { sections },
  }
}) => {
  return (
    <Layout context={pageContext} page={"services"}>
      <LastScene />
      <Section section={findSection(sections, "team")}>
        <Team />
      </Section>
      <Section section={findSection(sections, "history")}>
        <History />
      </Section>

      <Section section={findSection(sections, "pride")}>
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
      }
    }
  }
`;
