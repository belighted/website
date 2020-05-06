import React from "react";
import ClientLogo from "../../clients/ClientLogo";

const StrategyWorkshopApproved = ({ title, list }) => {
  return (
    <div className="o-wrapper">
      <h1
        className="c-heading c-heading--3"
        dangerouslySetInnerHTML={{ __html: title }}
      />
      <ul>
        {list.map(item => (
          <li key={item}>
            <ClientLogo slug={item} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StrategyWorkshopApproved;
