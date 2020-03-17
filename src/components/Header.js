import React from "react";
import { Link } from "gatsby";
import locales from "../constants/locales";

const MenuLink = ({ name, lang }) => {
  return <Link to={`${locales[lang].path}/${name}`}>{name}</Link>;
};

export default function Header({ currentPage, lang }) {
  return (
    <header>
      <nav role="navigation" aria-label="main navigation">
        <Link to="/">
          <h1>Belighted</h1>
        </Link>
        <div>
          <MenuLink currentPage={currentPage} name={"services"} lang={lang} />
          <MenuLink currentPage={currentPage} name={"clients"} lang={lang} />
          <MenuLink currentPage={currentPage} name={"about"} lang={lang} />
          <MenuLink currentPage={currentPage} name={"resources"} lang={lang} />
          <MenuLink currentPage={currentPage} name={"blog"} lang={lang} />
        </div>
      </nav>
    </header>
  );
}
