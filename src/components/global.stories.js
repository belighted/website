import React from "react";
import { action } from "@storybook/addon-actions";

export default {
  title: "Global"
};

export const Elements = () => (
  <div>
    <h1>Title 1</h1>
    <h2>Title 2</h2>
    <h3>Title 3</h3>
    <h4>Title 4</h4>
    <h5>Title 4</h5>
    <h6>Title 4</h6>
    <p>Paragraph</p>
    <p>
      Some <a href="">Link</a>, a <strong>Strong</strong>, a to finish a&nbsp;
      <small>Small</small>
    </p>
  </div>
);

export const Headings = () => (
  <div>
    <section className="c-section o-box">
      <p className="c-heading">Heading</p>
      <p className="c-heading c-heading--title">Heading title</p>
      <p className="c-heading c-heading--eyebrow">Heading eyebrow</p>
    </section>
    <section className="c-section o-box c-section--dark-bg">
      <p className="c-heading c-heading--invert">Heading invert</p>
      <p className="c-heading c-heading--invert c-heading--title ">
        Heading title
      </p>
      <p className="c-heading c-heading--invert c-heading--eyebrow">
        Heading eyebrow
      </p>
    </section>
  </div>
);

export const HeadingsStyles = () => (
  <div>
    <section className="c-section o-box">
      <p className="c-heading c-heading--1">Heading 1</p>
      <p className="c-heading c-heading--2">Heading 2</p>
      <p className="c-heading c-heading--3">Heading 3</p>
      <p className="c-heading c-heading--4">Heading 4</p>
      <p className="c-heading c-heading--5">Heading 5</p>
      <p className="c-heading c-heading--6">Heading 6</p>
    </section>
    <section className="c-section o-box c-section--dark-bg">
      <p className="c-heading c-heading--1 c-heading--invert">Heading 1</p>
      <p className="c-heading c-heading--2 c-heading--invert">Heading 2</p>
      <p className="c-heading c-heading--3 c-heading--invert">Heading 3</p>
      <p className="c-heading c-heading--4 c-heading--invert">Heading 4</p>
      <p className="c-heading c-heading--5 c-heading--invert">Heading 5</p>
      <p className="c-heading c-heading--6 c-heading--invert">Heading 6</p>
    </section>
  </div>
);
