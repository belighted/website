import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import ClientLogo from "../../clients/ClientLogo";

const ClientsList = () => {
  const {
    dataYaml: { clients }
  } = useStaticQuery(graphql`
    {
      dataYaml(slug: { eq: "clients" }) {
        clients {
          value
        }
      }
    }
  `);
  return (
    <ul className="o-list-bare c-logo-list">
      {clients.map(node => (
        <li key={node.value} className={"c-logo-list__item"}>
          <ClientLogo slug={node.value}/>
        </li>
      ))}
    </ul>
  );
};

export default ClientsList;
