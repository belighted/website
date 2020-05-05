import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import Img from "gatsby-image";

const LastScene = () => {
  const {file:{childImageSharp}} = useStaticQuery(graphql`
    {
      file(relativePath: { eq: "about/last_scene.jpg" }) {
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

export default LastScene;
