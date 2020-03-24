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
    <ul className="o-list-bare c-technologies">
      {technologies.map(node => (
        <li
          key={node.value}
          className={classnames(
            "c-technologies__item",
            "c-technology",
            `c-technology--${node.type}`
          )}
        >
          <img
            src={node.image}
            alt={node.value}
            className={"c-technologies__img"}
          />
        </li>
      ))}
    </ul>
  );
};

export default TechnlologiesList;
