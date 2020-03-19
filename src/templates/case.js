import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout/Layout";

const Testimonial = ({ testimonial: { body, author, role } }) => {
  return (
    <div>
      <div>{body}</div>
      <div>
        {author} <small>{role}</small>
      </div>
    </div>
  );
};

const CaseArticle = ({
  data: { casesYaml: post, testimonialsYaml: testimonial },
  pageContext
}) => (
  <Layout context={pageContext} page={"blog"}>
    <article className="o-wrapper">
      <h2>{post.title}</h2>
      {testimonial && (
        <section className="c-section">
          <h3 className="c-section__header c-h3">Testimonial</h3>
          <div className="c-section__body">
            <Testimonial testimonial={testimonial}></Testimonial>
          </div>
        </section>
      )}
    </article>
  </Layout>
);

export const query = graphql`
  query($slug: String!) {
    casesYaml(slug: { eq: $slug }) {
      slug
      title
    }
    testimonialsYaml(slug: { eq: $slug }) {
      slug
      author
      body
      role
    }
  }
`;

export default CaseArticle;
