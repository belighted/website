import React from "react";
import Layout from "../components/layout/Layout";
import CasesList from "../components/cases/CasesList";

const ClientsPage = ({ pageContext }) => {
  return (
    <Layout context={pageContext} page={"clients"}>
      <div className="o-wrapper">
        <h1 className="c-heading c-heading--1 u-padding-vertical-large">Clients</h1>
        <CasesList />
      </div>
    </Layout>
  );
};

export default ClientsPage;
