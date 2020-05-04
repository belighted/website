import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import * as classnames from "classnames";

const ClientLogo = ({ slug, size = "medium" }) => {
  const {
    dataYaml: { clients }
  } = useStaticQuery(graphql`
    {
      dataYaml(slug: { eq: "clients" }) {
        clients {
          value
          type
          image
        }
      }
    }
  `);
  const node = clients.find(client => client.value === slug);
  console.log(node);
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

export default ClientLogo;
