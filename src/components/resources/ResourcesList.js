import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import LinkToResource from "./LinkToResource";

const ResourcesList = () => {
  const {
    allResourcesYaml: { nodes }
  } = useStaticQuery(graphql`
    {
      allResourcesYaml {
        nodes {
          slug
          title
        }
      }
    }
  `);
  return (
    <ul className="">
      {nodes.map(node => (
        <li key={node.slug} className={"u-margin-bottom"}>
          <LinkToResource slug={node.slug}>{node.title}</LinkToResource>
        </li>
      ))}
    </ul>
  );
};

export default ResourcesList;
