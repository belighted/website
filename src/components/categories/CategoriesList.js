import React, { useContext } from "react";
import { useStaticQuery, graphql } from "gatsby";
import LinkToCategory from "./LinkToCategory";
import { I18nContext } from "../i18n/I18n";

const CategoriesList = ({ showServices }) => {
  const lang = useContext(I18nContext);
  const {
    allCategoriesYaml: { nodes: categories }
  } = useStaticQuery(graphql`
    {
      allCategoriesYaml(sort: { fields: order }) {
        nodes {
          lang
          slug
          title
          short_description
          list
        }
      }
    }
  `);
  return (
    <ul className="o-list-bare l-grid l-grid--2cols@medium">
      {categories
        .filter(c => c.lang === lang)
        .map(node => (
          <li
            key={node.slug}
            id={node.slug}
            className={"u-margin-bottom-large"}
          >
            <h4 className="c-heading c-heading--3">{node.title}</h4>

            <div className="c-body c-body--2 u-margin-bottom">
              {node.short_description}
            </div>

            {!showServices && (
              <p className={"u-margin-top"}>
                <LinkToCategory
                  slug={node.slug}
                >{`More about ${node.title}`}</LinkToCategory>
              </p>
            )}

            {showServices && (
              <ul>
                {node.list.map(slug => (
                  <li key={slug}>{slug}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
    </ul>
  );
};

export default CategoriesList;
