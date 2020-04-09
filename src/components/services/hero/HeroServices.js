import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import Img from "gatsby-image";

const HeroServicesImg = () => {
  const {
    file: { childImageSharp }
  } = useStaticQuery(graphql`
    {
      file(
        relativePath: {
          eq: "stock/artem-maltsev-mU2lwHR6u14-unsplash.jpg"
        }
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
  return <Img fluid={childImageSharp.fluid} />;
};

const HeroServices = ({ section: { title, body } }) => {
  return (
    <section className="l-bornfight">
      <div className="l-bornfight__text">
        <h1 className="c-heading c-heading--1 c-heading--title">{title}</h1>
        <h2 className="c-heading c-heading--2">{body}</h2>
      </div>
      <div className="l-bornfight__image">
        <HeroServicesImg />
      </div>
      <div className="l-bornfight__bg"></div>
    </section>
  );
};

export default HeroServices;
