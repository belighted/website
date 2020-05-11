import React from "react";
import { Link } from "gatsby";
import locales from "../../constants/locales";
import classNames from "classnames";
import Menu from "../../../assets/feather/menu.svg";
import Close from "../../../assets/feather/x.svg";

const { useState } = require("react");

const MenuLink = ({ name, lang }) => {
  return (
    <Link
      to={`${locales[lang].path}/${name}`}
      className={classNames("c-site-nav__link", "c-site-nav-link")}
      activeClassName={"active"}
      partiallyActive={true}
    >
      {name}
    </Link>
  );
};

export default function Header({ page, context: { lang } }) {
  const [active, toggleMenu] = useState(false);
  return (
    <header className="c-site-header">
      <nav
        role="navigation"
        aria-label="main navigation"
        className="o-wrapper c-site-header__wrapper"
      >
        <div className='c-site-header__header'>
          <Link to="/" className="c-site-header__logo">
            <img src={"/logo.svg"} alt="Belighted" />
          </Link>
          <button
            onClick={() => toggleMenu(!active)}
            className="c-site-header__toggle"
          >
            {active ? <Close /> : <Menu />}
          </button>
        </div>
        <div
          className={classNames({
            "c-site-header__nav": true,
            "c-site-nav": true,
            active
          })}
        >
          <ul className={"o-list-bare"}>
            <li className="c-site-nav__item">
              <MenuLink name={"services"} lang={lang} />
            </li>
            <li className="c-site-nav__item">
              <MenuLink name={"clients"} lang={lang} />
            </li>
            <li className="c-site-nav__item">
              <MenuLink name={"about"} lang={lang} />
            </li>
            <li className="c-site-nav__item">
              <MenuLink name={"resources"} lang={lang} />
            </li>
            <li className="c-site-nav__item">
              <MenuLink name={"blog"} lang={lang} />
            </li>
          </ul>
          <div className={"c-lang-switcher"}>
            {Object.keys(locales).map(lang => (
              <Link
                key={lang}
                to={`${locales[lang].path}/${page === "home" ? "" : page}`}
                className={"c-lang-switcher__item u-padding-small"}
              >
                {locales[lang].label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
