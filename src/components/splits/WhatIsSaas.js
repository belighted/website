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
          }
          body
        }
      }
    }
  `);
  const lang = useContext(I18nContext);
  const { body } = nodes.find(n => n.frontmatter.lang === lang);
  return <MDXRenderer>{body}</MDXRenderer>;
};

export default WhatIsSaas;
