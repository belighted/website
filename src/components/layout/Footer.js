import React from "react";
import FooterServices from "./components/footer/Services";
import Contact from "./components/footer/Contact";
import Social from "./components/footer/Social";

const Footer = () => {
  return (
    <div className="c-footer-nav u-padding-vertical-large u-padding-horizontal">
      <div className="o-wrapper">
        <div className="l-introcontent">
          <div className="l-introcontent__intro">
            <Contact />
            <Social />
          </div>
          <div className="l-introcontent__main">
            <FooterServices />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
