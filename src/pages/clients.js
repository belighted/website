import React from "react";
import Layout from "../components/layout/Layout";
import { graphql } from "gatsby";
import ClientsPageList from "../components/cases/ClientsPageList";

const ClientsPage = ({
  pageContext,
  data: {
    clients: { title, clients, cta }
  }
}) => {
  return (
    <Layout context={pageContext} page={"clients"}>
      <div className="o-wrapper c-section">
        <h1 className="c-heading c-heading--1 c-heading--title">{title}</h1>
        <ClientsPageList clients={clients} cta={cta} />
      </div>
    </Layout>
  );
};

export default ClientsPage;

export const query = graphql`
  query ClientPage($lang: String!) {
    clients: contentYaml(slug: { eq: "clients" }, lang: { eq: $lang }) {
      title
      cta {
        label
      }
      clients {
        slug
        image
        title
        tags
        text
      }
    }
  }
`;
