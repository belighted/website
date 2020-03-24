import React from "react";
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
  return (
    <ul>
      {nodes.map(node => (
        <li className="u-margin-bottom o-box o-box--light-bg" key={node.slug}>
          <div>{node.body}</div>
          <small>
            {node.author} {node.role}
          </small>
          <p>
            <LinkToCase slug={node.client}>{node.client}</LinkToCase>
          </p>
        </li>
      ))}
    </ul>
  );
};

export default TestimonialsList;
