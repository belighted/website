const fs = require("fs");
const axios = require("axios");
const path = require("path");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const moment = require("moment");

const readFiles = async directory => {
  const files = await fs.promises.readdir(directory);
  return Promise.all(
    files.map(async file => {
      const filePath = path.resolve(directory, file);
      if (!fs.existsSync(filePath) || fs.lstatSync(filePath).isDirectory()) {
        return null;
      }
      return {
        path: filePath,
        data: await fs.promises.readFile(filePath, "utf-8")
      };
    })
  );
};

const init = async () => {
  const directory = path.resolve(__dirname, "..", "content", "articles");

  try {
    const articles = await readFiles(directory);
    await Promise.all(
      articles
        //.slice(0, 2)
        .filter(a => a)
        .map(async article => {
          const pathMatchs = article.data.match(/originalPath: .*/gm);
          if (pathMatchs) {
            const pathToFetch = pathMatchs[0].replace("originalPath: ", "");
            const { data } = await axios.get(pathToFetch);
            const { window } = new JSDOM(data);
            const authorString = window.document
              .querySelector(".post-body > p:nth-child(2)")
              .textContent.replace(/.*on /, "");
            moment.locale(pathToFetch.match(/\/fr\//) ? "fr" : "en");
            const date = moment(authorString, "DD MMMM YYYY").format(
              "YYYY-MM-DD"
            );
            const newArticle = article.data.replace(
              /date: [0-9]*/gm,
              `date: ${date}`
            );
            await new Promise(resolve =>
              fs.writeFile(article.path, newArticle, resolve)
            );
          }
        })
    );
    console.log("read everything");
  } catch (e) {
    console.error(e);
  }
};

init().then(() => console.log("done"));
