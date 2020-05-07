import React, { useContext } from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout/Layout";
import JobsList from "../components/jobs/JobsList";
import LocalizedHubspotForm from "../components/forms/LocalizedHubspotForm";
import { I18nContext } from "../components/i18n/I18n";

const I18n = {
  form_title: {
    en: "Get one step closer to glory.  Apply now!",
    fr: "Get one step closer to glory.  Apply now!"
  },
  open_positions: { en: "Open positions", fr: "Open positions" },
  view_positions: {
    en: "View all of our openings",
    fr: "View all of our openings"
  }
};

const ServicePage = ({
  data: {
    markdownRemark: {
      frontmatter: { title },
      html
    }
  },
  pageContext
}) => {
  const lang = useContext(I18nContext);
  return (
    <Layout context={pageContext} page={"job"} title={title}>
      <div className="l-content-sidebar o-wrapper">
        <section className="o-wrapper">
          <Link to={"/careers"}>&#8592; {I18n.view_positions[lang]}</Link>
          <article>
            <h1 className="c-heading c-heading--title c-heading--1">{title}</h1>
            <div
              className="l-text-and-list__text c-wysiwyg"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </article>
          <h2 className="c-heading c-heading--2">{I18n.form_title[lang]}</h2>
          <LocalizedHubspotForm
            fr={"d0af5be0-93c5-4c23-91f1-8d36f12a94ff"}
            en={"ba833c67-22e2-4628-b037-8b70ac75e8b7"}
          />
        </section>
        <aside>
          <h2 className="c-heading c-heading--2">
            {I18n.open_positions[lang]}
          </h2>
          <JobsList />
        </aside>
      </div>
    </Layout>
  );
};

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
