import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import LintToJob from "./LinkToJob";

const JobsList = () => {
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
    <ul>
      {jobs.map(job => (
        <li>
          <LintToJob slug={job.frontmatter.slug}>
            {job.frontmatter.title}
          </LintToJob>
        </li>
      ))}
    </ul>
  );
};

export default JobsList;
