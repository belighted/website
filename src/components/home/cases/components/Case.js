import React, { useContext } from "react";
import { graphql } from "gatsby";
import ClientLogo from "../../../clients/ClientLogo";
import LinkToCase from "../../../cases/LinkToCase";
import { I18nContext } from "../../../i18n/I18n";
import LocalizedLink from "../../../links/LocalizedLink";

const Case = ({ node }) => {
  const lang = useContext(I18nContext);
  return (
    <div className="l-grid l-grid--2cols@medium">
      <div>
        <ClientLogo slug={node.slug} />
        <h5 className="c-heading c-heading--invert c-heading--5">
          {node.title}
        </h5>
        <div
          className="c-wysiwyg c-wysiwyg--dark"
          dangerouslySetInnerHTML={{ __html: node.body }}
        />
        <div className="u-margin-top">
          {!node.link && (
            <LinkToCase slug={node.slug}>
              {lang === "en"
                ? "Read full case study"
                : "Lire l'étude de cas complète"}
            </LinkToCase>
          )}
          {node.link && (
            <LocalizedLink to={node.link}>
              {lang === "en"
                ? "Read full case study"
                : "Lire l'étude de cas complète"}
            </LocalizedLink>
          )}
        </div>
      </div>
      <div>
        <ul>
          {node.results.map(result => (
            <li
              className="c-wysiwyg c-wysiwyg--dark"
              key={result}
              dangerouslySetInnerHTML={{ __html: result }}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export const HomeCaseItem = graphql`
  fragment HomeCaseItem on SinglesYamlCases {
    slug
    title
    results
    link
    body
  }
`;

export default Case;
