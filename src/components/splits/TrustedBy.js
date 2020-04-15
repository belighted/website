import React from "react";

const OurHistory = ({
  history: {
    frontmatter: { title },
    html
  }
}) => {
  return (
    <div className="c-section c-section--light-bg">
      <div className="o-wrapper">
        <div>
          <h3 className="c-heading c-heading--3 c-heading--title">{title}</h3>
          <div
            className="c-wysiwyg"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    </div>
  );
};

export default OurHistory;
