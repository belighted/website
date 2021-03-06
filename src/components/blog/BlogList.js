import React, { useContext } from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import moment from "moment";
import BlogpostTags from "./components/BlogpostTags";
import LinkToBlog from "./LinkToBlog";
import LocalizedLink from "../links/LocalizedLink";
import { I18nContext } from "../i18n/I18n";

export default function BlogList({ nodes }) {
  const lang = useContext(I18nContext);
  return (
    <section>
      <ul className="o-list-bare">
        {nodes.map(({ frontmatter: post }) => (
          <li key={post.slug}>
            <div className="o-media u-margin-bottom">
              <div className="o-media__img">
                {post.image && post.image.childImageSharp && (
                  <Img fixed={post.image.childImageSharp.fixed} />
                )}
                {(!post.image || !post.image.childImageSharp) && (
                  <div>{post.image}</div>
                )}
              </div>
              <div className="o-media__body">
                <div className="u-margin-bottom">
                  <LinkToBlog slug={post.slug}>
                    <h2 className="c-heading--3 c-heading u-margin-bottom-small">
                      {post.title}
                    </h2>
                  </LinkToBlog>
                  <p className="c-body c-body--3">
                    <strong>{post.author}</strong>&nbsp;
                    <span>
                      &nbsp;-&nbsp;
                      {moment(post.date, "YYYY-MM-DD").format("DD MMMM YYYY")}
                    </span>
                  </p>
                </div>
                <div>{post.description}</div>
                <div className="u-margin-top">
                  <LocalizedLink to={`/articles/${post.slug}`}>
                    <span className="c-button c-button--outline-primary">
                      {lang === "en" ? "Read more" : "Lire plus"}
                    </span>
                  </LocalizedLink>
                </div>
                <BlogpostTags post={post} />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export const blogPostItem = graphql`
  fragment BlogPostItem on MarkdownRemark {
    frontmatter {
      slug
      lang
      title
      author
      date
      description
      tags {
        label
        value
      }
      image {
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
