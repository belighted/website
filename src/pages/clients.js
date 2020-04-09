import React from "react";
import Layout from "../components/layout/Layout";
import { SectionHeader } from "../components/layout/Section";
import ClientsCasesList from "../components/cases/ClientCasesList";
import { graphql } from "gatsby";

const ClientsPage = ({
  pageContext,
  data: {
    markdownRemark: {
      frontmatter: { title, body }
    }
  }
}) => {
  return (
    <Layout context={pageContext} page={"clients"}>
      <div className="o-wrapper c-section">
        <SectionHeader title={title} body={body} />
        <ClientsCasesList />
      </div>
    </Layout>
  );
};

export default ClientsPage;

export const query = graphql`
  {
    markdownRemark(frontmatter: { slug: { eq: "clients" } }) {
      frontmatter {
        title
        body
      }
    }
  }
`;
