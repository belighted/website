import React from "react";
import Layout from "../components/layout/Layout";
import { graphql } from "gatsby";
import ClientsPageList from "../components/cases/ClientsPageList";

const ClientsPage = ({
  pageContext,
  data: {
    clients: { title, clients, cta }
  }
}) => {
  return (
    <Layout context={pageContext} page={"clients"} title={title}>
      <div className="o-wrapper c-section">
        <h1 className="c-heading c-heading--1 c-heading--title">{title}</h1>
        <ClientsPageList clients={clients} cta={cta} />
      </div>
    </Layout>
  );
};

export default ClientsPage;

export const query = graphql`
  query ClientPage($lang: String!) {
    clients: singlesYaml(slug: { eq: "clients" }, lang: { eq: $lang }) {
      title
      cta {
        label
      }
      clients {
        slug
        image {
          childImageSharp {
            fluid(maxWidth: 350) {
              ...GatsbyImageSharpFluid_tracedSVG
            }
          }
        }
        title
        tags
        text
      }
    }
  }
`;
