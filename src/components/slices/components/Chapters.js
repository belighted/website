import React from "react";
import classNames from "classnames";

const Chapters = ({ chapters }) => {
  return (
    <section className="c-section">
      <div className="o-wrapper">
        {chapters.map(col => (
          <div key={col.body}>
            {col.title && <h3 className="c-heading heading--3">{col.title}</h3>}
            <div
              key={col.body}
              dangerouslySetInnerHTML={{ __html: col.body }}
            ></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Chapters;
