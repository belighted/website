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

const init = async () => {
  const directory = path.resolve(__dirname, "content", "posts");

  try {
    const articles = await readFiles(directory);
    articles
      .filter(a => a)
      .forEach(article => {
        if (article.data.image) {
          const filePath = path.resolve(
            __dirname,
            "content",
            "posts",
            article.data.image.replace("./", "")
          );
          if (!fs.existsSync(filePath)) {
            console.log(article.data.image, " in ", article.path);
          }
        }
      });
    console.log("read everything");
  } catch (e) {
    console.error(e);
  }
};

init().then(() => console.log("done"));
