import React from "react";
import { Link } from "gatsby";
import locales from "../constants/locales";

const MenuLink = ({ name, lang }) => {
  return <Link to={`${locales[lang].path}/${name}`}>{name}</Link>;
};

export default function Header({ page, lang }) {
  return (
    <header>
      <nav role="navigation" aria-label="main navigation">
        <Link to="/">
          <h1>Belighted</h1>
        </Link>
        <div>
          <MenuLink currentPage={page} name={"services"} lang={lang} />
          <MenuLink currentPage={page} name={"clients"} lang={lang} />
          <MenuLink currentPage={page} name={"about"} lang={lang} />
          <MenuLink currentPage={page} name={"resources"} lang={lang} />
          <MenuLink currentPage={page} name={"blog"} lang={lang} />
        </div>
        <div>
          {Object.keys(locales).map(lang => (
            <Link to={`${locales[lang].path}/${page}`}>
              {locales[lang].label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
