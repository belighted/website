import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout/Layout";
import Slices from "../components/slices/Slices";
import HubspotForm from "../components/forms/HubspotForm";
import GatsbyImage from "gatsby-image";
import classNames from "classnames";

const ResourcePage = ({ data: { resourcesYaml: post }, pageContext }) => (
  <Layout context={pageContext} page={"resource"} title={post.title}>
    <div className={classNames("o-wrapper", "c-resource", post.slug)}>
      <main className="c-resource__content">
        <article>{post.slices && <Slices slices={post.slices} />}</article>
      </main>
      <div className="c-resource__image">
        <GatsbyImage fluid={post.image.childImageSharp.fluid} />
      </div>
      {post.aside && (
        <aside className="c-resource__form">
          <h2 className="c-heading c-heading--3">{post.aside.title}</h2>
          <HubspotForm formId={post.aside.formId} />
        </aside>
      )}
    </div>
  </Layout>
);

export const query = graphql`
  query($slug: String!, $lang: String!) {
    resourcesYaml(slug: { eq: $slug }, lang: { eq: $lang }) {
      slug
      title
      image {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      aside {
        title
        formId
      }
      slices {
        title
        type
        subtitle
        id
        body
        chapters {
          title
          body
          intro
        }
      }
    }
    history: mdx(
      frontmatter: { slug: { eq: "our-history" }, lang: { eq: $lang } }
    ) {
      frontmatter {
        title
        cta {
          title
          link
        }
      }
      body
    }
  }
`;

export default ResourcePage;
