const findInFiles = require("find-in-files");
const path = require("path");
const download = require("download");
const { nanoid } = require("nanoid");
const fs = require("fs");
const del = require("del");

const images = path.resolve("content", "images", "legacy");

const init = async () => {
  const deletedPaths = await del([`${images}/*`]);
  console.log(
    "Deleted files and directories:",
    deletedPaths.length
  );
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

  await Promise.all(
    Object.keys(results).map(async file => {
      const result = results[file];

      const fetches = await Promise.all(
        result.matches.map(
          match =>
            new Promise((resolve, reject) => {
              console.log("fetching", match);
              const stream = download(match);
              const [_, ext] = match.match(
                /(?:\.)(png|jpg|svg|jpeg|webp|gif)+/
              );
              const newPath = path.join(images, `${nanoid()}.${ext}`);
              stream.on("error", () => resolve(null));
              stream
                .pipe(fs.createWriteStream(newPath))
                .on("error", () => resolve(null))
                .on("end", () =>
                  resolve({
                    file,
                    match,
                    newPath
                  })
                );
            })
        )
      );
      console.log("done fetching files");
      await Promise.all(
        fetches
          .filter(f => f)
          .map(
            ({ file, match, newPath }) =>
              new Promise(resolve => {
                const content = fs.readFileSync(file, "utf-8");
                fs.writeFile(
                  file,
                  content.replace(match, `/images/legacy/${newPath}`),
                  resolve
                );
              })
          )
      );
      console.log("done updating addresses");
    })
  );
};
init()
  .catch(e => console.log("big bad error", e))
  .then(_ => console.log("alright its done"));