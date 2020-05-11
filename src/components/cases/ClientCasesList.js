import React, { useContext } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { I18nContext } from "../i18n/I18n";
import CaseCard from "./components/CaseCard";

const ClientsCasesList = ({ limit = 50 }) => {
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
    <ul className="o-list-bare c-cases-list l-grid--4cols@wide l-grid--2cols@medium">
      {nodes
        .filter(node => node.lang === lang)
        .slice(0, limit)
        .map(node => (
          <li key={node.slug} className="u-margin-bottom">
            <CaseCard node={node} />
          </li>
        ))}
    </ul>
  );
};

export default ClientsCasesList;
