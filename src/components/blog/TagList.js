import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import LinkToTag from "./LinkToTag";

const TagList = () => {
  const {
    allPostsYaml: { nodes: posts }
  } = useStaticQuery(graphql`
    {
      allPostsYaml {
        nodes {
          slug
          lang
          tags {
            value
            label
          }
        }
      }
    }
  `);

  let tags = {};
  posts.forEach(post => {
    post.tags.forEach(tag => (tags[tag.value] = tag.label));
  });

  return (
    <ul>
      {Object.keys(tags).map(tag => (
        <li>
          <LinkToTag slug={tag}>{tags[tag]}</LinkToTag>
        </li>
      ))}
    </ul>
  );
};

export default TagList;
