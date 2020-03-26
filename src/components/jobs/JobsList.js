import React from "react";
import { useStaticQuery, graphql } from "gatsby";

const JobsList = () => {
  const {
    allMarkdownRemark: { nodes: jobs }
  } = useStaticQuery(graphql`
    {
      allMarkdownRemark(filter: { fields: { collection: { eq: "jobs" } } }) {
        nodes {
          frontmatter {
            title
          }
        }
      }
    }
  `);
  return <ul>{jobs.map(job=><li>{job.frontmatter.title}</li>)}</ul>;
};

export default JobsList;
