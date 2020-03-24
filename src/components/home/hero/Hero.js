import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import Button from "../../buttons/Button";

const Hero = () => {
  const {
    contentYaml: { slides }
  } = useStaticQuery(graphql`
    {
      contentYaml(slug: { eq: "home" }) {
        slides {
          title
          body
        }
      }
    }
  `);
  const slide = slides[0];
  return (
    <div className="o-wrapper c-hero">
      <div>
        <h1 className="c-heading c-heading--1">{slide.title}</h1>
        <p className={"c-body c-body--3"}>{slide.body}</p>
        <Button>Estimate project</Button>
      </div>
    </div>
  );
};

export default Hero;
