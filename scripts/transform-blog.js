const recursive = require("recursive-readdir");
const path = require("path");
const fs = require("fs");
const yaml = require("yaml");

const TurndownService = require("turndown");
const turndownService = new TurndownService();
turndownService.keep(["figure"]);

recursive(path.join(__dirname, "../content/posts"), function(err, files) {
  files.forEach(path => {
      if (path.includes("/images")) return;
      fs.readFile(path, "utf8", (err, data) => {
        if (err) throw err;
        const obj = yaml.parse(data);
        const body = obj.body;
        delete obj.body;

        const text = `---\n${yaml.stringify({
          ...obj,
          status: "published"
        })}---\n${turndownService.turndown(body, { codeBlockStyle: "indented" })}`;

        fs.writeFile(path.replace("/posts/", "/articles/").replace(".yml", ".md"), text, function(err) {
          if (err) console.error(err);
          console.log("created", path);
        });

      });
    }
  );
});

