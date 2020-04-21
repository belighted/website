import React, { useContext } from "react";
import { I18nContext } from "../i18n/I18n";
import HubspotForm from "./HubspotForm";

const LocalizedHubspotForm = ({ en, fr }) => {
  const lang = useContext(I18nContext);
  return <HubspotForm formId={lang === "en" ? en : fr} />;
};

export default LocalizedHubspotForm;
