import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import LinkToCategory from "../../../categories/LinkToCategory";
import LinkToService from "../../../services/LinkToService";

const FooterServices = ({ showServices }) => {
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
    <ul className="o-list-bare c-footer-services">
      {categories.map(node => (
        <li key={node.slug} id={node.slug} className={"c-footer-services__item"}>
          <h4>
            <LinkToCategory slug={node.slug}>{node.title}</LinkToCategory>
          </h4>

          <ul>
            {node.services.map(slug => (
              <li key={slug}>
                <LinkToService slug={slug}>
                  {services.find(service => service.slug === slug).title}
                </LinkToService>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};

export default FooterServices;
