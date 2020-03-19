import React from "react";
import Layout from "../components/layout/Layout";
import BlogList from "../components/BlogList";

const BlogPage = ({ pageContext }) => {
  return <Layout context={pageContext} page={"blog"}>
      <BlogList />
  </Layout>;
};

export default BlogPage;
