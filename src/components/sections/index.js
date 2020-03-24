import classNames from "classnames";
import React from "react";
import * as PropTypes from "prop-types";

export function SectionHeader(props) {
  return (
    <div className="c-section-header">
      <h2 className="c-heading c-heading--eyebrow">{props.title}</h2>
      {props.body && <div className="c-heading c-heading--2">{props.body}</div>}
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
