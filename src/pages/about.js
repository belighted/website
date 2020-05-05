import React from "react";
import Layout from "../components/layout/Layout";
import { graphql } from "gatsby";
import { findSection, Section } from "../components/layout/Section";
import History from "../components/about/History";
import Team from "../components/about/Team";
import Pride from "../components/about/Pride";
import LastScene from "../components/splits/LastScene";
import Jobs from "../components/about/Jobs";
import Culture from "../components/splits/Culture";
import Gallery from "../components/about/Gallery";

const AboutPage = ({
  pageContext,
  data: {
    singlesYaml: { title, sections, history, pride, gallery },
    culture
  }
}) => {
  return (
    <Layout context={pageContext} page={"services"} title={title}>
      <section className="c-section">
        <div className="o-wrapper">
          <h1 className="c-heading c-heading--1 c-heading--title">{title}</h1>
        </div>
      </section>
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
      <Section section={findSection(sections, "pride")} withoutEyebrow>
        <Pride pride={pride} />
      </Section>
      <Culture culture={culture} />
      <Jobs section={findSection(sections, "jobs")} />
      <Gallery gallery={gallery} />
    </Layout>
  );
};

export default AboutPage;

export const query = graphql`
  query($lang: String!) {
    singlesYaml(slug: { eq: "about" }, lang: { eq: $lang }) {
      title
      sections {
        slug
        title
        body
        link
      }
      gallery {
        title
        subtitle
        image {
          childImageSharp {
            fluid(maxWidth: 960, maxHeight: 48, cropFocus: ATTENTION) {
              ...GatsbyImageSharpFluid
            }
          }
        }
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
    culture : mdx(
      frontmatter: { slug: { eq: "culture" }, lang: { eq: $lang } }
    ) {
      frontmatter {
        title
        values {
          key
          value
        }
      }
      body
    }
  }
`;
