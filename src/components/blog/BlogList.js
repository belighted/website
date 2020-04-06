import React from "react";
import { graphql, Link } from "gatsby";
import locales from "../../constants/locales";
import Img from "gatsby-image";
import moment from "moment";
import BlogpostTags from "./components/BlogpostTags";
import LinkToBlog from "./LinkToBlog";
import LocalizedLink from "../links/LocalizedLink";

export default function BlogList({ nodes }) {
  return (
    <section>
      <ul className="o-list-bare">
        {nodes.map(post => (
          <li key={post.slug}>
            <div className="o-media u-margin-bottom">
              <div className="o-media__img">
                {post.featuredImage && post.featuredImage.childImageSharp && (
                  <Img fixed={post.featuredImage.childImageSharp.fixed} />
                )}
                {(!post.featuredImage ||
                  !post.featuredImage.childImageSharp) && <div>Empty</div>}
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
                    <span>on {moment(post.date).format("DD MMMM YYYY")}</span>
                  </p>
                </div>
                <div>{post.description}</div>
                <div className="u-margin-top">
                  <LocalizedLink to={`/articles/${post.slug}`}>
                    <span className="c-button c-button--outline-primary">
                      Read more
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
  fragment BlogPostItem on PostsYaml {
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
`;
