import React from "react";
import FooterServices from "./components/footer/Services";
import Contact from "./components/footer/Contact";

const Footer = () => {
  return (
    <div className="c-footer-nav u-padding-vertical-large u-padding-horizontal">
      <Contact />
      <FooterServices />
    </div>
  );
};

export default Footer;
