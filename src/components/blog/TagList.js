import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import LinkToTag from "./LinkToTag";

const TagList = () => {
  const {
    posts: { nodes }
  } = useStaticQuery(graphql`
    {
      posts: allMarkdownRemark(
        filter: { fields: { collection: { eq: "articles" } } }
      ) {
        nodes {
          frontmatter {
            slug
            lang
            tags {
              value
              label
            }
          }
        }
      }
    }
  `);

  const posts = nodes.map(n => n.frontmatter);
  let tags = {};
  posts.forEach(post => {
    post.tags.forEach(tag => (tags[tag.value] = tag.label));
  });

  return (
    <ul>
      {Object.keys(tags).map(tag => (
        <li key={tag}>
          <LinkToTag slug={tag}>{tags[tag]}</LinkToTag>
        </li>
      ))}
    </ul>
  );
};

export default TagList;
