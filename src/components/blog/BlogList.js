import React from "react";
import { graphql, Link } from "gatsby";
import locales from "../../constants/locales";
import Img from "gatsby-image";
import moment from "moment";
import LinkToTag from "./LinkToTag";

export default function BlogList({ nodes }) {
  return (
    <section>
      <ul className="o-list-bare">
        {nodes.map(post => (
          <li>
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
                  <h2 className="c-heading--3 c-heading u-margin-bottom-small">
                    {post.title}
                  </h2>
                  <p className="c-body c-body--3">
                    <strong>{post.author}</strong>&nbsp;
                    <span>on {moment(post.date).format("DD MMMM YYYY")}</span>
                  </p>
                </div>
                <div>{post.description}</div>
                <Link to={`${locales[post.lang].path}/blog/${post.slug}`}>
                  Read more
                </Link>
                <ul>
                  {post.tags.map(tag => (
                    <li key={tag.value}>
                      <LinkToTag slug={tag.value}>{tag.label}</LinkToTag>
                    </li>
                  ))}
                </ul>
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
