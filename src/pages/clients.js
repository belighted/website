import React from "react";
import Layout from "../components/layout/Layout";
import ClientsCasesList from "../components/cases/ClientCasesList";
import { graphql } from "gatsby";

const ClientsPage = ({
  pageContext,
  data: {
    markdownRemark: {
      frontmatter: { title }
    }
  }
}) => {
  return (
    <Layout context={pageContext} page={"clients"}>
      <div className="o-wrapper c-section">
        <h1 className="c-heading c-heading--1 c-heading--title">{title}</h1>
        <ClientsCasesList />
      </div>
    </Layout>
  );
};

export default ClientsPage;

export const query = graphql`
  query ClientPage($lang: String!) {
    markdownRemark(
      frontmatter: { slug: { eq: "clients" }, lang: { eq: $lang } }
    ) {
      frontmatter {
        title
      }
    }
  }
`;
