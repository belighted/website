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
    contentYaml: { sections, history, pride },
    culture
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
        <History history={history} />
      </Section>
      <Jobs section={findSection(sections, "jobs")} />
      <Culture culture={culture} />
      <Section section={findSection(sections, "pride")} withoutEyebrow>
        <Pride pride={pride} />
      </Section>
    </Layout>
  );
};

export default AboutPage;

export const query = graphql`
  query($lang: String!) {
    contentYaml(slug: { eq: "about" }, lang: { eq: $lang }) {
      title
      sections {
        slug
        title
        body
        link
      }
      pride {
        title
        subtitle
        body
        image {
          childImageSharp {
            fixed(width: 350, height: 200) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
      history {
        date
        event
        image {
          childImageSharp {
            fixed(width: 160, height: 160) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
    culture: markdownRemark(
      frontmatter: { slug: { eq: "culture" }, lang: { eq: $lang } }
    ) {
      frontmatter {
        title
        values {
          key
          value
        }
      }
      html
    }
  }
`;
