import React, { useContext } from "react";
import Contact from "./components/footer/Contact";
import Social from "./components/footer/Social";
import LocalizedLink from "../links/LocalizedLink";
import LocalizedHubspotForm from "../forms/LocalizedHubspotForm";
import { graphql, useStaticQuery } from "gatsby";
import { I18nContext } from "../i18n/I18n";

const Footer = () => {
  const lang = useContext(I18nContext);
  const {
    footers: { nodes: footers }
  } = useStaticQuery(graphql`
    query {
      footers: allDataYaml(filter: { slug: { eq: "footer" } }) {
        nodes {
          lang
          links {
            label
            to
          }
        }
      }
    }
  `);

  const footer = footers.find(l => l.lang === lang);
  return (
    <div className="c-footer-nav u-padding-vertical-large@tablet u-padding-horizontal@tablet">
      <div className="o-wrapper">
        <div className="l-footer">
          <div className="l-footer__credentials">
            <Contact />
            <Social />
          </div>
          <div className="l-footer__links">
            <ul>
              {footer.links.map(link => (
                <li key={link.to}>
                  <LocalizedLink to={link.to}>{link.label}</LocalizedLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="l-footer__form">
            <div className="o-box o-box--light-bg">
              <div>
                <h2 className="c-heading c-heading--2">
                  {lang === "fr"
                    ? "Parlons de votre projet"
                    : "Let's talk about your project"}
                </h2>
                <LocalizedHubspotForm
                  en={"e33b8c5c-e1a1-472e-b521-0d87274e106f"}
                  fr={"b7dc0d8b-fcf2-4d60-befa-0f30aaf1701d"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
