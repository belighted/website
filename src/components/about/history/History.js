import React from "react";
import GatsbyImage from "gatsby-image";

const History = ({history}) => {

  return (
    <ul className="c-timeline">
      {history.map(node => (
        <li key={node.date} className="c-timeline__item c-timeline-item">
          <h5 className="c-heading c-heading--5 c-timeline-item__date">
            {node.date}
          </h5>
          <p className="c-timeline-item__date">{node.event}</p>
          {node.image && (
            <div className="c-timeline-item__date">
              <div className="c-avatar c-avatar--large ">
                <GatsbyImage fixed={node.image.childImageSharp.fixed} />
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default History;
