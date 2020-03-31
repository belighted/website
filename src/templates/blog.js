import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout/Layout";
import moment from "moment";
import BlogpostTags from "../components/blog/components/BlogpostTags";
import LocalizedLink from "../components/links/LocalizedLink";

//TODO I18n The belighted blog

const BlogArticle = ({ data: { postsYaml: post }, pageContext }) => (
  <Layout context={pageContext} page={"blog"}>
    <article className="o-wrapper">
      <LocalizedLink route={"blog"}>The belighted blog</LocalizedLink>

      <h1 className="c-heading c-heading--2">{post.title}</h1>
      <p className="c-body c-body--3">
        <strong>{post.author}</strong>&nbsp;
        <span>on {moment(post.date).format("DD MMMM YYYY")}</span>
      </p>
      <div dangerouslySetInnerHTML={{ __html: post.body }}></div>
      <BlogpostTags post={post} />
    </article>
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
      featuredImage {
        childImageSharp {
          # Specify the image processing specifications right in the query.
          # Makes it trivial to update as your page's design changes.
          fixed(width: 240, height: 160) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  }
`;

export default BlogArticle;
