import React from "react";
import { SectionHeader } from "../components/sections";
import Layout from "../components/layout/Layout";
import { graphql, useStaticQuery } from "gatsby";
import LintToJob from "../components/jobs/LinkToJob";

const CareersPage = ({ pageContext }) => {
  const {
    allMarkdownRemark: { nodes: jobs }
  } = useStaticQuery(graphql`
    {
      allMarkdownRemark(filter: { fields: { collection: { eq: "jobs" } } }) {
        nodes {
          frontmatter {
            title
            slug
          }
        }
      }
    }
  `);

  return (
    <Layout context={pageContext} page={"careers"}>
      <section className="c-section c-section--light-bg">
        <div className="o-wrapper">
          <SectionHeader
            title={"Join Our Team"}
            body={"Pride in our craft. Pride in our team."}
          />
        </div>
      </section>
      <section className={"c-section"}>
        <div className="o-wrapper">
          <ul className="o-list-bare l-grid l-grid--4cols">
            {jobs.map(job => (
              <li className="o-box o-box--light-bg">
                <h2>{job.frontmatter.title}</h2>
                <LintToJob slug={job.frontmatter.slug}>
                  see this job opening
                </LintToJob>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Layout>
  );
};

export default CareersPage;
