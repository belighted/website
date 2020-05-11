import React from "react";

const StatisticsList = ({ statistics }) => {
  return (
    <ul className="o-list-bare l-grid l-grid--2cols@medium l-grid--4cols@wide ">
      {statistics.map(node => (
        <li
          key={node.label}
          className="l-grid__item o-box o-box--light-bg o-block"
        >
          <p className="o-block__img c-heading c-heading--1 u-margin-bottom-tiny">
            {node.value}
          </p>
          <p className="c-body c-body--1 u-margin-none">{node.label}</p>
        </li>
      ))}
    </ul>
  );
};

export default StatisticsList;
