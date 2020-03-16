const fs = require("fs")
const YAML = require("json-to-pretty-yaml")
const axios = require("axios")
const xml2js = require("xml2js")
const read = require("node-readability")

const getUrls = async () => {
  const { data } = await axios.get("https://www.belighted.com/sitemap.xml")
  const {
    urlset: { url: urlsets },
  } = await xml2js.parseStringPromise(data)
  return urlsets.map(set => set.loc.shift())
}

const getArticles = async urls => {
  return Promise.all(
    urls
      .filter(u => u.includes("/blog/"))
      .map(
        u =>
          new Promise((resolve, reject) => {
            console.log("reading ", u)
            read(u, function(err, article, meta) {
              if (err) reject(err)
              resolve({
                slug: u
                  .replace("/fr/", "")
                  .replace("https://www.belighted.com/blog/", ""),
                originalPath: u,
                article: {
                  title: article.title,
                  content: article.content,
                  textBody: article.textBody,
                  html: article.html,
                },
                //meta,
              })
            })
          })
      )
  )
}

const writeFiles = async articles => {
  console.log("writing", articles.length)

  return Promise.all(
    articles.map(article => {
      const lang = article.originalPath.includes("/fr") ? "fr" : "en"
      const path = `${__dirname}/content/posts/${article.slug}.${lang}.yml`
      const content = YAML.stringify({ lang, ...article })

      return new Promise((resolve, reject) => {
        fs.writeFile(path.toLowerCase(), content, function(err) {
          if (err) return reject(err)
          console.log("created", path)
          resolve(path)
        })
      })
    })
  )
}

const init = async () => {
  const urls = await getUrls()
  const articles = await getArticles(urls)
  await writeFiles(articles)
  console.log("done")
  //console.log(articles)
}

init()
  .then(() => console.log("done"))
  .catch(e => console.error(e))
