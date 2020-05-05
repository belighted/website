
const locales = require("./src/constants/locales");
const _ = require("lodash");
const createLandingPages = require("./gatsby/createLandingPages");
const createCaseStudies = require("./gatsby/createCaseStudies");
const createJobPages = require("./gatsby/createJobPages");
const createServicePages = require("./gatsby/createServicePages");
const createResourcePages = require("./gatsby/createResourcePages");
const createBlog = require("./gatsby/createBlog");

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

  await createResourcePages({ graphql, actions });
  await createCaseStudies({ graphql, actions });
  await createServicePages({ graphql, actions });
  await createJobPages({ graphql, actions });

  await createLandingPages({ graphql, actions });
  await createBlog({ graphql, actions });
};
