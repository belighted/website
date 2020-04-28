const findInFiles = require("find-in-files");
const path = require("path");
const download = require("download");
const nanoid = require("nanoid");
const got = require("got");
const FileType = require("file-type");

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
          const stream = got.stream(url);
          const { ext } = await FileType.fromStream(stream);
          path.join("..", "content", "images", "legacy", `${nanoid}.${ext}`);
          fs.writeFileSync(newPath, await download(match));
          const file = fs.readFileSync(key, "utf-8");
          fs.writeFileSync(
            key,
            file.replace(match, `/images/legacy/${newPath}`)
          );
          console.log(
            'found "' + match + '" ' + result.count + ' times in "' + key + '"'
          );
        }catch(e){
          fs.writeFileSync(
            key,
            file.replace(match, 'https://placekeanu.com/200/150')
          );
        }
      })
    );
    console.log("done");
  })
  .catch(e => console.error(e));
