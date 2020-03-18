import React from "react";
import { useStaticQuery, graphql } from "gatsby";

const ProcessesList = () => {
  const {
    allProcessYaml: { nodes }
  } = useStaticQuery(graphql`
    {
      allProcessYaml {
        nodes {
          slug
          title
          intro
        }
      }
    }
  `);
  return (
    <ul>
      {nodes.map(node => (
        <li key={node.slug}>
          <h4>{node.title}</h4>
          <div>{node.intro}</div>
        </li>
      ))}
    </ul>
  );
};

export default ProcessesList;
