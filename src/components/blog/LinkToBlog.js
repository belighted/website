import React  from "react";
import LocalizedLink from "../links/LocalizedLink";

const LinkToBlog = ({ slug, children }) => {
  return <LocalizedLink children={children} route={`/blog/${slug}`} />;
};

export default LinkToBlog;
