import React from "react";
import * as classnames from "classnames";

const CtaButton = ({ cta, modifier = "primary" }) => {
  return (
    <a
      className={classnames("c-button", `c-button--${modifier}`)}
      href={cta.link}
    >
      {cta.label}
    </a>
  );
};

export default CtaButton;
