import React from "react";
import Layout from "../components/layout/Layout";
import CasesList from "../components/cases/CasesList";
import { SectionHeader } from "../components/sections";

const ClientsPage = ({ pageContext }) => {
  return (
    <Layout context={pageContext} page={"clients"}>
      <div className="o-wrapper c-section">
        <SectionHeader
          title={"Clients"}
          body={
            "Leading brands in Belgium and in Europe trust us and rely on Belighted development to deliver perfection every day."
          }
        ></SectionHeader>
        <CasesList />
      </div>
    </Layout>
  );
};

export default ClientsPage;
