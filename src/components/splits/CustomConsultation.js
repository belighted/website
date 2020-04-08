import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import LocalizedLink from "../links/LocalizedLink";

const CustomConsultation = () => {
  const {
    markdownRemark: {
      frontmatter: { title, cta },
      html
    }
  } = useStaticQuery(graphql`
    {
      markdownRemark(
        frontmatter: { slug: { eq: "custom-consultation" }, lang: { eq: "en" } }
      ) {
        frontmatter {
          title
          cta {
            title
            link
          }
        }
        html
      }
    }
  `);
  return (
    <div className="c-section c-section--light-bg">
      <div className="o-wrapper">
        <div>
          <h3 className="c-heading c-heading--3 c-heading--title">{title}</h3>
          <div
            className="c-wysiwyg"
            dangerouslySetInnerHTML={{ __html: html }}
          />
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
