import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import LinkToService from "../services/LinkToService";
import LinkToCategory from "./LinkToCategory";

const CategoriesList = ({ showServices }) => {
  const {
    allCategoriesYaml: { nodes: categories },
    allServicesYaml: { nodes: services }
  } = useStaticQuery(graphql`
    {
      allCategoriesYaml(sort: { fields: order }) {
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
        <li key={node.slug} id={node.slug} className={"u-margin-bottom-large"}>
          <h4 className="c-heading c-heading--3">{node.title}</h4>

          <div className="c-body c-body--2 u-margin-bottom">{node.short_description}</div>

          {!showServices && (
            <p className={"u-margin-top"}>
              <LinkToCategory
                slug={node.slug}
              >{`More about ${node.title}`}</LinkToCategory>
            </p>
          )}

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
