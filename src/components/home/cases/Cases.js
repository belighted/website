import { SectionHeader } from "../../layout/Section";
import CasesList from "./components/List";
import LocalizedLink from "../../links/LocalizedLink";
import React from "react";

function Cases({ section: { title, body, subtitle, button }, cases }) {
  return (
    <section className="c-section c-section--dark-bg">
      <div className="o-wrapper ">
        <div className="l-cases">
          <div className="l-cases__text">
            <SectionHeader title={title} body={body} modifier={"invert"} />
          </div>
          <div className="l-cases__list">
            <CasesList cases={cases} />
          </div>
          <LocalizedLink to={"/clients"}>{button}</LocalizedLink>
        </div>
      </div>
    </section>
  );
}

export default Cases;
