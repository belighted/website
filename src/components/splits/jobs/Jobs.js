import React from "react";
import { SectionHeader } from "../../sections";
import JobsList from "../../jobs/JobsList";

const Jobs = () => {
  return (
    <div className="c-section">
      <div className="o-wrapper">
        <SectionHeader title={"Careers"} body={"Fancy working for us?"} />
        <JobsList />
      </div>
    </div>
  );
};

export default Jobs;
