import React from "react";

const Cols = ({ columns }) => {
  return (
    <section className="c-section">
      <div className="o-wrapper">
        {columns.map(col => (
          <div
            key={col.body}
            dangerouslySetInnerHTML={{ __html: col.body }}
          ></div>
        ))}
      </div>
    </section>
  );
};

export default Cols;
