import React from "react";
import { Link } from "gatsby";
import locales from "../../constants/locales";
import classNames from 'classnames';

const MenuLink = ({ name, lang }) => {
  return (
    <Link
      to={`${locales[lang].path}/${name}`}
      className={classNames("c-site-nav__item", "c-site-nav-link")}
      activeClassName={"active"}
      partiallyActive={true}
    >
      {name}
    </Link>
  );
};

export default function Header({ page, context: { lang } }) {
  return (
    <header className="c-site-header">
      <nav
        role="navigation"
        aria-label="main navigation"
        className="o-wrapper c-site-header__wrapper"
      >
        <Link to="/" className="c-site-header__logo">
          <img src={"/logo.svg"} alt="Belighted" />
        </Link>
        <div className="c-site-header__nav c-site-nav">
          <MenuLink name={"services"} lang={lang} />
          <MenuLink name={"clients"} lang={lang} />
          <MenuLink name={"about"} lang={lang} />
          <MenuLink name={"resources"} lang={lang} />
          <MenuLink name={"blog"} lang={lang} />
        </div>
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
      </nav>
    </header>
  );
}
