const path = require("path")
const locales = require("./src/constants/locales")

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
          lang
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
      path: `${locales[post.lang].path}/blog/${post.slug}`,
      context: {
        slug: post.slug,
        lang: post.lang,
      },
    })
  })
}
