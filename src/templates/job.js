import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout/Layout";
import JobsList from "../components/jobs/JobsList";
import LocalizedHubspotForm from "../components/forms/LocalizedHubspotForm";

//TODO I18n View all of our openings

const ServicePage = ({
  data: {
    markdownRemark: {
      frontmatter: { title },
      html
    }
  },
  pageContext
}) => (
  <Layout context={pageContext} page={"blog"}>
    <section className="c-section">
      <article className="o-wrapper">
        <Link to={"/careers"}>&#8592; View all of our openings</Link>
        <h1 className="c-heading c-heading--title c-heading--1">{title}</h1>
        <div className="l-text-and-list">
          <div
            className="l-text-and-list__text c-wysiwyg"
            dangerouslySetInnerHTML={{ __html: html }}
          />
          <div className="l-text-and-list__list">
            <JobsList />
          </div>
        </div>
      </article>
      <aside>
        <LocalizedHubspotForm
          fr={"d0af5be0-93c5-4c23-91f1-8d36f12a94ff"}
          en={"ba833c67-22e2-4628-b037-8b70ac75e8b7"}
        />
      </aside>
    </section>
  </Layout>
);

export const query = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        title
      }
      html
    }
  }
`;

export default ServicePage;
