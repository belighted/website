const path = require("path");
const locales = require("../src/constants/locales");

module.exports = async ({ graphql: fetch, actions }) => {
  const { createPage } = actions;

  const caseTemplate = path.resolve("./src/templates/case.js");

  const {
    data: {
      allCasesYaml: { nodes: cases }
    }
  } = await fetch(`
    {
      allCasesYaml {
        nodes {
          slug
          lang
        }
      }
    }
  `);
  cases.forEach(caseStudy => {
    createPage({
      component: caseTemplate,
      path: `${locales[caseStudy.lang].path}/clients/${caseStudy.slug}`,
      context: {
        slug: caseStudy.slug,
        lang: caseStudy.lang
      }
    });
  });
};
