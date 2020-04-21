import React from "react";
//import { graphql, useStaticQuery } from "gatsby";
//import Img from "gatsby-image";
import Button from "../../buttons/Button";
import LocalizedLink from "../../links/LocalizedLink";

const HomeHero = ({ slides }) => {
  /*
  const { image1, image2 } = useStaticQuery(graphql`
    {
      image2: file(relativePath: { eq: "stock/software-developers-saas.jpg" }) {
        childImageSharp {
          # Specify the image processing specifications right in the query.
          # Makes it trivial to update as your page's design changes.
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      image1: file(
        relativePath: { eq: "stock/dylan-gillis-KdeqA3aTnBY-unsplash.jpg" }
      ) {
        childImageSharp {
          # Specify the image processing specifications right in the query.
          # Makes it trivial to update as your page's design changes.
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);
  */
  return (
    <div className="o-wrapper">
      {slides.map(slide => (
        <div className="l-home-hero" key={slide.title}>
          <div className="l-home-hero__text">
            <h1 className="c-heading c-heading--1 c-heading--title">
              {slide.title}
            </h1>
            <p className={"c-body c-body--3"}>{slide.body}</p>
            {slide.buttons.map(button => (
              <p key={button.title}>
                <LocalizedLink to={button.link}>
                  <Button modifier={"primary"}>{button.title}</Button>
                </LocalizedLink>
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

/*
<div className="l-home-hero__image1">
            <Img fluid={image1.childImageSharp.fluid} />
          </div>
          <div className="l-home-hero__image2">
            <Img fluid={image2.childImageSharp.fluid} />
          </div>
*/
export default HomeHero;
