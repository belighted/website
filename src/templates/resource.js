import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout/Layout";

const ServicePage = ({ data: { resourcesYaml: post }, pageContext }) => (
  <Layout context={pageContext} page={"blog"}>
    <article className="o-wrapper">
      <section className="c-section">
        <h2>{post.title}</h2>
        {post.sections &&
          post.sections.map(section => (
            <div className={"c-section"} key={section}>
              <div
                className="o-wrapper c-wysiwyg"
                dangerouslySetInnerHTML={{ __html: section }}
              />
            </div>
          ))}
      </section>
    </article>
  </Layout>
);

export const query = graphql`
  query($slug: String!) {
    resourcesYaml(slug: { eq: $slug }) {
      slug
      title
      sections
    }
  }
`;

export default ServicePage;
