import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout/Layout";
import LocalizedLink from "../components/links/LocalizedLink";

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
      <LocalizedLink route={"/clients"}>See all cases</LocalizedLink>
      <h2>{post.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: post.about }}></div>
      <div className="l-grid l-grid--2cols">
        <div dangerouslySetInnerHTML={{ __html: post.problem }}></div>
        <div dangerouslySetInnerHTML={{ __html: post.goals }}></div>
      </div>
      {testimonial && (
        <section className="c-section">
          <h3 className="c-section__header c-h3">Testimonial</h3>
          <div className="c-section__body">
            <Testimonial testimonial={testimonial}></Testimonial>
          </div>
        </section>
      )}
      <div dangerouslySetInnerHTML={{ __html: post.challenges }}></div>
      <div dangerouslySetInnerHTML={{ __html: post.results }}></div>
    </article>
  </Layout>
);

export const query = graphql`
  query($slug: String!) {
    casesYaml(slug: { eq: $slug }) {
      slug
      title
      about
      goals
      problem
      challenges
      results
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
