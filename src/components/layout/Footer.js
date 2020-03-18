import React from "react";
import ServicesList from "../services/ServicesList";
import DevNote from "../dev/DevNote";

const Footer = () => {
  return (
    <div className="c-footer-nav">
      <DevNote>Footer</DevNote>
      <ServicesList />
    </div>
  );
};

export default Footer;
