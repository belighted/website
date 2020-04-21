import React from "react";
import Contact from "./components/footer/Contact";
import Social from "./components/footer/Social";
import LinkToService from "../services/LinkToService";
import LinkToResource from "../resources/LinkToResource";
import LocalizedLink from "../links/LocalizedLink";
import LocalizedHubspotForm from "../forms/LocalizedHubspotForm";

const Footer = () => {
  return (
    <div className="c-footer-nav u-padding-vertical-large u-padding-horizontal">
      <div className="o-wrapper">
        <div className="l-footer">
          <div className="l-footer__credentials">
            <Contact />
            <Social />
          </div>
          <div className="l-footer__links">
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
              <li>
                <LinkToService slug={"product-development-consultation"}>
                  Free assessment
                </LinkToService>
              </li>
              <li>
                <LinkToService slug={"strategy-workshop"}>
                  Strategy workshop
                </LinkToService>
              </li>
              <li>
                <LinkToService slug={"design sprint"}>
                  Design sprint
                </LinkToService>
              </li>
              <li>
                <LocalizedLink to={"/technologies"}>
                  Technnologies
                </LocalizedLink>
              </li>
              <li>
                <LocalizedLink to={"/careers"}>Careers</LocalizedLink>
              </li>
            </ul>
            <ul>
              <li>
                <LinkToResource slug={"saas-guide-to-software-as-service"}>
                  Saas
                </LinkToResource>
              </li>
              <li>
                <LocalizedLink to={"/estimate-project"}>
                  Estimate project
                </LocalizedLink>
              </li>
            </ul>
          </div>
          <div>
            <LocalizedHubspotForm
              en={"e33b8c5c-e1a1-472e-b521-0d87274e106f"}
              fr={"b7dc0d8b-fcf2-4d60-befa-0f30aaf1701d"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
