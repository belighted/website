import React from "react";
import { useStaticQuery, graphql } from "gatsby";

const Pride = () => {
  const {
    dataYaml: { pride }
  } = useStaticQuery(graphql`
    {
      dataYaml(slug: { eq: "pride" }) {
        pride {
          title
          subtitle
          body
        }
      }
    }
  `);
  return (
    <ul>
      {pride.map(node => (
        <li key={node.title} className="u-margin-bottom">
          <h4 className="c-h4 u-margin-bottom-small">{node.title}</h4>
          <h5 className="c-h5">{node.subtitle}</h5>
          <span>{node.body}</span>
        </li>
      ))}
    </ul>
  );
};

export default Pride;
