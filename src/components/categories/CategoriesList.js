import React from "react";
import { useStaticQuery, graphql } from "gatsby";

const CategoriesList = () => {
  const {
    allCategoriesYaml: { nodes }
  } = useStaticQuery(graphql`
    {
      allCategoriesYaml {
        nodes {
          slug
          title
          short_description
        }
      }
    }
  `);
  return (
    <ul>
      {nodes.map(node => (
        <li key={node.slug}>
          <h4>{node.title}</h4>
          <div>{node.short_description}</div>
        </li>
      ))}
    </ul>
  );
};

export default CategoriesList;
