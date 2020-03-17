import React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import locales from "../constants/locales"

export default function BlogList() {
  const {
    allPostsYaml: { nodes },
  } = useStaticQuery(
    graphql`
      {
        allPostsYaml {
          nodes {
            slug
            lang
            article {
              title
            }
          }
        }
      }
    `
  )

  return (
    <section>
      <ul>
        {nodes.map(post => (
          <li>
            <Link to={`${locales[post.lang].path}/blog/${post.slug}`}>
              {post.article.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
