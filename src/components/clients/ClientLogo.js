import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import * as classnames from "classnames";
import GatsbyImage from "gatsby-image";

const ClientLogo = ({ slug, size = "medium" }) => {
  const {
    dataYaml: { clients }
  } = useStaticQuery(graphql`
    {
      dataYaml(slug: { eq: "clients" }) {
        clients {
          value
          type
          image {
            childImageSharp {
              fixed(width: 100) {
                ...GatsbyImageSharpFixed
              }
            }
            extension
            publicURL
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
        {node.image && node.image.extension === "svg" && (
            <img src={node.image.publicURL} alt={slug} className={"c-logo__img"} />
          )}
        {node.image && node.image.childImageSharp && (
          <GatsbyImage fixed={node.image.childImageSharp.fixed} alt={slug} />
        )}
      </span>
    );
  }
  return <span>{slug}</span>;
};

export default ClientLogo;
