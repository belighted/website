import React, { useContext } from "react";
import { graphql, useStaticQuery } from "gatsby";

import { MDXRenderer } from "gatsby-plugin-mdx";
import { I18nContext } from "../../i18n/I18n";

const Referal = () => {
  const {
    allMdx: { nodes }
  } = useStaticQuery(graphql`
    {
      allMdx(filter: { frontmatter: { slug: { eq: "referal" } } }) {
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

export default Referal;
