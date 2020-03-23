import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Img from 'gatsby-image';

const Team = () => {
  const {
    dataYaml: { team }
  } = useStaticQuery(graphql`
    {
      dataYaml(slug: { eq: "team" }) {
        team {
          name
          role
          image{
            childImageSharp{
              fluid{
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  `);
  return (
      <ul className="o-list-bare c-team">
        {team.map(node => (
            <li key={node.name} className="c-team__member u-margin-bottom-small">
              <h6 className="c-h6 u-margin-none">{node.name}</h6>
              <span>{node.role}</span>
              <Img fluid={node.image.childImageSharp.fluid} />
            </li>
        ))}
      </ul>
  );
};

export default Team;
