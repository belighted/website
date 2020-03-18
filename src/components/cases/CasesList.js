import React from "react";
import { useStaticQuery, graphql } from "gatsby";

const CasesList = () => {
  const {
    allCasesYaml: { nodes }
  } = useStaticQuery(graphql`
    {
      allCasesYaml {
        nodes {
          slug
          title
        }
      }
    }
  `);
  return (
      <ul>
        {nodes.map(node => (
            <li key={node.slug}>
              <h4>{node.title}</h4>
            </li>
        ))}
      </ul>
  );
};

export default CasesList;
