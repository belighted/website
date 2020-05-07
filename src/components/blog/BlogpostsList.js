import React from "react";
import LinkToBlog from "./LinkToBlog";
import GatsbyImage from "gatsby-image";

const BlogpostsList = ({ nodes }) => {
  return (
    <ul className="o-list-bare l-grid l-grid--3cols@medium">
      {nodes.map(node => (
        <li key={node.frontmatter.slug} className={"u-margin-bottom"}>
          <h4 className="c-heading c-heading--4 u-margin-none">
            {node.frontmatter.image && (
              <GatsbyImage
                fluid={node.frontmatter.image.childImageSharp.fluid}
              />
            )}
            <LinkToBlog slug={node.frontmatter.slug}>
              {node.frontmatter.title}
            </LinkToBlog>
            <div>{node.excerpt}</div>
          </h4>
        </li>
      ))}
    </ul>
  );
};

export default BlogpostsList;
