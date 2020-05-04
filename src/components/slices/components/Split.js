import React from "react";
import GatsbyImage from "gatsby-image";

const Split = ({ title, subtitle, image, body }) => {
  return (
    <section className="c-section c-section--light-bg">
      <div className="o-wrapper">
        {title && (
          <h2
            className={"c-heading c-heading--2"}
            dangerouslySetInnerHTML={{ __html: title }}
          />
        )}
        {subtitle && (
          <h2
            className={"c-heading c-heading--3"}
            dangerouslySetInnerHTML={{ __html: subtitle }}
          />
        )}
        <div dangerouslySetInnerHTML={{ __html: body }} className="c-wysiwyg" />
        {image && <GatsbyImage fluid={image.childImageSharp.fluid} />}
      </div>
    </section>
  );
};

export default Split;
