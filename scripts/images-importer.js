const findInFiles = require("find-in-files");
const path = require("path");
const download = require("download");
const nanoid = require("nanoid");
const FileType = require("file-type");
const fs = require("fs");
const del = require("del");

const images = path.join(
  "..",
  "content",
  "images",
  "legacy"
)(async () => {
  const deletedPaths = await del([images]);

  console.log("Deleted files and directories:\n", deletedPaths.join("\n"));

  findInFiles
    .find(
      new RegExp(
        "https?:\\/\\/(www)?.belighted.com/.+\\.(png|jpg|svg|jpeg|webp)+"
      ),
      path.join(__dirname, "..", "content"),
      ".(mdx*|yml)$"
    )
    .then(async results => {
      console.log("found", Object.keys(results).length);
      await Promise.all(
        Object.keys(results).map(async key => {
          const result = results[key];
          const match = result.matches[0];
          try {
            const stream = download(match);
            const { ext } = await FileType.fromStream(stream);

            const newPath = path.join(images, `${nanoid}.${ext}`);
            stream.pipe(fs.createWriteStream(newPath));

            const file = fs.readFileSync(key, "utf-8");
            fs.writeFileSync(
              key,
              file.replace(match, `/images/legacy/${newPath}`)
            );
            console.log(
              'found "' +
                match +
                '" ' +
                result.count +
                ' times in "' +
                key +
                '"'
            );
          } catch (e) {
            fs.writeFileSync(
              key,
              file.replace(match, "https://placekeanu.com/200/150")
            );
          }
        })
      );
      console.log("done");
    })
    .catch(e => console.error(e));
})();
