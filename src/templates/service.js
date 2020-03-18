import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout/Layout"

const BlogArticle = ({ data: { servicesYaml: post }, pageContext }) => (
  <Layout context={pageContext} page={"blog"}>
    <article>
      <h2>{post.title}</h2>
    </article>
  </Layout>
)

export const query = graphql`
  query($slug: String!) {
    servicesYaml(slug: { eq: $slug }) {
      slug
      title
    }
  }
`

export default BlogArticle
