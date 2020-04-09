import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout/Layout";
import moment from "moment";
import BlogpostTags from "../components/blog/components/BlogpostTags";
import LocalizedLink from "../components/links/LocalizedLink";
import TagList from "../components/blog/TagList";

//TODO I18n The belighted blog

const BlogArticle = ({ data: { postsYaml: post }, pageContext }) => (
  <Layout context={pageContext} page={"blog"}>
    <div className="o-wrapper">
      <div className="l-content-sidebar">
        <article className="l-content-sidebar__main">
          <LocalizedLink to={"blog"}>The belighted blog</LocalizedLink>

          <h1 className="c-heading c-heading--2">{post.title}</h1>
          <p className="c-body c-body--3">
            <strong>{post.author}</strong>&nbsp;
            <span>on {moment(post.date).format("DD MMMM YYYY")}</span>
          </p>
          <div
            className="c-wysiwyg"
            dangerouslySetInnerHTML={{ __html: post.body }}
          />
          <BlogpostTags post={post} />
        </article>
        <aside className="l-content-sidebar__sidebar">
          <TagList />
        </aside>
      </div>
    </div>
  </Layout>
);

export const query = graphql`
  query($slug: String!) {
    postsYaml(slug: { eq: $slug }) {
      slug
      lang
      title
      author
      date
      body
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
`;

export default BlogArticle;
