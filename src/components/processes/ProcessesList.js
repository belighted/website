import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import LinkToService from "../services/LinkToService";

const ProcessesList = () => {
  const {
    allProcessYaml: { nodes }
  } = useStaticQuery(graphql`
    {
      allProcessYaml {
        nodes {
          slug
          title
          intro
        }
      }
    }
  `);
  return (
    <ol className="">
      {nodes.map(node => (
        <li key={node.slug}>
          <LinkToService slug={node.slug}>
            <h4 className={"c-h4"}>{node.title}</h4>
          </LinkToService>
          <div>{node.intro}</div>
          <LinkToService slug={node.slug}>More info</LinkToService>
        </li>
      ))}
    </ol>
  );
};

export default ProcessesList;
