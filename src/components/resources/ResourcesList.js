import React from "react";
import LinkToResource from "./LinkToResource";

const ResourcesList = ({ resources }) => {
  return (
    <ul className="">
      {resources.map(node => (
        <li key={node.slug} className={"u-margin-bottom"}>
          <LinkToResource slug={node.slug}>{node.title}</LinkToResource>
        </li>
      ))}
    </ul>
  );
};

export default ResourcesList;
