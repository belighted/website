import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import LinkToBlog from "./LinkToBlog";

const BlogpostsList = () => {
  const {
    allPostsYaml: { nodes }
  } = useStaticQuery(graphql`
    {
      allPostsYaml(limit: 3) {
        nodes {
          slug
          article {
            title
          }
        }
      }
    }
  `);
  return (
    <ul>
      {nodes.map(node => (
        <li key={node.slug} className={"u-margin-bottom"}>
          <h4 className="c-h4 u-margin-none">
            <LinkToBlog slug={node.slug}>{node.article.title}</LinkToBlog>
          </h4>
        </li>
      ))}
    </ul>
  );
};

export default BlogpostsList;
