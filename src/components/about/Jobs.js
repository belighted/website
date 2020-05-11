import React from "react";
import { SectionHeader } from "../layout/Section";
import JobsList from "../jobs/JobsList";
import { Link } from "gatsby";

const Jobs = ({ section: { title, body, link } }) => {
  return (
    <div className="c-section">
      <div className="o-wrapper">
        <div className="l-grid l-grid--2cols@medium">
          <div>
            <SectionHeader title={title} body={body} />
            <JobsList />
            <Link to={"/careers"}>{link}</Link>
          </div>
          <div>
            <iframe
              title={"Belighteam 2018"}
              width="560"
              height="315"
              src="https://www.youtube-nocookie.com/embed/libeAUXjv0U"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
