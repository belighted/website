import React from "react";
import { SectionHeader } from "../../sections";
import ClientsList from "./ClientsList";
import TestimonialsList from "../../testimonials/TestimonialsList";

const HomeClients = ({section:{title, body}}) => {
  return (
    <section className="c-section">
      <div className="o-wrapper ">
        <div className="l-introcontent l-introcontent--invert">
          <div className="l-introcontent__intro">
            <SectionHeader title={title} body={body} />
            <ClientsList />
          </div>
          <div className="l-introcontent__main">
            <TestimonialsList />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeClients;
