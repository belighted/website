import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import ClientLogo from "../clients/ClientLogo";
import { MDXRenderer } from "gatsby-plugin-mdx";

const LeadingBrands = () => {
  const {
    mdx: {
      frontmatter: { title, list },
      body
    }
  } = useStaticQuery(graphql`
    {
      mdx(frontmatter: { slug: { eq: "leading-brands" }, lang: { eq: "en" } }) {
        frontmatter {
          title
          list
        }
        body
      }
    }
  `);
  return (
    <div className="c-section c-section--dark-bg">
      <div className="o-wrapper">
        <div>
          <h3 className="c-heading c-heading--3 c-heading--title c-heading--invert">
            {title}
          </h3>
          <div className="c-wysiwyg">
            <MDXRenderer>{body}</MDXRenderer>
          </div>
          <ul className="o-list-inline">
            {list.map(slug => (
              <li className="o-list-inline__item">
                <ClientLogo slug={slug} size="small" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LeadingBrands;
