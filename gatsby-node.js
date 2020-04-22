const path = require("path");
const locales = require("./src/constants/locales");
const _ = require("lodash");
const createLandingPages = require("./gatsby/createLandingPages");
const createCaseStudies = require("./gatsby/createCaseStudies");

exports.onCreateNode = async ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (["MarkdownRemark", "Mdx"].includes(_.get(node, "internal.type"))) {
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
  const resourceTemplate = path.resolve("./src/templates/resource.js");
  const jobTemplate = path.resolve("./src/templates/job.js");
  const blogTagTemplate = path.resolve("./src/templates/blogTag.js");

  const {
    data: {
      allServicesYaml: { nodes: services },
      allResourcesYaml: { nodes: resources },
      jobs: { nodes: jobs },
      articles: { nodes: articles }
    }
  } = await graphql(`
    {
      allServicesYaml {
        nodes {
          slug
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

  //get all post tags

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

  await createCaseStudies({ graphql, actions });
  await createLandingPages({ graphql, actions });
};
