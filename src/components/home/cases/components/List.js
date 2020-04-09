import React from "react";
import Case from "./Case";

const CasesList = ({ cases }) => {
  return (
    <ul className="o-list-bare c-cases-list">
      {cases.map(node => (
        <li key={node.slug} className="c-cases-list__item u-margin-bottom-large">
          <Case node={node} />
        </li>
      ))}
    </ul>
  );
};

export default CasesList;
