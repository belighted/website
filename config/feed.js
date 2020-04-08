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
        serialize: ({ query: { site, allPostsYaml } }) => {
          return allPostsYaml.nodes.map(edge => {
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
            allPostsYaml(sort: { order: DESC, fields: [date] }) {
              nodes {
                slug
                title
                date
                description
              }
            }
          }
        `,
        output: "/blog/rss.xml",
        title: "Belighted blog",
        description: "The latest in product development, product design, lean startup and SaaS."
      }
    ]
  }
};

module.exports = config;
