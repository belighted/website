import React from "react"
import { graphql } from "gatsby"

const ComponentName = ({ data: { postsYaml: post } }) => (
  <article>
    <h2>{post.article.title}</h2>
    <div dangerouslySetInnerHTML={{ __html: post.article.content }}></div>
  </article>
)

export const query = graphql`
  query($slug: String!) {
    postsYaml(slug: { eq: $slug }) {
      slug
      article {
        title
        content
      }
    }
  }
`

export default ComponentName
