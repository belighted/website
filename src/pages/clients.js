import React from "react";
import Layout from "../components/layout/Layout";
import { SectionHeader } from "../components/layout/Section";
import ClientsCasesList from "../components/cases/ClientCasesList";
import { graphql } from "gatsby";

const ClientsPage = ({
  pageContext,
  data: {
    contentYaml: { title, body }
  }
}) => {
  return (
    <Layout context={pageContext} page={"clients"}>
      <div className="o-wrapper c-section">
        <SectionHeader title={title} body={body} />
        <ClientsCasesList />
      </div>
    </Layout>
  );
};

export default ClientsPage;

export const query = graphql`
  {
    contentYaml(slug: { eq: "clients" }) {
      title
      body
    }
  }
`;
