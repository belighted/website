import React from "react";
import LinkToResource from "./LinkToResource";
import GatsbyImage from "gatsby-image";

const ResourcesList = ({ resources }) => {
  return (
    <ul className="o-list-bare l-grid l-grid--3cols">
      {resources.map(node => (
        <li key={node.slug} className={"u-margin-bottom"}>
          {node.image && <GatsbyImage fluid={node.image.childImageSharp.fluid} />}
          <LinkToResource slug={node.slug}>{node.title}</LinkToResource>
        </li>
      ))}
    </ul>
  );
};

export default ResourcesList;
