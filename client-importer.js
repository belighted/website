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

const getUrls = async () => {
  const { data } = await axios.get("https://www.belighted.com/sitemap.xml");
  const {
    urlset: { url: urlsets }
  } = await xml2js.parseStringPromise(data);
  return urlsets.map(set => set.loc.shift());
};

const getArticles = async urls => {
  return Promise.all(
    urls
      .filter(u => u.includes("/clients/"))
      .map(
        u =>
          new Promise(async (resolve, reject) => {
            const slug = u
              .replace("/fr", "")
              .replace("https://www.belighted.com/clients/", "");
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

const writeFiles = async articles => {
  console.log("writing", articles.length);

  return Promise.all(
    articles.map(article => {
      const lang = article.originalPath.includes("/fr") ? "fr" : "en";
      const path = `${__dirname}/content/cases/${article.slug}.${lang}.yml`;
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

const extractMeta = async articles => {
  return articles.map(post => {
    const dom = new JSDOM(post.originalHtml);

    let scripts = dom.window.document.querySelectorAll("script");
    scripts.forEach(script => script.remove());

    return {
      slug: post.slug,
      originalPath: post.originalPath,
      title: dom.window.document.querySelector(".hero-content h2").textContent,
      logo: dom.window.document
        .querySelector(
          ".hs_cos_wrapper_widget > h2:nth-child(1) > img:nth-child(1)"
        )
        .getAttribute("src"),
      about: sanitizeHtml(
        dom.window.document.querySelector(".md-centered > div:nth-child(1)").innerHTML,
        options
      ),
      problem: sanitizeHtml(
        dom.window.document.querySelector(
          ".ptb0 > div:nth-child(1) > div:nth-child(1) > div:nth-child(1)"
        ).innerHTML,
        options
      ),
      goals: sanitizeHtml(
        dom.window.document.querySelector(
          ".ptb0 > div:nth-child(1) > div:nth-child(1) > div:nth-child(2)"
        ).innerHTML,
        options
      ),

      challenges: sanitizeHtml(
        dom.window.document.querySelector(
          "div.row-number-7:nth-child(1) > div:nth-child(1)"
        ).innerHTML,
        options
      ),
      results: sanitizeHtml(
        dom.window.document.querySelector(
          ".row-number-11 > div:nth-child(1) > div:nth-child(1)"
        ).innerHTML,
        options
      )
    };
  });
};

const init = async () => {
  const urls = await getUrls();
  const rawArticles = await getArticles(urls);
  const articles = await extractMeta(rawArticles);
  await writeFiles(articles);
  console.log("done writing");
};

init()
  .then(() => console.log("done"))
  .catch(e => console.error(e));
