const path = require("path")

module.exports.onCreateNode = ({ node, actions }) => {
  // Transform the new node here and create a new node or
  // create a new node field.
  const { createNodeField } = actions
  if (node.internal.type === "MarkdownRemark") {
    const slug = path.basename(node.fileAbsolutePath, ".md")
    createNodeField({
      //same as node: node
      node,
      name: "slug",
      value: slug,
    })
  }
}

module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const blogTemplate = path.resolve("./src/templates/blog.js")
  const {
    data: {
      allPostsYaml: { nodes: posts },
    },
  } = await graphql(`
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
  `)
  posts.forEach(post => {
    createPage({
      component: blogTemplate,
      path: `/blog/${post.slug}`,
      context: {
        slug: post.slug,
      },
    })
  })
  /*
  //dynamically create pages here
  //get path to template
  //get slugs
  const response = await graphql(`
    query {
      all
    }
  `)
  //create new pages with unique slug
  response.data.allMarkdownRemark.edges.forEach(edge => {
    createPage({
      component: blogTemplate,
      path: `/blog/${edge.node.fields.slug}`,
      context: {
        slug: edge.node.fields.slug,
      },
    })
  })
   */
}
