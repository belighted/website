import React from "react";

const StrategyWorkshopApproved = ({ title, list }) => {
  return (
    <div>
      <h1>{title}</h1>
      <ul>
        {list.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default StrategyWorkshopApproved;
