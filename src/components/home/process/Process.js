import React from "react";
import { SectionHeader } from "../../layout/Section";
import HomeProcessesList from "../../processes/HomeProcessesList";

const HomeProcess = ({ section: { title, body } }) => {
  return (
    <section className="c-section">
      <div className="o-wrapper ">
        <div className="l-introcontent">
          <div className="l-introcontent__intro">
            <SectionHeader title={title} body={body} />
          </div>
          <div className="l-introcontent__main">
            <HomeProcessesList />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeProcess;
