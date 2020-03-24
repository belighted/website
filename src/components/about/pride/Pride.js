import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import GatsbyImage from "gatsby-image";

const Pride = () => {
  const {
    contentYaml: { pride }
  } = useStaticQuery(graphql`
    {
      contentYaml(slug: { eq: "about" }) {
        pride {
          title
          subtitle
          body
          image {
            childImageSharp {
              fixed(width: 350, height: 200) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    }
  `);
  return (
    <ul className={"o-list-bare"}>
      {pride.map(node => (
        <li key={node.title} className="u-margin-bottom">
          <div className="o-flag">
            <div className={"o-flag__img"}>
              <GatsbyImage fixed={node.image.childImageSharp.fixed} />
            </div>
            <div className={"o-flag__body"}>
              <h4 className="c-h4 u-margin-bottom-small">{node.title}</h4>
              <h5 className="c-h5">{node.subtitle}</h5>
              <span>{node.body}</span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Pride;
