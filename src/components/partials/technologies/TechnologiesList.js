import React from "react";
import { useStaticQuery, graphql } from "gatsby";

const TechnlologiesList = () => {
  const {
    dataYaml: { technologies }
  } = useStaticQuery(graphql`
    {
      dataYaml(slug: { eq: "technologies" }) {
        technologies {
          value
        }
      }
    }
  `);
  return (
    <ul>
      {technologies.map(node => (
        <li key={node.value}>
          <span>{node.value}</span>
        </li>
      ))}
    </ul>
  );
};

export default TechnlologiesList;
