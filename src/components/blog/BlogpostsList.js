import React from "react";
import LinkToBlog from "./LinkToBlog";

const BlogpostsList = ({nodes}) => {
  return (
    <ul>
      {nodes.map(node => (
        <li key={node.slug} className={"u-margin-bottom"}>
          <h4 className="c-h4 u-margin-none">
            <LinkToBlog slug={node.slug}>{node.title}</LinkToBlog>
          </h4>
        </li>
      ))}
    </ul>
  );
};

export default BlogpostsList;
