import React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"

export default function BlogList() {
  const {
    allPostsYaml: { nodes },
  } = useStaticQuery(
    graphql`
      {
        allPostsYaml {
          nodes {
            slug
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
        {nodes.map(node => (
          <li>
            <Link to={`/blog/${node.slug}`}>
              <a href="">{node.article.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
