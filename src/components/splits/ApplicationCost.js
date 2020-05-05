import React, { useContext } from "react";
import LocalizedLink from "../links/LocalizedLink";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { graphql, useStaticQuery } from "gatsby";
import { I18nContext } from "../i18n/I18n";

const ApplicationCost = () => {
  const {
    allMdx: { nodes }
  } = useStaticQuery(graphql`
    {
      allMdx(filter: { frontmatter: { slug: { eq: "application-cost" } } }) {
        nodes {
          frontmatter {
            title
            lang
            cta {
              link
              title
            }
          }
          body
        }
      }
    }
  `);
  const lang = useContext(I18nContext);
  const {
    body,
    frontmatter: { cta, title }
  } = nodes.find(n => n.frontmatter.lang === lang);
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

export default ApplicationCost;
