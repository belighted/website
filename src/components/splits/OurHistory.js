import React from "react";
import { MDXRenderer } from "gatsby-plugin-mdx";

const OurHistory = ({
  history: {
    frontmatter: { title },
    body
  }
}) => {
  return (
    <div className="c-section c-section--light-bg">
      <div className="o-wrapper">
        <div>
          <h3 className="c-heading c-heading--3 c-heading--title">{title}</h3>
          Markdown
          <div className="c-wysiwyg">
            <MDXRenderer>{body}</MDXRenderer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurHistory;
