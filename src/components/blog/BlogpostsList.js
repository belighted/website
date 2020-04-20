import React from "react";
import LinkToBlog from "./LinkToBlog";

const BlogpostsList = ({ nodes }) => {
  return (
    <ul>
      {nodes.map(node => (
        <li key={node.frontmatter.slug} className={"u-margin-bottom"}>
          <h4 className="c-h4 u-margin-none">
            <LinkToBlog slug={node.frontmatter.slug}>
              {node.frontmatter.title}
            </LinkToBlog>
          </h4>
        </li>
      ))}
    </ul>
  );
};

export default BlogpostsList;
