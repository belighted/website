import React from "react";
import { graphql, useStaticQuery } from "gatsby";

const LeadingBrands = () => {
  const {
    markdownRemark: {
      frontmatter: { title, list },
      html
    }
  } = useStaticQuery(graphql`
    {
      markdownRemark(
        frontmatter: { slug: { eq: "leading-brands" }, lang: { eq: "en" } }
      ) {
        frontmatter {
          title
          list
        }
        html
      }
    }
  `);
  return (
    <div className="c-section">
      <div className="o-wrapper">
        <div>
          <h3 className="c-heading c-heading--3 c-heading--title">{title}</h3>
          <div
            className="c-wysiwyg"
            dangerouslySetInnerHTML={{ __html: html }}
          />
          <ul className="o-list-inline">
            {list.map(brand => (
              <li>{brand}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LeadingBrands;
