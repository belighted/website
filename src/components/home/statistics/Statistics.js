import React from "react";
import StatisticsList from "./StatisticsList";
import LocalizedLink from "../../links/LocalizedLink";

const Statistics = ({ section: { title }, statistics }) => {
  return (
    <section className="c-section">
      <div className="o-wrapper ">
        <div className="l-narrow-header-large-content">
          <div className="l-narrow-header-large-content__header">
            <h2 className="c-heading c-heading--2 c-heading--title">{title}</h2>
            <LocalizedLink to={"/about"}>Find out more about us</LocalizedLink>
          </div>
          <div className="l-narrow-header-large-content__content">
            <StatisticsList statistics={statistics} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
