const path = require("path");
const locales = require("./src/constants/locales");

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions;

  return new Promise(resolve => {
    deletePage(page);

    Object.keys(locales).map(lang => {
      const localizedPath = locales[lang].default
        ? page.path
        : locales[lang].path + page.path;

      return createPage({
        ...page,
        path: localizedPath,
        context: {
          lang
        }
      });
    });

    resolve();
  });
};

module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const blogTemplate = path.resolve("./src/templates/blog.js");
  const serviceTemplate = path.resolve("./src/templates/service.js");
  const caseTemplate = path.resolve("./src/templates/case.js");

  const {
    data: {
      allPostsYaml: { nodes: posts },
      allServicesYaml: { nodes: services },
      allCasesYaml: { nodes: cases }
    }
  } = await graphql(`
    {
      allServicesYaml {
        nodes {
          slug
        }
      }
      allPostsYaml {
        nodes {
          slug
          lang
        }
      }
      allCasesYaml {
        nodes {
          slug
          lang
        }
      }
    }
  `);

  posts.forEach(post => {
    createPage({
      component: blogTemplate,
      path: `${locales[post.lang].path}/blog/${post.slug}`,
      context: {
        slug: post.slug,
        lang: post.lang
      }
    });
  });

  services.forEach(service => {
    Object.keys(locales).map(lang => {
      createPage({
        component: serviceTemplate,
        path: `${locales[lang].path}/services/${service.slug}`,
        context: {
          slug: service.slug,
          lang: lang
        }
      });
    });
  });

  cases.forEach(caseStudy => {
    Object.keys(locales).map(lang => {
      createPage({
        component: caseTemplate,
        path: `${locales[lang].path}/clients/${caseStudy.slug}`,
        context: {
          slug: caseStudy.slug,
          lang: lang
        }
      });
    });
  });
};
