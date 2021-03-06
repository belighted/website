const config = {
  resolve: `gatsby-plugin-feed`,
  options: {
    query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
    feeds: [
      {
        serialize: ({ query: { site, posts } }) => {
          return posts.nodes.map(({ frontmatter: edge }) => {
            return Object.assign({}, edge, {
              description: edge.description,
              date: edge.date,
              url: site.siteMetadata.siteUrl + edge.slug,
              guid: site.siteMetadata.siteUrl + edge.slug,
              custom_elements: [{ "content:encoded": edge.body }]
            });
          });
        },
        query: `
          {
            posts: allMarkdownRemark(
              filter: {
                fields: { collection: { eq: "articles" } }
              }
              sort: { order: DESC, fields: frontmatter___date }
            ) {
              nodes {
                frontmatter {
                  slug
                  title
                  date
                  description
                }
              }
            }
          }
        `,
        output: "/blog/rss.xml",
        title: "Belighted blog",
        description:
          "The latest in product development, product design, lean startup and SaaS."
      }
    ]
  }
};

module.exports = config;
