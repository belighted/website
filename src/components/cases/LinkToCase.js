import React  from "react";
import LocalizedLink from "../links/LocalizedLink";

const LinkToCase = ({ slug, children }) => {
  return <LocalizedLink children={children} to={`/clients/${slug}`} />;
};

export default LinkToCase;
