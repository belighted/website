import React, { useContext } from "react";
import { useStaticQuery, graphql } from "gatsby";
import Case from "./Case";
import { I18nContext } from "../../../i18n/I18n";

const CasesList = () => {
  const {
    allCasesYaml: { nodes }
  } = useStaticQuery(graphql`
    {
      allCasesYaml {
        nodes {
          ...HomeCaseItem
        }
      }
    }
  `);
  const lang = useContext(I18nContext);
  return (
    <ul className={"o-list-bare c-cases-list"}>
      {nodes

        .filter(node => node.lang === lang)
        .map(node => (
          <li key={node.slug} className="c-cases-list__item">
            <Case node={node} />
          </li>
        ))}
    </ul>
  );
};

export default CasesList;
