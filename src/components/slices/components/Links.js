import React from "react";
import BlogpostsList from "../../blog/BlogpostsList";

const Links = ({ title, subtitle, links, body }) => {
  return (
    <section className="c-slice">
      <div className="o-wrapper">
        {title && (
          <h2
            className={"c-heading c-heading--2"}
            dangerouslySetInnerHTML={{ __html: title }}
          />
        )}
        {subtitle && (
          <h2
            className={"c-heading c-heading--3"}
            dangerouslySetInnerHTML={{ __html: subtitle }}
          />
        )}
        {body && (
          <div
            dangerouslySetInnerHTML={{ __html: body }}
            className="c-wysiwyg"
          />
        )}
        {links && <BlogpostsList nodes={links} />}
      </div>
    </section>
  );
};

export default Links;
