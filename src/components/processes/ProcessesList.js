import React from "react";
import { useStaticQuery, graphql } from "gatsby";
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
        <li key={node.slug} className={'u-margin-bottom-large'}>
          <h4 className={"c-h4"}>
            <LinkToService slug={node.slug}>{node.title}</LinkToService>
          </h4>

          <div>{node.intro}</div>
          <LinkToService slug={node.slug}>More info</LinkToService>
        </li>
      ))}
    </ol>
  );
};

export default ProcessesList;
