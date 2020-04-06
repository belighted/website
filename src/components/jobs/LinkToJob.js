import React from "react";
import LocalizedLink from "../links/LocalizedLink";

const LinkToJob = ({ slug, children }) => {
  return <LocalizedLink children={children} to={`/careers/${slug}`} />;
};

export default LinkToJob;
