import React from "react";
import Layout from "../components/layout/Layout";

const ResourcesPage = ({ pageContext }) => {
  return (
    <Layout context={pageContext} page={"resources"}>
      Resources
    </Layout>
  );
};

export default ResourcesPage;
