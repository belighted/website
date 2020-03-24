import React from "react";
import Layout from "../components/layout/Layout";
import { graphql } from "gatsby";
import { findSection, Section } from "../components/sections";
import History from "../components/about/history/History";
import Team from "../components/about/team/Team";
import Pride from "../components/about/pride/Pride";
import Img from "gatsby-image";

const AboutPage = ({
  pageContext,
  data: {
    contentYaml: { title, sections },
    lastScene: { childImageSharp: lastScene }
  }
}) => {
  return (
    <Layout context={pageContext} page={"services"}>
      <Img fluid={lastScene.fluid} />
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
    lastScene: file(relativePath: { eq: "about/last_scene.jpeg" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;
