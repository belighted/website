import React from "react";
import Button from "../buttons/Button";

const Hero = ({ title, body, buttons = [] }) => {
  return (
    <div className="o-wrapper c-hero">
      <div>
        <h1 className="c-heading c-heading--1">{title}</h1>
        <p className={"c-body c-body--3"}>{body}</p>
        {buttons.map(button => (
          <p>
            <Button modifier={button.modifier}>{button.title}</Button>
          </p>
        ))}
      </div>
    </div>
  );
};

export default Hero;
