import React from "react";
import Default from "./components/Default";
import Hero from "./components/Hero";
import Trusted from "./components/Trusted";

const slices = new Map();
slices.set("hero", Hero);
slices.set("trusted", Trusted);

const Slice = props => {
  const Component = slices.get(props.type) || Default;
  return <Component {...props} />;
};

export default Slice;
