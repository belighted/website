import React from "react";
import Layout from "../components/layout/Layout";
import ResourcesList from "../components/resources/ResourcesList";

const ResourcesPage = ({ pageContext }) => {
  return (
    <Layout context={pageContext} page={"resources"}>
      <h1>Resources</h1>
        <ResourcesList></ResourcesList>
    </Layout>
  );
};

export default ResourcesPage;
