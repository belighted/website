import React from "react";
import LocalizedLink from "../links/LocalizedLink";
import { MDXRenderer } from "gatsby-plugin-mdx";

const CustomConsultation = ({
  customConsultation: {
    frontmatter: { title, cta },
    body
  }
}) => {
  return (
    <div className="c-section c-section--light-bg">
      <div className="o-wrapper">
        <div>
          <h3 className="c-heading c-heading--3 c-heading--title">{title}</h3>
          <div className="c-wysiwyg">
            <MDXRenderer>{body}</MDXRenderer>
          </div>
          <div>
            <LocalizedLink to={cta.link} className="c-button c-button--primary">
              {cta.title}
            </LocalizedLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomConsultation;
