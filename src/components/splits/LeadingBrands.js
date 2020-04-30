import React, { useContext } from "react";
import { graphql, useStaticQuery } from "gatsby";
import ClientLogo from "../clients/ClientLogo";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { I18nContext } from "../i18n/I18n";

const LeadingBrands = () => {
  const {
    allMdx: { nodes }
  } = useStaticQuery(graphql`
    {
      allMdx(filter: { frontmatter: { slug: { eq: "trusted-by" } } }) {
        nodes {
          frontmatter {
            title
            lang
            list
          }
          body
        }
      }
    }
  `);
  const lang = useContext(I18nContext);
  const {
    body,
    frontmatter: { list, title }
  } = nodes.find(n => n.frontmatter.lang === lang);

  return (
    <div className="c-section c-section--light-bg">
      <div className="o-wrapper">
        <div>
          <h3 className="c-heading c-heading--3 c-heading--title c-heading">
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
