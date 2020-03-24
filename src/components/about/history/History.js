import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import GatsbyImage from "gatsby-image";

const History = () => {
  const {
    contentYaml: { history }
  } = useStaticQuery(graphql`
    {
      contentYaml(slug: { eq: "about" }) {
        history {
          date
          event
          image {
            childImageSharp {
              fixed(width: 200, height: 200) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    }
  `);
  return (
    <ul>
      {history.map(node => (
        <li key={node.date}>
          <h5 className="c-h5">{node.date}</h5>
          <p>{node.event}</p>
          {node.image && <GatsbyImage fixed={node.image.childImageSharp.fixed} />}
        </li>
      ))}
    </ul>
  );
};

export default History;
