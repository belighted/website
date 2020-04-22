const path = require("path");
const locales = require("../src/constants/locales");

module.exports = async ({ graphql: fetch, actions }) => {
  const { createPage } = actions;
  const component = path.resolve("./src/templates/service.js");

  const {
    data: {
      allNodes: { nodes }
    }
  } = await fetch(`
    {
      allNodes: allServicesYaml {
        nodes {
          slug
          lang
        }
      }
    }
  `);
  nodes.forEach(({ slug, lang }) => {
    createPage({
      component,
      path: `${locales[lang].path}/services/${slug}`,
      context: {
        slug,
        lang
      }
    });
  });
};
