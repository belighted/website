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

const getUrls = async url => {
  const { data } = await axios.get(url);
  const dom = new JSDOM(data);
  const links = dom.window.document.querySelectorAll(".content-card-link a");
  return Array.from(links).map(element => {
    const url = element.getAttribute("href");
    return url.replace(/\?.*/g, "");
  });
};

const getArticles = async urls => {
  return Promise.all(
    urls.map(u => {
      return new Promise(async (resolve, reject) => {
        const slug = u
          .replace("/fr", "")
          .replace("resources/", "")
          .replace("https://www.belighted.com/", "");

        console.log("reading ", slug);

        const { data } = await axios.get(u);
        resolve({
          slug,
          type: u.includes("/resources/") ? "resources" : "services",
          originalPath: u,
          originalHtml: data
        });
      });
    })
  );
};

const extractResourcesMeta = async articles => {
  return articles.map(post => {
    const dom = new JSDOM(post.originalHtml);

    let scripts = dom.window.document.querySelectorAll("script");
    scripts.forEach(script => script.remove());

    return {
      type: "resources",
      slug: post.slug,
      originalPath: post.originalPath,
      title: dom.window.document.querySelector("h1").textContent,
      sections: [
        {
          id: uuidv4(),
          title: null,
          image: null,
          subtitle: null,
          type: "default",
          body: sanitizeHtml(
            dom.window.document.querySelector("div.span8:nth-child(1)")
              .innerHTML,
            options
          )
            .replace(/\\n/gm, "")
            .trim()
        }
      ],
      image: sanitizeHtml(
        dom.window.document.querySelector(".widget-type-linked_image")
          .innerHTML,
        options
      )
    };
  });
};

const extractServicesMeta = async articles => {
  return articles.map(post => {
    const dom = new JSDOM(post.originalHtml);

    return {
      type: "services",
      slug: post.slug,
      originalPath: post.originalPath,
      title: dom.window.document.querySelector("h1").textContent,
      sections: Array.from(
        dom.window.document.querySelectorAll(
          ".body-container > .row-fluid-wrapper"
        )
      ).map(element => {
        const text = sanitizeHtml(element.innerHTML, options)
          .replace(/\\n/gm, "")
          .trim();
        const titles = Array.from(
          text.matchAll(/(?:<h2>)(.*)(?:<\/h2>)/gim)
        )[0];
        const subtitles = Array.from(
          text.matchAll(/(?:<h3>)(.*)(?:<\/h3>)/gim)
        )[0];
        const title = titles && titles.length > 1 ? titles[1] : null;
        const subtitle =
          subtitles && subtitles.length > 1 ? subtitles[1] : null;
        const body = text.replace(/<h[2-3]>.*<\/h[2-3]>/gim, "").trim();
        return {
          id: uuidv4(),
          type: !title && !subtitle ? "hero" : "default",
          image: null,
          title: !title && !subtitle ? body : title,
          subtitle,
          body: !title && !subtitle ? null : body
        };
      })
    };
  });
};

const writeFiles = async articles => {
  console.log("writing", articles.length);

  return Promise.all(
    articles.map(article => {
      const lang = article.originalPath.includes("/fr") ? "fr" : "en";
      const path = `${__dirname}/content/${article.type}/${article.slug}.${lang}.yml`;
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
  const resources = await extractResourcesMeta(
    rawArticles.filter(a => a.type === "resources")
  );
  const services = await extractServicesMeta(
    rawArticles.filter(a => a.type === "services")
  );
  await writeFiles([...services, ...resources]);
  console.log("done writing");
};

init()
  .then(() => console.log("done"))
  .catch(e => console.error(e));
