import React from "react";
import Slice from "./Slice";

const Slices = ({ slices }) => {
  return (
    <div>
      {slices.map(slice => (
        <Slice {...slice} key={slice.id} />
      ))}
    </div>
  );
};

export default Slices;
