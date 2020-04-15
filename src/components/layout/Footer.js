import React from "react";
import Contact from "./components/footer/Contact";
import Social from "./components/footer/Social";
import LinkToService from "../services/LinkToService";

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
            <ul>
              <li>
                <LinkToService slug={"code-review"}>Code review</LinkToService>
              </li>
              <li>
                <LinkToService slug={"ux-review"}>UX Review</LinkToService>
              </li>
              <li>
                <LinkToService slug={"user-testing"}>
                  User testing
                </LinkToService>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
