const fs = require("fs");
const YAML = require("yaml");
const download = require("download");
const path = require("path");
const readFiles = async path => {
  const files = await fs.promises.readdir(path);
  return Promise.all(
    files.map(async file => {
      const data = await fs.promises.readFile(`${path}/${file}`, "utf-8");
      return YAML.parse(data);
    })
  );
};

const init = async () => {
  const directory = __dirname + "/content/posts";
  try {
    const articles = await readFiles(directory);
    const images = articles.map(article =>
      download(
        article.image,
        path.resolve(__dirname, "content", "posts", "images")
      )
    );
    console.log(images);
  } catch (e) {
    console.error(e);
  }
};

init().then(() => console.log("done"));
