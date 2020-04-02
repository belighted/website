import React from "react";

const Hero = ({ title, body, subtitle }) => {
  return (
    <section className="c-section c-section--light-bg">
      <div className="o-wrapper">
        <h2 className="c-heading--1 c-heading">{title}</h2>
        <h3 className="c-heading--2 c-heading">{subtitle}</h3>
      </div>
    </section>
  );
};

export default Hero;
