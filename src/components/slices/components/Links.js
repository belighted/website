import React from "react";
import LinkToBlog from "../../blog/LinkToBlog";

const Links = ({ title, subtitle, list, body }) => {
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
        {list && (
          <ul>
            {list.map(link => (
              <li key={link}>
                <LinkToBlog slug={link}>{link}</LinkToBlog>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default Links;
