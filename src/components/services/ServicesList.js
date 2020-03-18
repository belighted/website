import React from "react";
import {useStaticQuery, graphql, Link} from "gatsby";

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
          <Link to={`/services/${node.slug}`}>{node.title}</Link>
        </li>
      ))}
    </ul>
  );
};

export default ServicesList;
