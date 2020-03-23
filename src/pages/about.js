import React from "react";
import Layout from "../components/layout/Layout";
import { graphql } from "gatsby";
import { findSection, Section } from "../components/sections";
import History from "../components/partials/history/History";
import Team from "../components/partials/team/Team";
import Pride from "../components/partials/pride/Pride";

const AboutPage = ({
  pageContext,
  data: {
    contentYaml: { title, sections }
  }
}) => {
  return (
    <Layout context={pageContext} page={"services"}>
      <div className="o-wrapper">
        <h1>{title}</h1>
      </div>
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
