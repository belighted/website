import React from "react";
import { Link } from "gatsby";

const LinkToJob = ({ slug, children }) => {
  return <Link children={children} to={`/careers/${slug}`} />;
};

export default LinkToJob;
