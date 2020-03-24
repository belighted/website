import React, { useContext } from "react";
import { useStaticQuery, graphql } from "gatsby";
import LinkToCase from "./LinkToCase";
import { I18nContext } from "../i18n/I18n";

const CasesList = ({ limit = 50 }) => {
  const {
    allCasesYaml: { nodes }
  } = useStaticQuery(graphql`
    {
      allCasesYaml {
        nodes {
          slug
          title
          lang
        }
      }
    }
  `);
  const lang = useContext(I18nContext);
  return (
    <ul className={"o-list-bare c-cases-list"}>
      {nodes

        .filter(node => node.lang === lang)
        .slice(0, limit)
        .map(node => (
          <li key={node.slug} className="c-body c-body--2 u-margin-bottom-tiny">
            <LinkToCase slug={node.slug}>
              {node.title ? node.title : node.slug}
            </LinkToCase>
          </li>
        ))}
    </ul>
  );
};

export default CasesList;
