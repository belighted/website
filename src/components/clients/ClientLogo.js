import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import * as classnames from "classnames";

const ClientLogo = ({ slug, size = "medium" }) => {
  const {
    markdownRemark: {
      frontmatter: { clients }
    }
  } = useStaticQuery(graphql`
    {
      markdownRemark(frontmatter: { slug: { eq: "clients" } }) {
        frontmatter {
          clients {
            value
            image
            type
          }
        }
      }
    }
  `);
  const node = clients.find(client => client.value === slug);
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