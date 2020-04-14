import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import * as classnames from "classnames";

const TechnoLogo = ({ slug, size = "medium" }) => {
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
  const node = technologies.find(client => client.value === slug);
  if (node) {
    return (
      <span
        key={node.value}
        className={classnames(
          "c-logo",
          `c-logo--${node.type}`,
          `c-logo--${size}`
        )}
      >
        <img src={node.image} alt={node.value} className={"c-logo__img"} />
      </span>
    );
  }
  return <span>{slug}</span>;
};

export default TechnoLogo;
