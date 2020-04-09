import { SectionHeader } from "../../layout/Section";
import CasesList from "./components/List";
import LocalizedLink from "../../links/LocalizedLink";
import React from "react";

function Cases({ section: { title, body, subtitle } }) {
  return (
    <section className="c-section c-section--dark-bg">
      <div className="o-wrapper ">
        <div className="l-cases">
          <div className="l-cases__text">
            <SectionHeader title={title} body={body} modifier={"invert"} />
            <LocalizedLink to={"/clients"}>See all cases</LocalizedLink>
          </div>
          <div className="l-cases__list">
            <h5 className="c-heading c-heading--5 c-heading--invert u-margin-bottom-small">
              {subtitle}
            </h5>
            <CasesList />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cases;
