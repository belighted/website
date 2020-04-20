const config = require("./config.json");
const infoData = require("./content/data/info.json");
const feedConfig = require("./config/feed");
module.exports = {
  //this makes the site config available to forestry cms
  siteMetadata: {
    title: config.title,
    description: config.description,
    siteUrl: config.site_url,
    repoUrl: config.repository_url,
    about: config.about,
    contact: config.contact,
    primaryColor: config.primary_color,
    infoData: infoData
  },
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-sitemap",
    "gatsby-transformer-remark",
    "gatsby-plugin-react-helmet",
    "gatsby-transformer-yaml",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/content/images`
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "testimonials",
        path: `${__dirname}/content/testimonials`
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "resources",
        path: `${__dirname}/content/resources`
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "cases",
        path: `${__dirname}/content/cases`
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "articles",
        path: `${__dirname}/content/articles`
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "jobs",
        path: `${__dirname}/content/jobs`
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "data",
        path: `${__dirname}/content/data`
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "splits",
        path: `${__dirname}/content/splits`
      }
    },

    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "services",
        path: `${__dirname}/content/services`
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "categories",
        path: `${__dirname}/content/categories`
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "content",
        path: `${__dirname}/content`
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "processes",
        path: `${__dirname}/content/process`
      }
    },
    `gatsby-transformer-sharp`,
    {
      resolve: "gatsby-plugin-sharp",
      options: {
        defaultQuality: 75
      }
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: `${__dirname}/assets`
        }
      }
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          "gatsby-remark-relative-images",
          "gatsby-remark-normalize-paths",
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 1000,
              linkImagesToOriginal: false
            }
          }
        ]
      }
    },
    feedConfig
  ]
};
