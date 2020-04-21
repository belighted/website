import React from "react";
import Layout from "../components/layout/Layout";
import HubspotForm from "../components/forms/HubspotForm";

const EstimateProjectMulti = ({ pageContext }) => {
  return (
    <Layout context={pageContext} page={"estimate-project"}>
      <div className="o-wrapper">
        <HubspotForm formId={"ae008c79-41b5-43ad-9618-4054dc0e20a5"} />
      </div>
    </Layout>
  );
};

export default EstimateProjectMulti;
