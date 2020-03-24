import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import * as classnames from "classnames";

const ClientsList = () => {
  const {
    dataYaml: { clients }
  } = useStaticQuery(graphql`
    {
      dataYaml(slug: { eq: "clients" }) {
        clients {
          value
          image
          type
        }
      }
    }
  `);
  return (
    <ul className="o-list-bare l-grid l-grid--2cols">
      {clients.map(node => (
        <li
          key={node.value}
          className={classnames(
            "c-clients__item",
            "c-client",
            `c-client--${node.type}`
          )}
        >
          <img
            src={node.image}
            alt={node.value}
            className={"c-clients__img"}
          />
        </li>
      ))}
    </ul>
  );
};

export default ClientsList;
