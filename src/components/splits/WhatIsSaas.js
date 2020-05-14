import React, { useContext } from "react";
import { graphql, useStaticQuery } from "gatsby";
import { I18nContext } from "../i18n/I18n";
import { MDXRenderer } from "gatsby-plugin-mdx";

const WhatIsSaas = () => {
  const {
    allMdx: { nodes }
  } = useStaticQuery(graphql`
    {
      allMdx(filter: { frontmatter: { slug: { eq: "what-is-saas" } } }) {
        nodes {
          frontmatter {
            lang
            images {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
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
    frontmatter: { images }
  } = nodes.find(n => n.frontmatter.lang === lang);

  return (
    <MDXRenderer images={images.map(i => i.childImageSharp)}>
      {body}
    </MDXRenderer>
  );
};

export default WhatIsSaas;
