const fs = require("fs");
const YAML = require("json-to-pretty-yaml");
const axios = require("axios");
const xml2js = require("xml2js");
const sanitizeHtml = require("sanitize-html");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const options = {
  allowedTags: [
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "blockquote",
    "p",
    "a",
    "ul",
    "ol",
    "nl",
    "li",
    "b",
    "i",
    "strong",
    "em",
    "strike",
    "code",
    "hr",
    "br",
    "table",
    "thead",
    "caption",
    "tbody",
    "tr",
    "th",
    "td",
    "pre",
    "iframe"
  ]
};

const getUrls = async url => {
  const { data } = await axios.get(url);
  const dom = new JSDOM(data);
  const links = dom.window.document.querySelectorAll(".content-card a");
  return Array.from(links).map(element => element.getAttribute("href"));
};

const getArticles = async urls => {
  return Promise.all(
    urls
      .filter(u => u.includes("/resources/"))
      .map(
        u =>
          new Promise(async (resolve, reject) => {
            const slug = u
              .replace("/fr", "")
              .replace("https://www.belighted.com/resources/", "");
            console.log("reading ", slug);

            const { data } = await axios.get(u);
            resolve({
              slug,
              originalPath: u,
              originalHtml: data
            });
          })
      )
  );
};

const extractMeta = async articles => {
  return articles.map(post => {
    const dom = new JSDOM(post.originalHtml);

    let scripts = dom.window.document.querySelectorAll("script");
    scripts.forEach(script => script.remove());

    return {
      slug: post.slug,
      originalPath: post.originalPath,
      title: dom.window.document.querySelector("h1").textContent,
      body: sanitizeHtml(
        dom.window.document.querySelector("div.span8:nth-child(1)").innerHTML,
        options
      ),
      image: sanitizeHtml(
        dom.window.document.querySelector(".widget-type-linked_image")
          .innerHTML,
        options
      )
    };
  });
};

const writeFiles = async articles => {
  console.log("writing", articles.length);

  return Promise.all(
    articles.map(article => {
      const lang = article.originalPath.includes("/fr") ? "fr" : "en";
      const path = `${__dirname}/content/resources/${article.slug}.${lang}.yml`;
      const content = YAML.stringify({ lang, ...article });

      return new Promise((resolve, reject) => {
        fs.writeFile(path.toLowerCase(), content, function(err) {
          if (err) return reject(err);
          console.log("created", path);
          resolve(path);
        });
      });
    })
  );
};

const init = async () => {
  const urls = await Promise.all([
    await getUrls("https://www.belighted.com/resources"),
    await getUrls("https://www.belighted.com/fr/ressources")
  ]);

  const rawArticles = await getArticles([].concat(...urls));
  const articles = await extractMeta(rawArticles);
  await writeFiles(articles);
  console.log("done writing");
};

init()
  .then(() => console.log("done"))
  .catch(e => console.error(e));
