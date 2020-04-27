import React, { useContext } from "react";
import { graphql } from "gatsby";
import ClientLogo from "../../../clients/ClientLogo";
import LinkToCase from "../../../cases/LinkToCase";
import { I18nContext } from "../../../i18n/I18n";

const Case = ({ node }) => {
  const lang = useContext(I18nContext);
  return (
    <div className="l-grid l-grid--2cols">
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
          <LinkToCase slug={node.slug}>
            {lang === "en"
              ? "Read full case study"
              : "Lire l'étude de cas complète"}
          </LinkToCase>
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
  fragment HomeCaseItem on ContentYamlCases {
    slug
    title
    results
    body
  }
`;

export default Case;
