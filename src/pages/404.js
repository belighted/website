import React from "react";
import { Link } from "gatsby";
import Layout from "../components/layout/Layout";

export default function NotFound({ pageContext }) {
  return (
    <Layout page="404" context={pageContext}>
      <div>
        <Link to="/">
          <h1>Sorry, couldn't find that page.</h1>
        </Link>
      </div>
    </Layout>
  );
}
