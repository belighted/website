import React from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import locales from "../../constants/locales";
import Img from "gatsby-image";
import moment from "moment";

export default function BlogList() {
  const {
    allPostsYaml: { nodes }
  } = useStaticQuery(
    graphql`
      {
        allPostsYaml(
          sort: { fields: [date], order: DESC }
          filter: { lang: { eq: "en" } }
        ) {
          nodes {
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
        }
      }
    `
  );

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
                    <li key={tag.value}>{tag.label}</li>
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
