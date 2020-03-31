import LinkToTag from "../LinkToTag";
import React from "react";

const BlogpostTags = ({ post }) => {
  return (
    <ul className="o-list-inline u-margin-top">
      {post.tags.map(tag => (
        <li key={tag.value} className="o-list-inline__item u-margin-right-small">
          <LinkToTag slug={tag.value}>{tag.label}</LinkToTag>
        </li>
      ))}
    </ul>
  );
};

export default BlogpostTags;
