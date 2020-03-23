import classNames from "classnames";
import React from "react";

export const Section = ({ section, children }) => {
  return (
    <section
      className={classNames(
        "c-section",
        "u-padding-vertical-large",
        section.slug
      )}
    >
      <div className="o-wrapper">
        <div className="c-section__header">
          <h2 className="c-h2">{section.title}</h2>
          {section.body && (
            <div className="c-section__body c-h4 u-margin-bottom-large">
              {section.body}
            </div>
          )}
        </div>
        <div className={"c-section__content"}>{children}</div>
      </div>
    </section>
  );
};

export const findSection = (sections, slug) =>
  sections.find(s => s.slug === slug);
