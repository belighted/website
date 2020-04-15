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

const init = async url => {
  const { data } = await axios.get(url);
  const dom = new JSDOM(data);
  return Array.from(
    dom.window.document.querySelectorAll(".body-container > .row-depth-1")
  )
    .map(section => sanitizeHtml(section.innerHTML, options))
    .map(html => html.trim().replace(/(\r\n|\n|\r)/gm, ""))
    .map(body => ({
      id: uuidv4(),
      type: "cols",
      columns: [{ body }]
    }));
};

function pbcopy(data) {
  var proc = require("child_process").spawn("pbcopy");
  proc.stdin.write(data);
  proc.stdin.end();
}

init("https://www.belighted.com/fr/design-sprint").then(result => {
  const data = YAML.stringify(result);
  pbcopy(data);
  console.log(data);
});
