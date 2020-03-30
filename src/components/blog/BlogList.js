import React from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import locales from "../../constants/locales";

export default function BlogList() {
  const {
    allPostsYaml: { nodes }
  } = useStaticQuery(
    graphql`
      {
        allPostsYaml {
          nodes {
            slug
            lang
            title
            image
            description
          }
        }
      }
    `
  );

  return (
    <section>
      <ul>
        {nodes.map(post => (
          <li>
            <h2 className="c-heading--2 c-heading">{post.title}</h2>
            <img src={post.image} />
            <div>{post.description}</div>

            <Link to={`${locales[post.lang].path}/blog/${post.slug}`}>
              Read more
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
