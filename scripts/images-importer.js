const findInFiles = require("find-in-files");
const path = require("path");
const download = require("download");
const { nanoid } = require("nanoid");
const fs = require("fs");
const del = require("del");

const images = path.resolve("content", "images", "legacy");
const importedImages = new Map();

const init = async () => {
  const deletedPaths = await del([`${images}/*`]);
  console.log("Deleted files and directories:", deletedPaths.length);
  const results = await findInFiles.find(
    /(https?:\/\/(www)?.belighted.com[^\[\]:]+\.(png|jpg|svg|jpeg|webp|gif)+)/,
    path.resolve(__dirname, "..", "content"),
    /\.(mdx|yml|md)/
  );

  console.log(
    `found ${Object.keys(results).reduce(
      (previousValue, currentValue) =>
        results[currentValue].matches.length + previousValue,
      0
    )} matches`
  );
  let fileCounter = 0;
  await Promise.all(
    Object.keys(results).map(async (file, fileIndex) => {
      const result = results[file];
      const fetches = await Promise.all(
        result.matches.map(async match => {
          console.log("fetching", match);
          const [_, ext] = match.match(/(?:\.)(png|jpg|svg|jpeg|webp|gif)+/);
          const [remoteFileWithoutParams] = match.match(/.*(?=\?)/);
          if (importedImages.has(remoteFileWithoutParams)) {
            console.log("already imported ", remoteFileWithoutParams);
            return importedImages.get(remoteFileWithoutParams);
          }
          const filename = `${nanoid()}.${ext}`;
          const newPath = path.join(images, filename);
          try {
            fs.writeFileSync(newPath, await download(match));
            console.log("created", newPath);
            const remoteFile = {
              file,
              match,
              newPath,
              filename
            };
            importedImages.set(remoteFileWithoutParams, remoteFile);
            return remoteFile;
          } catch (e) {
            console.log(e);
            return null;
          }
        })
      );
      let content = fs.readFileSync(file, "utf-8");
      fetches
        .filter(f => f)
        .map(({ filename, match }, index) => {
          content = content.replace(match, `/images/legacy/${filename}`);
          console.log(`replaces ${index + 1}/${fetches.length}`);
        });
      fs.writeFileSync(file, content);
      console.log(`done ${fileCounter + 1}/${Object.keys(results).length}`);
      fileCounter++;
    })
  );
};
init()
  .catch(e => console.log("big bad error", e))
  .then(_ => console.log("alright its done"));
