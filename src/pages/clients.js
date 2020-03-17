import React from "react";
import Layout from "../components/layout/Layout";

const ClientsPage = ({ pageContext }) => {
  return (
    <Layout context={pageContext} page={"clients"}>
      Clients
    </Layout>
  );
};

export default ClientsPage;
