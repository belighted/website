import React, {useContext} from "react";
import { useStaticQuery, graphql } from "gatsby";
import LinkToCase from "./LinkToCase";
import {I18nContext} from "../i18n/I18n";

const CasesList = () => {
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
    <ul className={'c-cases-list'}>
      {nodes.filter(node=>node.lang === lang).map(node => (
        <li key={node.slug}>
          <h4 className="c-h4">
            <LinkToCase slug={node.slug}>
              {node.title ? node.title : node.slug}
            </LinkToCase>
          </h4>
        </li>
      ))}
    </ul>
  );
};

export default CasesList;
