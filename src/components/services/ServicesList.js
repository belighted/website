import React from "react";
import { useStaticQuery, graphql } from "gatsby";

const ServicesList = () => {
  const {
    allServicesYaml: { nodes }
  } = useStaticQuery(graphql`
    {
      allServicesYaml {
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
          {node.title}
        </li>
      ))}
    </ul>
  );
};

export default ServicesList;
