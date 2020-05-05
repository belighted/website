const path = require("path");
const locales = require("../src/constants/locales");
const _ = require("lodash");

module.exports = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const blogTemplate = path.resolve("./src/templates/blog.js");
  const blogTagTemplate = path.resolve("./src/templates/blogTag.js");

  /*
  const {
    data: {
      articles: { nodes: articles }
    }
  } = await graphql(`
    {
      articles: allMarkdownRemark(
        filter: { fields: { collection: { eq: "articles" } } }
      ) {
        nodes {
          frontmatter {
            slug
            lang
            tags {
              value
              label
            }
          }
        }
      }
    }
  `);
  const posts = articles.map(a => a.frontmatter);
  let tags = [];
  posts.forEach(post => {
    post.tags.forEach(tag => tags.push(tag));
    createPage({
      component: blogTemplate,
      path: `${locales[post.lang].path}/articles/${post.slug}`,
      context: {
        slug: post.slug,
        lang: post.lang
      }
    });
  });
  const values = tags.map(t => t.value);

  _.uniq(values).forEach(slug => {
    const tag = tags.find(t => t.value === slug);
    Object.keys(locales).map(lang => {
      createPage({
        component: blogTagTemplate,
        path: `${locales[lang].path}/tags/${slug}`,
        context: {
          tag: slug,
          lang,
          title: tag.label
        }
      });
    });
  });

  // Create blog-list pages
  const postsPerPage = 6;
  Object.keys(locales).map(lang => {
    const postsInThisLang = posts.filter(post => post.lang === lang);
    const numPages = Math.ceil(postsInThisLang.length / postsPerPage);
    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path:
          i === 0
            ? `${locales[lang].path}/blog`
            : `${locales[lang].path}/blog/${i + 1}`,
        component: path.resolve("./src/templates/blogList.js"),
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1,
          lang
        }
      });
    });
  });
  */
};
