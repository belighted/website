import React from "react";

const Default = ({ title, subtitle, image, body, type }) => {
  return (
    <section className="c-section">
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
        <div>{image}</div>
      </div>
    </section>
  );
};

export default Default;
