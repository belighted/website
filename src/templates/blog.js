import React from "react"
import Layout from "../components/Layout"
//import { graphql, Link } from "gatsby"
//import useBlogData from "../static_queries/useBlogData"
//this component handles the blur img & fade-ins
import Img from "gatsby-image"

export default function Blog(props) {
  const data = props.data

  return (
    <Layout>
      <article>
        <h1>{data.title}</h1>
      </article>
    </Layout>
  )
}
