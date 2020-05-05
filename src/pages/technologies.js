import React from "react";
import Layout from "../components/layout/Layout";
import { graphql } from "gatsby";
import TechnoLogo from "../components/clients/TechnoLogo";

const ClientsPage = ({
  pageContext,
  data: {
    singlesYaml: { title, categories }
  }
}) => {
  return (
    <Layout context={pageContext} page={"clients"}>
      <div className="o-wrapper c-section">
        <h1 className="c-heading c-heading--1 c-heading--title">{title}</h1>
        <ul className="o-list-bare">
          {categories.map(category => (
            <li
              key={category.title}
              className="o-list-bare__item u-margin-bottom-large"
            >
              <h1 className="c-heading c-heading--2">{category.title}</h1>
              <ul>
                {category.values.map(value => (
                  <li key={value}>
                    <TechnoLogo slug={value} />
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default ClientsPage;

export const query = graphql`
  query TechnologiesPage($lang: String!) {
    singlesYaml(slug: { eq: "technologies" }, lang: { eq: $lang }) {
      title
      categories {
        title
        values
      }
    }
  }
`;
