import React from "react";
import Layout from "../components/layout/Layout";
import CasesList from "../components/cases/CasesList";

const ClientsPage = ({ pageContext }) => {
  return (
    <Layout context={pageContext} page={"clients"}>
      <h1 className="c-h1">Clients</h1>
      <CasesList />
    </Layout>
  );
};

export default ClientsPage;
