const path = require("path");
const locales = require("./src/constants/locales");
const _ = require("lodash");
const { createRemoteFileNode } = require("gatsby-source-filesystem");

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  createTypes(`
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      featuredImg: File @link(from: "featuredImg___NODE")
    }
    type Frontmatter {
      title: String!
      featuredImgUrl: String
      featuredImgAlt: String
    }
  `);
};

exports.onCreateNode = async ({
  node,
  actions,
  getNode,
  store,
  cache,
  createNodeId
}) => {
  const { createNodeField, createNode } = actions;

  if (
    node.internal.type === "PostsYaml" &&
    node.image !== null &&
    !node.image.includes("default_blogpost")
  ) {
    let fileNode = await createRemoteFileNode({
      url: node.image, // string that points to the URL of the image
      parentNodeId: node.id, // id of the parent node of the fileNode you are going to create
      createNode, // helper function in gatsby-node to generate the node
      createNodeId, // helper function in gatsby-node to generate the node id
      cache, // Gatsby's cache
      store // Gatsby's redux store
    });
    // if the file was created, attach the new node to the parent node
    if (fileNode) {
      node.featuredImage___NODE = fileNode.id;
    }
  }

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
  const blogTagTemplate = path.resolve("./src/templates/blogTag.js");

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
          tags {
            value
          }
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

  let tags = [];
  posts.forEach(post => {
    post.tags.forEach(tag => tags.push(tag.value));
    createPage({
      component: blogTemplate,
      path: `${locales[post.lang].path}/blog/${post.slug}`,
      context: {
        slug: post.slug,
        lang: post.lang
      }
    });
  });
  _.uniq(tags).forEach(tag => {
    Object.keys(locales).map(lang => {
      createPage({
        component: blogTagTemplate,
        path: `${locales[lang].path}/tags/${tag}`,
        context: {
          tag,
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
