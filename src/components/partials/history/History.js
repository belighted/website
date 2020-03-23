import React from "react";
import { useStaticQuery, graphql } from "gatsby";

const History = () => {
  const {
    dataYaml: { history }
  } = useStaticQuery(graphql`
    {
      dataYaml(slug: { eq: "history" }) {
        history {
          date
          event
          image
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
        </li>
      ))}
    </ul>
  );
};

export default History;
