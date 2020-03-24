import React from "react";
import { SectionHeader } from "../../sections";
import ProcessesList from "../../processes/ProcessesList";

const HomeProcess = ({ section: { title, body } }) => {
  return (
    <section className="c-section">
      <div className="o-wrapper ">
        <div className="l-introcontent">
          <div className="l-introcontent__intro">
            <SectionHeader title={title} body={body} />
          </div>
          <div className="l-introcontent__main">
            <ProcessesList />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeProcess;