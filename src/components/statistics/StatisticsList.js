import React from "react";
import { useStaticQuery, graphql } from "gatsby";

const StatisticsList = () => {
  const {
    dataYaml: { statistics }
  } = useStaticQuery(graphql`
    {
      dataYaml(slug: { eq: "statistics" }) {
        statistics {
          label
          value
        }
      }
    }
  `);
  return (
    <ul>
      {statistics.map(node => (
        <li key={node.label}>
          <strong>{node.value}</strong>&nbsp;
          <span>{node.label}</span>
        </li>
      ))}
    </ul>
  );
};

export default StatisticsList;
