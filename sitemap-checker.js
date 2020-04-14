const fs = require("fs");
const YAML = require("json-to-pretty-yaml");
const axios = require("axios");
const xml2js = require("xml2js");
const read = require("node-readability");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const getUrls = async (url) => {
  const { data } = await axios.get(url);
  const {
    urlset: { url: urlsets }
  } = await xml2js.parseStringPromise(data);
  return urlsets.map(set => set.loc.shift());
};

const init = async () => {
  const urls = await getUrls("https://www.belighted.com/sitemap.xml");

  console.log(urls.filter(url=>!url.match(/\/blog\//)).filter(url=>url.match(/\/fr\//)));
};

init()
  .then(() => console.log("done"))
  .catch(e => console.error(e));
