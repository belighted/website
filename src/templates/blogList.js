import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout/Layout";
import BlogList from "../components/blog/BlogList";
import Pagination from "../components/blog/Pagination";

const BlogListPage = ({
  data: {
    posts: { nodes }
  },
  pageContext
}) => {
  const { currentPage, numPages } = pageContext;

  return (
    <Layout context={pageContext} page={"blog"}>
      <section className={"o-wrapper c-section"}>
        <BlogList nodes={nodes} />
        <Pagination currentPage={currentPage} numPages={numPages} />
      </section>
    </Layout>
  );
};

export const query = graphql`
  query BlogListPageQuery($lang: String!, $skip: Int!, $limit: Int!) {
    posts: allMarkdownRemark(
      filter: {
        frontmatter: { lang: { eq: $lang } }
        fields: { collection: { eq: "articles" } }
      }
      limit: $limit
      skip: $skip
    ) {
      nodes {
        ...BlogPostItem
      }
    }
  }
`;

export default BlogListPage;
