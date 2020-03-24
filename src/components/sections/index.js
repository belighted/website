import classNames from "classnames";
import React from "react";
import * as PropTypes from "prop-types";

export function SectionHeader({ title, body, modifier }) {
  return (
    <div
      className={classNames(
        "c-section-header",
        modifier && `c-section-header--${modifier}`
      )}
    >
      <h2
        className={classNames(
          "c-heading c-heading--eyebrow",
          modifier && `c-heading--${modifier}`
        )}
      >
        {title}
      </h2>
      {body && (
        <div
          className={classNames(
            "c-heading c-heading--2",
            modifier && `c-heading--${modifier}`
          )}
        >
          {body}
        </div>
      )}
    </div>
  );
}

SectionHeader.propTypes = {
  title: PropTypes.any,
  body: PropTypes.any
};

export const Section = ({ section, children, modifier }) => {
  return (
    <section
      className={classNames(
        "c-section",
        modifier && `c-section--${modifier}`,
        section.slug
      )}
    >
      <div className="o-wrapper">
        <SectionHeader title={section.title} body={section.body} />
        <div className={"c-section__content"}>{children}</div>
      </div>
    </section>
  );
};

export const findSection = (sections, slug) =>
  sections.find(s => s.slug === slug);
