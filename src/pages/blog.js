import React from "react";
import Layout from "../components/Layout";

const BlogPage = ({ pageContext }) => {
  return <Layout context={pageContext} page={"blog"}>
      blog
  </Layout>;
};

export default BlogPage;
