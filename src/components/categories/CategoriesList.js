import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import LinkToService from "../services/LinkToService";

const CategoriesList = ({ showServices }) => {
  const {
    allCategoriesYaml: { nodes: categories },
    allServicesYaml: { nodes: services }
  } = useStaticQuery(graphql`
    {
      allCategoriesYaml {
        nodes {
          slug
          title
          short_description
          services
        }
      }
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
      {categories.map(node => (
        <li key={node.slug}>
          <h4>{node.title}</h4>
          <div>{node.short_description}</div>
          {showServices && (
            <ul>
              {node.services.map(slug => (
                <li key={slug}>
                  <LinkToService slug={slug}>
                    {services.find(service => service.slug === slug).title}
                  </LinkToService>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
};

export default CategoriesList;
