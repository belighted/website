import React from "react";
import { useStaticQuery, graphql } from "gatsby";

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
        <li key={node.slug}>
          <h4>{node.client}</h4>
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
