const fs = require("fs");
const YAML = require("json-to-pretty-yaml");
const axios = require("axios");
const xml2js = require("xml2js");
const read = require("node-readability");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

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
      .filter(u => u.includes("/blog/"))
      .map(
        u =>
          new Promise(async (resolve, reject) => {
            console.log("reading ", u);
            const slug = u
              .replace("/fr", "")
              .replace("https://www.belighted.com/blog/", "");
            console.log("slug ", slug);

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
      const path = `${__dirname}/content/posts/${article.slug}.${lang}.yml`;
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

const dateRegex = /.* /g;
const tagRegex = /https?:\/\/.*\//g;

const extractMeta = async articles => {
  return articles.map(post => {
    const dom = new JSDOM(post.originalHtml);

    let scripts = dom.window.document.querySelectorAll("script");
    scripts.forEach(script=>script.remove());


    let date = dom.window.document.querySelector(".post-body > p:nth-child(2)");
    date = date ? date.textContent.replace(dateRegex, "") : null;

    const rawTags = dom.window.document.querySelectorAll(".post-bottom > a");

    let tags = [];

    rawTags.forEach(element => {
      tags.push({
        label: element.textContent,
        value: element.getAttribute("href").replace(tagRegex, "")
      });
    });

    return {
      slug: post.slug,
      originalPath: post.originalPath,
      title: dom.window.document.querySelector("#hs_cos_wrapper_name")
        .textContent,
      author: dom.window.document
        .querySelector('meta[name="author"')
        .getAttribute("content"),
      description: dom.window.document
        .querySelector('meta[name="description"')
        .getAttribute("content"),
      image: dom.window.document
        .querySelector('meta[property="og:image"')
        .getAttribute("content"),
      date: date && Date.parse(date),
      body: dom.window.document.querySelector("#hs_cos_wrapper_post_body")
        .innerHTML,
      tags
    };
  });
};

const init = async () => {
  const urls = await getUrls();
  const rawArticles = await getArticles(urls);
  const articles = await extractMeta(rawArticles);
  await writeFiles(articles);
  console.log("done");
  //console.log(articles)
};

init()
  .then(() => console.log("done"))
  .catch(e => console.error(e));
