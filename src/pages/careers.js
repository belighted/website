import React from "react";
import { SectionHeader } from "../components/layout/Section";
import Layout from "../components/layout/Layout";
import { graphql } from "gatsby";
import LintToJob from "../components/jobs/LinkToJob";
import OurHistory from "../components/splits/OurHistory";
import Culture from "../components/splits/Culture";

const CareersPage = ({ pageContext, data }) => {
  const {
    allMarkdownRemark: { nodes: jobs },
    singlesYaml,
    history,
    culture
  } = data;

  return (
    <Layout context={pageContext} page={"careers"} title={singlesYaml.title}>
      <section className="c-section c-section--light-bg">
        <div className="o-wrapper">
          <SectionHeader title={singlesYaml.title} body={singlesYaml.body} />
        </div>
      </section>
      <section className={"c-section"}>
        <div className="o-wrapper">
          <ul className="o-list-bare l-grid l-grid--4cols">
            {jobs.map(job => (
              <li className="o-box o-box--light-bg">
                <h2>{job.frontmatter.title}</h2>
                <LintToJob slug={job.frontmatter.slug}>
                  {singlesYaml.cta.title}
                </LintToJob>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Culture culture={culture} />
      <OurHistory history={history} />
    </Layout>
  );
};

export const query = graphql`
  query($lang: String!) {
    allMarkdownRemark(
      filter: {
        fields: { collection: { eq: "jobs" } }
        frontmatter: { status: { eq: "published" } }
      }
    ) {
      nodes {
        frontmatter {
          title
          slug
        }
      }
    }
    history: mdx(
      frontmatter: { slug: { eq: "our-history" }, lang: { eq: $lang } }
    ) {
      frontmatter {
        title
      }
      body
    }
    culture: mdx(
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
    singlesYaml(slug: { eq: "careers" }, lang: { eq: $lang }) {
      title
      body
      cta {
        title
      }
    }
  }
`;

export default CareersPage;
