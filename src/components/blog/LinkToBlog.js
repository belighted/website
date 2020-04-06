import React  from "react";
import LocalizedLink from "../links/LocalizedLink";

const LinkToBlog = ({ slug, children }) => {
  return <LocalizedLink children={children} to={`/articles/${slug}`} />;
};

export default LinkToBlog;
