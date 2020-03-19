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
        <li className="u-margin-bottom" key={node.slug}>

          <h4><LinkToCase slug={node.client}>{node.client}</LinkToCase></h4>

          <div>{node.body}</div>
          <small>
            {node.author} {node.role}
          </small>
        </li>
      ))}
    </ul>
  );
};

export default TestimonialsList;
