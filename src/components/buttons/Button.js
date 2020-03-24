import React from "react";
import * as classnames from "classnames";


const Button = ({ children, modifier = "primary" }) => {
  return <span className={classnames("c-button",modifier && `c-button--${modifier}`)}>{children}</span>;
};

export default Button;
