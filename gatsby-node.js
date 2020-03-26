const path = require("path");
const locales = require("./src/constants/locales");
const _ = require("lodash");

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  if (_.get(node, "internal.type") === `MarkdownRemark`) {
    // Get the parent node
    const parent = getNode(_.get(node, "parent"));

    // Create a field on this node for the "collection" of the parent
    // NOTE: This is necessary so we can filter `allMarkdownRemark` by
    // `collection` otherwise there is no way to filter for only markdown
    // documents of type `post`.
    createNodeField({
      node,
      name: "collection",
      value: _.get(parent, "sourceInstanceName")
    });
  }
};

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
  const resourceTemplate = path.resolve("./src/templates/resource.js");
  const jobTemplate = path.resolve("./src/templates/job.js");

  const {
    data: {
      allPostsYaml: { nodes: posts },
      allServicesYaml: { nodes: services },
      allCasesYaml: { nodes: cases },
      allResourcesYaml: { nodes: resources },
      jobs: { nodes: jobs }
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
      allResourcesYaml {
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
      jobs: allMarkdownRemark(
        filter: { fields: { collection: { eq: "jobs" } } }
      ) {
        nodes {
          frontmatter {
            slug
          }
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

  resources.forEach(resource => {
    Object.keys(locales).map(lang => {
      createPage({
        component: resourceTemplate,
        path: `${locales[lang].path}/resources/${resource.slug}`,
        context: {
          slug: resource.slug,
          lang: lang
        }
      });
    });
  });

  jobs.forEach(({ frontmatter: job }) => {
    Object.keys(locales).map(lang => {
      createPage({
        component: jobTemplate,
        path: `${locales[lang].path}/careers/${job.slug}`,
        context: {
          slug: job.slug,
          lang: lang
        }
      });
    });
  });
};
