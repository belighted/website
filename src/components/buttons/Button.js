import React from "react";
import * as classnames from "classnames";


const Button = ({ children, modifier = "primary" }) => {
  return <div className={classnames("c-button",modifier && `c-button--${modifier}`)}>{children}</div>;
};

export default Button;
