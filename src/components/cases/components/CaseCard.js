import React from "react";
import LinkToCase from "../LinkToCase";

const CaseCard = ({ node }) => {
  return (
    <div className="o-box o-box--light-bg">
      <LinkToCase slug={node.slug}>
        {node.title ? node.title : node.slug}
      </LinkToCase>
    </div>
  );
};

export default CaseCard;
