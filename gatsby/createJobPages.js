const path = require("path");
const locales = require("../src/constants/locales");

module.exports = async ({ graphql: fetch, actions }) => {
  const { createPage } = actions;
  const component = path.resolve("./src/templates/job.js");

  const {
    data: {
      allNodes: { nodes }
    }
  } = await fetch(`
    {
      allNodes: allMarkdownRemark(
        filter: { fields: { collection: { eq: "jobs" } } }
      ) {
        nodes {
          frontmatter {
            slug
            lang
          }
        }
      }
    }
  `);
  nodes.forEach(({ frontmatter: { slug, lang } }) => {
    createPage({
      component,
      path: `${locales[lang].path}/careers/${slug}`,
      context: {
        slug,
        lang
      }
    });
  });
};
