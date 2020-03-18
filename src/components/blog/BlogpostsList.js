import React from "react";
import { useStaticQuery, graphql } from "gatsby";

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
        <li key={node.slug}>
          <h4>{node.article.title}</h4>
        </li>
      ))}
    </ul>
  );
};

export default BlogpostsList;
