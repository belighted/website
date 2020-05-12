import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout/Layout";
import moment from "moment";
import BlogpostTags from "../components/blog/components/BlogpostTags";
import LocalizedLink from "../components/links/LocalizedLink";
import TagList from "../components/blog/TagList";
import LocalizedHubspotForm from "../components/forms/LocalizedHubspotForm";

//TODO I18n The belighted blog

const BlogArticle = ({
  data: {
    post: { frontmatter: post, html }
  },
  pageContext
}) => (
  <Layout context={pageContext} page={"blog"} title={post.title}>
    <div className="o-wrapper">
      <div className="l-content-sidebar">
        <article className="l-content-sidebar__main">
          <LocalizedLink to={"blog"}>The belighted blog</LocalizedLink>

          <h1 className="c-heading c-heading--2">{post.title}</h1>
          <p className="c-body c-body--3">
            <strong>{post.author}</strong>&nbsp;
            <span>
              &nbsp;-&nbsp;
              {moment(post.date, "YYYY-MM-DD").format("DD MMMM YYYY")}
            </span>
          </p>
          <div
            className="c-wysiwyg"
            dangerouslySetInnerHTML={{ __html: html }}
          />
          <BlogpostTags post={post} />
        </article>
        <aside className="l-content-sidebar__sidebar">
          <TagList />
          <LocalizedHubspotForm
            en={"28c0162d-16b7-4003-923b-0aaf49d4f966"}
            fr={"feeae27a-b6d8-46f8-b2a1-66e0ae96c1ad"}
          />
        </aside>
      </div>
    </div>
  </Layout>
);

export const query = graphql`
  query($slug: String!) {
    post: markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        slug
        lang
        title
        author
        date
        tags {
          label
          value
        }
        image {
          childImageSharp {
            # Specify the image processing specifications right in the query.
            # Makes it trivial to update as your page's design changes.
            fixed(width: 160, height: 160) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
  }
`;

export default BlogArticle;
