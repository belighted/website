import React, { useContext } from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout/Layout";
import LocalizedLink from "../components/links/LocalizedLink";
import LocalizedHubspotForm from "../components/forms/LocalizedHubspotForm";
import { I18nContext } from "../components/i18n/I18n";

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
}) => {
  const lang = useContext(I18nContext);
  return (
    <Layout context={pageContext} page={"blog"} title={post.title}>
      <div className="o-wrapper l-content-sidebar">
        <article className="l-content-sidebar__content">
          <LocalizedLink to={"/clients"}>See all cases</LocalizedLink>
          <h2>{post.title}</h2>
          <div
            className="c-wysiwyg"
            dangerouslySetInnerHTML={{ __html: post.about }}
          ></div>
          <div className="l-grid l-grid--2cols">
            <div
              className="c-wysiwyg"
              dangerouslySetInnerHTML={{ __html: post.problem }}
            ></div>
            <div
              className="c-wysiwyg"
              dangerouslySetInnerHTML={{ __html: post.goals }}
            ></div>
          </div>
          {testimonial && (
            <section className="c-section">
              <h3 className="c-section__header c-h3">Testimonial</h3>
              <div className="c-section__body">
                <Testimonial testimonial={testimonial}></Testimonial>
              </div>
            </section>
          )}
          <div
            className="c-wysiwyg"
            dangerouslySetInnerHTML={{ __html: post.challenges }}
          ></div>
          <div
            className="c-wysiwyg"
            dangerouslySetInnerHTML={{ __html: post.results }}
          ></div>
        </article>
        <aside>
          <h2 className="c-heading c-heading--2">
            {lang === "fr"
              ? "En savoir plus sur cette étude de cas"
              : "Learn more about this case study"}
          </h2>
          <LocalizedHubspotForm
            fr={"fada6d0f-00d7-4829-a262-608aed248f92"}
            en={"b7e184b3-302a-4d5f-8392-0669402d45d9"}
          />
        </aside>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query($slug: String!, $lang: String!) {
    casesYaml(slug: { eq: $slug }, lang: { eq: $lang }) {
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
