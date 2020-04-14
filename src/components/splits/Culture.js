import React from "react";
import { graphql, useStaticQuery } from "gatsby";

const Culture = ({
  culture: {
    frontmatter: { title, values },
    html
  }
}) => {
  return (
    <div className="c-section c-section--dark-bg">
      <div className="o-wrapper">
        <div className="l-grid l-grid--2cols">
          <div>
            <h3 className="c-heading c-heading--3 c-heading--invert c-heading--title">
              {title}
            </h3>
            <div
              className="c-wysiwyg c-wysiwyg--dark"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
          <ul className="o-list-bare">
            {values.map(value => (
              <li className="o-list-bare__item" key={value.key}>
                <span className="u-margin-right-tiny c-body c-body--3 c-body--invert">
                  <strong>{value.key.substr(0, 1)}</strong>
                  {value.key.substr(1)}
                </span>
                <span className="c-body c-body--2 c-body--invert">
                  {value.value}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Culture;
