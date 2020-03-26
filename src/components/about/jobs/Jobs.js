import React from "react";
import { SectionHeader } from "../../sections";
import JobsList from "../../jobs/JobsList";
import { Link } from "gatsby";

const Jobs = ({ section: { title, body, link } }) => {
  return (
    <div className="c-section">
      <div className="o-wrapper">
        <SectionHeader title={title} body={body} />
        <JobsList />
        <Link to={"/careers"}>{link}</Link>
      </div>
    </div>
  );
};

export default Jobs;
