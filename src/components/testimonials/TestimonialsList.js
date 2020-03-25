import React, { useState } from "react";
import { useStaticQuery, graphql } from "gatsby";
import LinkToCase from "../cases/LinkToCase";

const TestimonialsList = () => {
  const {
    allTestimonialsYaml: { nodes }
  } = useStaticQuery(graphql`
    {
      allTestimonialsYaml {
        nodes {
          slug
          author
          client
          body
          role
        }
      }
    }
  `);
  const [currentIndex, setIndex] = useState(0);
  const node = nodes[currentIndex];
  return (
    <ul>
      <li
        className="u-margin-bottom o-box o-box--large o-box--brand-bg c-quote"
        key={node.slug}
      >
        <div className="c-body c-body--3 u-color-white">
          <span className="c-quote__open-quote">&quot;</span>
          {node.body}
          <span className="c-quote__close-quote">&quot;</span>
        </div>

        <small>
          {node.author} {node.role}
        </small>
        <p>
          <LinkToCase slug={node.client}>{node.client}</LinkToCase>
        </p>
      </li>
    </ul>
  );
};

export default TestimonialsList;
