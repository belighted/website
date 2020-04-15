import React from "react";
import { SectionHeader } from "../components/layout/Section";
import Layout from "../components/layout/Layout";
import { graphql } from "gatsby";
import LintToJob from "../components/jobs/LinkToJob";

const CareersPage = ({ pageContext, data }) => {
  const {
    allMarkdownRemark: { nodes: jobs },
    contentYaml
  } = data;

  return (
    <Layout context={pageContext} page={"careers"}>
      <section className="c-section c-section--light-bg">
        <div className="o-wrapper">
          <SectionHeader title={contentYaml.title} body={contentYaml.body} />
        </div>
      </section>
      <section className={"c-section"}>
        <div className="o-wrapper">
          <ul className="o-list-bare l-grid l-grid--4cols">
            {jobs.map(job => (
              <li className="o-box o-box--light-bg">
                <h2>{job.frontmatter.title}</h2>
                <LintToJob slug={job.frontmatter.slug}>
                  {contentYaml.cta.title}
                </LintToJob>
              </li>
            ))}
          </ul>
        </div>
      </section>
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
    contentYaml(slug: { eq: "careers" }, lang: { eq: $lang }) {
      title
      body
      cta {
        title
      }
    }
  }
`;

export default CareersPage;
