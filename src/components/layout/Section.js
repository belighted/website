import classNames from "classnames";
import React from "react";
import * as PropTypes from "prop-types";

export function SectionHeader({ title, body, modifier, withoutEyebrow }) {
  if (withoutEyebrow) {
    return (
      <div
        className={classNames(
          "c-section-header",
          modifier && `c-section-header--${modifier}`
        )}
      >
        <h2
          className={classNames(
            "c-heading c-heading--2",
            "c-heading--title",
            modifier && `c-heading--${modifier}`
          )}
        >
          {title}
        </h2>
        {body && (
          <div
            className={classNames(
              "c-heading c-heading--3",
              modifier && `c-heading--${modifier}`
            )}
          >
            {body}
          </div>
        )}
      </div>
    );
  }
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
            "c-heading--title",
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

export const Section = ({ section, children, modifier, withoutEyebrow }) => {
  return (
    <section
      className={classNames(
        "c-section",
        modifier && `c-section--${modifier}`,
        section.slug
      )}
    >
      <div className="o-wrapper">
        <SectionHeader
          title={section.title}
          body={section.body}
          withoutEyebrow={withoutEyebrow}
        />
        <div className={"c-section__content"}>{children}</div>
      </div>
    </section>
  );
};

export const findSection = (sections, slug) =>
  sections.find(s => s.slug === slug);
