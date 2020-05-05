import React from "react";
import GatsbyImage from "gatsby-image";
import CtaButton from "../../buttons/CtaButton";

const Default = ({ title, subtitle, image, body, cta }) => {
  return (
    <section className="c-slice">
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
        {cta && <CtaButton cta={cta} />}
      </div>
    </section>
  );
};

export default Default;
