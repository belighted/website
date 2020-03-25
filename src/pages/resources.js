import React from "react";
import Layout from "../components/layout/Layout";
import ResourcesList from "../components/resources/ResourcesList";
import { SectionHeader } from "../components/sections";

const ResourcesPage = ({ pageContext }) => {
  return (
    <Layout context={pageContext} page={"resources"}>
      <section className="o-wrapper c-section">
        <SectionHeader
          title={"Resources"}
          body={"Find valuable resources for your product development software."}
        />
        <ResourcesList></ResourcesList>
      </section>
    </Layout>
  );
};

export default ResourcesPage;
