const path = require("path");
const locales = require("../src/constants/locales");

module.exports = async ({ graphql: fetch, actions }) => {
  const { createPage } = actions;
  const component = path.resolve("./src/templates/landing.js");
  const {
    data: {
      landings: { nodes: landings }
    }
  } = await fetch(`
    {
      landings: allMdx(filter: {fields: {collection: {eq: "landings"}}}) {
        nodes {
          frontmatter{
            slug
            lang
          }          
        }
      }
    }
  `);

  landings.forEach(({ frontmatter: { lang, slug } }) => {
    createPage({
      component,
      path: `${locales[lang].path}/${slug}`,
      context: {
        slug,
        lang
      }
    });
  });
};
