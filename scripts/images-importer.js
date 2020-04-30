const findInFiles = require("find-in-files");
const path = require("path");
const download = require("download");
const { nanoid } = require("nanoid");
const fs = require("fs");
const del = require("del");

const DESTINATION_PATH = path.resolve("content", "images", "legacy");

async function cleanupDestinationFolder() {
  const deletedPaths = await del([`${DESTINATION_PATH}/*`]);
  console.log("Deleted files and directories:", deletedPaths.length);
}
async function findImagesHostedOnHubspot() {
  const results = await findInFiles.find(
    /(https?:\/\/(www)?.*.com[^\[\]:]+\.(png|jpg|svg|jpeg|webp|gif)+)/,
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
  return results;
}

function getImageMap(results) {
  return Object.keys(results).reduce((previousValue, contentFilePath) => {
    return results[contentFilePath].matches.reduce(
      (acc, remoteFile) => {
        const [_1, extension] = remoteFile.match(
          /(?:\.)(png|jpg|svg|jpeg|webp|gif)+/
        );
        const remoteFileWithoutParams = remoteFile.replace(/\?.*/, "");
        return {
          ...acc,
          [remoteFileWithoutParams]: `${nanoid()}.${extension}`
        };
      },
      { ...previousValue }
    );
  }, {});
}

const downloadImages = async images => {
  let counter = 0;
  await Promise.all(
    Object.keys(images).map(async imageUrl => {
      const image = images[imageUrl];
      const newPath = path.join(DESTINATION_PATH, image);
      counter++;
      console.log(counter, "/", Object.keys(images).length);
      try {
        fs.writeFileSync(newPath, await download(imageUrl));
        return true;
      } catch (e) {
        return false;
      }
    })
  );
  console.log("done downloading");
};

const updatePathInContent = (results, images) => {
  Object.keys(results).forEach(file => {
    const content = fs.readFileSync(file, "utf-8");
    const updatedContent = results[file].matches.reduce((acc, match) => {
      const filename = images[match.replace(/\?.*/, "")];
      console.log("replace", match, "by", `/images/legacy/${filename}`);
      return acc.replace(match, `/images/legacy/${filename}`);
    }, content);
    fs.writeFileSync(file, updatedContent);
  });
};

const init = async () => {
  await cleanupDestinationFolder();
  const results = await findImagesHostedOnHubspot();
  const images = getImageMap(results);
  console.log("got images");
  fs.writeFileSync(
    path.join(DESTINATION_PATH, "mappings.json"),
    JSON.stringify(images)
  );
  await downloadImages(images);
  updatePathInContent(results, images);
};

init()
  .catch(e => console.log("big bad error", e))
  .then(_ => console.log("alright its done"));
