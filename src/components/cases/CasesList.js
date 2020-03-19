import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import LinkToCase from "./LinkToCase";

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
          <LinkToCase slug={node.slug}>
            <h4>{node.title}</h4>
          </LinkToCase>
        </li>
      ))}
    </ul>
  );
};

export default CasesList;
