import React from "react";
import GatsbyImage from "gatsby-image";

const Gallery = ({ gallery }) => {
  return (
    <div className="l-grid l-grid--2cols">
      {gallery.map(item => (
        <div key={item.title}>
          <GatsbyImage fluid={item.image.childImageSharp.fluid} />
          <div className="c-heading c-heading--4">{item.title}</div>
          <div>{item.subtitle}</div>
        </div>
      ))}
    </div>
  );
};

export default Gallery;
