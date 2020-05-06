import React from "react";

const Process = ({ process }) => {
  return (
    <section className="c-section">
      <div className="o-wrapper">
        {process.map(col => (
          <div key={col.id}>
            {col.title && <h3 className="c-heading heading--3">{col.title}</h3>}
            <div
            key={col.body}
            dangerouslySetInnerHTML={{ __html: col.body }}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Process;
