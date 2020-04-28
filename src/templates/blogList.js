import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout/Layout";
import BlogList from "../components/blog/BlogList";
import Pagination from "../components/blog/Pagination";
import WhatIsSaas from "../components/splits/WhatIsSaas";

const BlogListPage = ({
  data: {
    posts: { nodes }
  },
  pageContext
}) => {
  const { currentPage, numPages } = pageContext;

  return (
    <Layout context={pageContext} page={"blog"} title={"The belighted blog"}>
      <section className={"o-wrapper c-section"}>
        <div className="l-blog">
          <main className="l-blog__main">
            <BlogList nodes={nodes} />
            <Pagination currentPage={currentPage} numPages={numPages} />
          </main>
          <aside className="l-blog__sidebar">
            <WhatIsSaas />
          </aside>
        </div>
      </section>
    </Layout>
  );
};

export const query = graphql`
  query BlogListPageQuery($lang: String!, $skip: Int!, $limit: Int!) {
    posts: allMarkdownRemark(
      sort: { fields: frontmatter___date, order: [DESC] },
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
