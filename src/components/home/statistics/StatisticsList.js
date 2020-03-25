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
    <ul className="o-list-bare l-grid l-grid--4cols">
      {statistics.map(node => (
        <li key={node.label} className="l-grid__item o-box o-box--light-bg o-block">
          <p className="o-block__img c-heading c-heading--1 u-margin-bottom-tiny">{node.value}</p>
          <p className="c-body c-body--1 u-margin-none">{node.label}</p>
        </li>
      ))}
    </ul>
  );
};

export default StatisticsList;