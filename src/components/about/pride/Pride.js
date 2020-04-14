import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import GatsbyImage from "gatsby-image";

const Pride = ({ pride }) => {
  return (
    <ul className={"o-list-bare"}>
      {pride.map(node => (
        <li key={node.title} className="u-margin-bottom">
          <div className="o-flag">
            <div className={"o-flag__img"}>
              <GatsbyImage fixed={node.image.childImageSharp.fixed} />
            </div>
            <div className={"o-flag__body"}>
              <h4 className="c-heading c-heading--3 u-margin-bottom-none">
                {node.title}
              </h4>
              <h5 className="c-heading c-heading--4">{node.subtitle}</h5>
              <span>{node.body}</span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Pride;
