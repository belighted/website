import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import * as classnames from "classnames";

const TechnlologiesList = () => {
  const {
    dataYaml: { technologies }
  } = useStaticQuery(graphql`
    {
      dataYaml(slug: { eq: "technologies" }) {
        technologies {
          value
          image
          type
        }
      }
    }
  `);
  return (
    <ul className="o-list-bare c-logo-list">
      {technologies.map(node => (
        <li
          key={node.value}
          className={classnames(
            "c-logo-list__item",
            "c-logo",
            `c-logo--${node.type}`
          )}
        >
          <img
            src={node.image}
            alt={node.value}
            className={"c-logo__img"}
          />
        </li>
      ))}
    </ul>
  );
};

export default TechnlologiesList;
