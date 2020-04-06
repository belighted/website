import React from "react";

const Hero = ({ title, body, subtitle }) => {
  return (
    <section className="c-section c-section--light-bg">
      <div className="o-wrapper">
        <h2 className="c-heading--1 c-heading" dangerouslySetInnerHTML={{__html: title}}/>
        <h3 className="c-heading--2 c-heading" dangerouslySetInnerHTML={{__html: subtitle}}/>
      </div>
    </section>
  );
};

export default Hero;
