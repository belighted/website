import React from "react";
import { SectionHeader } from "../../layout/Section";
import ClientsList from "./ClientsList";
import TestimonialsList from "../../testimonials/TestimonialsList";

const HomeClients = ({section:{title, body}}) => {
  return (
    <section className="c-section">
      <div className="o-wrapper ">
        <div className="l-vertical-center-7-5">
          <div className="l-vertical-center-7-5__intro">
            <SectionHeader title={title} body={body} />
            <ClientsList />
          </div>
          <div className="l-vertical-center-7-5__main">
            <TestimonialsList />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeClients;
