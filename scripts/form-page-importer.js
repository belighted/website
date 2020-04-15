const fs = require("fs");
const YAML = require("json-to-pretty-yaml");
const axios = require("axios");
const sanitizeHtml = require("sanitize-html");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const uuid = require("uuid");
const { v4: uuidv4 } = uuid;

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

const init = async (url, selector) => {
  const { data } = await axios.get(url);
  const dom = new JSDOM(data);
  const html = dom.window.document.querySelector(selector).innerHTML;
  return sanitizeHtml(html, options)
    .trim()
    .replace(/(\r\n|\n|\r)/gm, "");
};

function pbcopy(data) {
  const proc = require("child_process").spawn("pbcopy");
  proc.stdin.write(data);
  proc.stdin.end();
}

init(
  "https://www.belighted.com/fr/tests-utilisateurs",
  "div.row-number-8:nth-child(1)"
).then(result => {
  const data = YAML.stringify(result);
  pbcopy(data);
  console.log(data);
});
