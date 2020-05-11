import React from "react";
import classNames from 'classnames';

const Cols = ({ columns }) => {
  return (
    <section className="c-section">
      <div className="o-wrapper">
        <div className={classNames('l-grid', 'l-grid--2cols@medium', `l-grid--${columns.length}cols@wide`)}>
          {columns.map(col => (
            <div key={col.body}>
              {col.title && (
                <h3 className="c-heading heading--3">{col.title}</h3>
              )}
              <div
                key={col.body}
                dangerouslySetInnerHTML={{ __html: col.body }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Cols;
