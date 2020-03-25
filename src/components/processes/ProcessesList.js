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
    <ol className="l-grid l-grid--2cols">
      {nodes.map((node, index) => (
        <li key={node.slug} className={"u-margin-bottom-large"}>
          <span className="c-heading c-heading--1">{index+1}</span>
          <span className="c-heading c-heading--1 u-color-brand-5">.</span>
          <h4 className={"c-heading c-heading--3"}>{node.title}</h4>

          <div>{node.intro}</div>
          <p className={"u-margin-top"}>
            <LinkToService slug={node.slug}>More info</LinkToService>
          </p>
        </li>
      ))}
    </ol>
  );
};

export default ProcessesList;
