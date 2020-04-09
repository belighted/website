import React from "react";
import { graphql } from "gatsby";

const Case = ({ node }) => {
  return (
    <div>
      <h3>{node.title}</h3>
    </div>
  );
};

export const HomeCaseItem = graphql`
  fragment HomeCaseItem on CasesYaml {
    slug
    title
    lang
    
  }
`;

export default Case;
