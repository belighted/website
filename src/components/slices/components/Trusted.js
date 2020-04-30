import React, { useContext } from "react";
import { graphql, useStaticQuery } from "gatsby";
import { I18nContext } from "../../i18n/I18n";
import TrustedBy from "../../splits/TrustedBy";

const Trusted = () => {
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
  const trusted = nodes.find(n => n.frontmatter.lang === lang);
  return <TrustedBy trustedBy={trusted} />;
};

export default Trusted;
