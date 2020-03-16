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
      .filter(u => u.includes("/blog") && !u.includes("/fr/"))
      .map(
        u =>
          new Promise((resolve, reject) => {
            console.log("reading ", u)
            read(u, function(err, article, meta) {
              if (err) reject(err)
              return {
                slug: u.replace("https://www.belighted.com/blog/", ""),
                article,
                meta,
              }
            })
          })
      )
  )
}

const init = async () => {
  const urls = await getUrls()
  console.log(urls)
  //const articles = await getArticles(urls)
}

init()
  .then(() => console.log("done"))
  .catch(e => console.error(e))
/*
;[{ path: "", value: "en" }, { path: "fr/", value: "fr" }].forEach(lang => {
  data.forEach(data => {
    const path = `${__dirname}/content/resources/${data.slug}.${lang.value}.yml`


    const content = YAML.stringify({lang: lang.value, ...data});
    console.log(content);

    fs.writeFile(path.toLowerCase(), content, function (err) {
      if (err) return console.log(err);
      console.log("created", path);
    });

  })
})
*/
