import React  from "react";
import LocalizedLink from "../links/LocalizedLink";

const LinkToTag = ({ slug, children }) => {
  return <LocalizedLink children={children} to={`/tags/${slug}`} />;
};

export default LinkToTag;
