import React from "react"
import { Link } from "gatsby"
import Layout from "../components/Layout"

export default function NotFound() {
  return (
    <Layout page="404" bgColor="inherit">
      <div>
        <Link to="/">
          <h1>Sorry, couldn't find that page.</h1>
        </Link>
      </div>
    </Layout>
  )
}
