import React from "react";
import HubspotFormEmbed from "react-hubspot-form";

const HubspotForm = ({ formId }) => {
  return (
    <HubspotFormEmbed
      portalId="1684659"
      formId={formId}
      onSubmit={() => console.log("Submit!")}
      onReady={form => console.log("Form ready!")}
      loading={<div>Loading...</div>}
    />
  );
};

export default HubspotForm;
