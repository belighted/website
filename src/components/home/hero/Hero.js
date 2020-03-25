import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import Hero from "../../hero/Hero";

const HomeHero = () => {
  const {
    contentYaml: { slides }
  } = useStaticQuery(graphql`
    {
      contentYaml(slug: { eq: "home" }) {
        slides {
          title
          body
          buttons{
            title
            modifier
          }
        }
      }
    }
  `);
  const slide = slides[0];
  return (
    <Hero title={slide.title} body={slide.body} buttons={slide.buttons}/>
  );
};

export default HomeHero;
