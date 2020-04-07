const fs = require("fs");
const YAML = require("yaml");
const download = require("download");
const path = require("path");
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
        data: YAML.parse(await fs.promises.readFile(filePath, "utf-8"))
      };
    })
  );
};

const downloadImages = async articles => {
  return Promise.all(
    articles.map(article => {
      try {
        article &&
          download(
            article.image,
            path.resolve(__dirname, "content", "posts", "images")
          );
      } catch (e) {
        console.log("couldnt download ", article.image);
      }
    })
  );
};

const init = async () => {
  const directory = path.resolve(__dirname, "content", "posts");

  try {
    const articles = await readFiles(directory);
    articles
      .filter(a => a)
      .forEach(article => {
        const image = article.data.image
          .replace("#keepProtocol", "")
          .replace(/https:\/\/.*\//, "");
        fs.writeFile(
          article.path,
          YAML.stringify({ ...article.data, image }),
          function(err) {
            if (err) return;
            console.log("updated", article.path);
          }
        );
        console.log(image);
      });
    console.log("read everything");
  } catch (e) {
    console.error(e);
  }
};

init().then(() => console.log("done"));
