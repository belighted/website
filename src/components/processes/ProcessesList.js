import React, { useContext } from "react";
import { useStaticQuery, graphql } from "gatsby";
import LinkToService from "../services/LinkToService";
import { I18nContext } from "../i18n/I18n";

const ProcessesList = () => {
  const {
    allProcessYaml: { nodes }
  } = useStaticQuery(graphql`
    {
      allProcessYaml(sort: { order: [ASC], fields: [order] }) {
        nodes {
          lang
          slug
          title
          intro
          button {
            label
          }
          objective
          duration
          description
        }
      }
    }
  `);

  const lang = useContext(I18nContext);
  return (
    <ol className="l-grid l-grid--2cols@medium">
      {nodes
        .filter(node => node.lang === lang)
        .map((node, index) => (
          <li key={node.slug} className={"u-margin-bottom-large"}>
            <span className="c-heading c-heading--1">{index + 1}</span>
            <span className="c-heading c-heading--1 u-color-brand-5">.</span>
            <h4 className={"c-heading c-heading--3"}>{node.title}</h4>
            <h5 className={"c-heading c-heading--5"}>
              <strong>{node.objective}</strong>
              <br />
              {node.duration}
            </h5>
            <div className="u-margin-bottom">
              <strong>{node.intro}</strong>
            </div>
            <div>{node.description}</div>

            <p className={"u-margin-top"}>
              <LinkToService slug={node.slug}>
                {node.button.label}
              </LinkToService>
            </p>
          </li>
        ))}
    </ol>
  );
};

export default ProcessesList;
