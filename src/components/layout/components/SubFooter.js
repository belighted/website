import React from "react";
import LocalizedLink from "../../links/LocalizedLink";

const SubFooter = () => {
  return (
    <div className="c-subfooter">
      <ul className="o-wrapper o-list-inline u-margin-none">
        <LocalizedLink to="/" className="c-subfooter__item">
          © 2019 Belighted - SaaS & Software Development Agency
        </LocalizedLink>
        <LocalizedLink
          to="/files/Belighted-GTC-2017.pdf"
          className="c-subfooter__item"
        >
          Terms & Conditions
        </LocalizedLink>
        <LocalizedLink to="/privacy" className="c-subfooter__item">
          Privacy Policy
        </LocalizedLink>
      </ul>
    </div>
  );
};

export default SubFooter;
