import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";

const Team = () => {
  const {
    dataYaml: { team }
  } = useStaticQuery(graphql`
    {
      dataYaml(slug: { eq: "team" }) {
        team {
          name
          role
          image {
            childImageSharp {
              fixed(width:150, height:150, grayscale:true) {
                ...GatsbyImageSharpFixed
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
        <li key={node.name} className="c-team__member u-margin-bottom-small c-team-member">
          <div className='c-team-member__image'>
            <Img fixed={node.image.childImageSharp.fixed} />
          </div>
          <div className="u-padding-small">
            <h6 className="c-h6 u-margin-none">{node.name}</h6>
            <small>{node.role}</small>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Team;
