import React from "react";
import Hero from "../../hero/Hero";

const HeroServices = ({ section: { title, body } }) => {
  return (
    <section className="c-section c-section--light-bg u-padding-vertical-none">
      <Hero title={title} body={body}/>
    </section>
  );
};

export default HeroServices;
