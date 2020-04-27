import React from "react";

import LinkToCase from "./LinkToCase";
import { graphql, useStaticQuery } from "gatsby";
import ClientLogo from "../clients/ClientLogo";

const CaseCard = ({ node, link, cta }) => {
  return (
    <div className="o-box o-box--light-bg">
      {link && (
        <img src={node.image} alt={node.slug} className="u-margin-bottom" />
      )}
      {!link && <ClientLogo slug={node.slug} />}
      <h4 className="c-heading c-heading--4">
        {link && (
          <LinkToCase slug={node.slug}>
            {node.title ? node.title : node.slug}
          </LinkToCase>
        )}
        {!link && node.title}
      </h4>
      {node.text && <div>{node.text}</div>}
      {link && (
        <p>
          <LinkToCase slug={node.slug}>{cta.label}</LinkToCase>
        </p>
      )}
    </div>
  );
};

const ClientsPageList = ({ clients, cta }) => {
  const {
    cases: { nodes: cases }
  } = useStaticQuery(graphql`
    query {
      cases: allCasesYaml {
        nodes {
          slug
        }
      }
    }
  `);
  const slugs = cases.map(c => c.slug);
  console.log(cta);
  return (
    <ul className="o-list-bare c-cases-list l-grid l-grid--4cols">
      {clients.map(node => (
        <li key={node.slug} className="u-margin-bottom">
          <CaseCard node={node} link={slugs.includes(node.slug)} cta={cta} />
        </li>
      ))}
    </ul>
  );
};

export default ClientsPageList;
