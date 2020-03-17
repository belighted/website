import React from "react"
import { Link } from "gatsby"

export default function Header(props) {
  return (
    <header>
      <nav role="navigation" aria-label="main navigation">
        <Link to="/">
          <h1>{props.title}</h1>
        </Link>
        <div>
          <h1>
            <Link to={props.page === "info" ? "/" : "/info"}>
              {props.page === "info" ? "close" : "info"}
            </Link>
          </h1>
        </div>
      </nav>
    </header>
  )
}
