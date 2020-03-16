const fs = require("fs")
const YAML = require("json-to-pretty-yaml")

const data = [
  {
    slug: "power_checklist_resources_2",
    title: "How to build an outstanding software product?",
    cta: "Download now →",
  },
  {
    slug: "SaaS-download",
    title: "Everything You Need to Know About Moving to a SaaS Model",
    cta: "Download now →",
  },
  {
    slug: "MVP-development",
    title: "Why you should Outsource MVP Development?",
    cta: "Download now →",
  },
  {
    slug: "consultation_call_resources",
    title: "Receive a 20-Minute Product Development Assessment",
    cta: "Book your risk free call →",
  },
  {
    slug: "code_review_resources",
    title: "Code Review Audit",
    cta: "Learn More →",
  },
  {
    slug: "UX_audit_resources",
    title: "User Experience Audit",
    cta: "Learn More →",
  },
  {
    slug: "user_testing_resources",
    title: "User Testing Package",
    cta: "Learn More →",
  },
  {
    slug: "strategy_workshop_resources",
    title: "Strategy Workshop / Product Roadmap",
    cta: "Get your product roadmap →",
  },
  {
    slug: "design_sprint_resources",
    title: "Design Sprint / Clickable Prototype",
    cta: "Get your prototype →",
  },
]

;[{ path: "", value: "en" }, { path: "fr/", value: "fr" }].forEach(lang => {
  data.forEach(data => {
    const path = `${__dirname}/content/resources/${data.slug}.${lang.value}.yml`


    const content = YAML.stringify({lang: lang.value, ...data});
    console.log(content);

    fs.writeFile(path.toLowerCase(), content, function (err) {
      if (err) return console.log(err);
      console.log("created", path);
    });

  })
})
