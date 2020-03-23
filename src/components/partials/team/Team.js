import React from "react";
import { useStaticQuery, graphql } from "gatsby";

const Team = () => {
  const {
    dataYaml: { team }
  } = useStaticQuery(graphql`
    {
      dataYaml(slug: { eq: "team" }) {
        team {
          name
          role
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
            </li>
        ))}
      </ul>
  );
};

export default Team;
