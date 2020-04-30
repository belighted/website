import React from "react";
import Default from "./components/Default";
import Hero from "./components/Hero";
import StrategyWorkshopApproved from "./components/StrategyWorkShopApproved";
import Cols from "./components/Cols";
import LeadingBrands from "../splits/LeadingBrands";

const slices = new Map();
slices.set("hero", Hero);
slices.set("trusted", LeadingBrands);
slices.set("cols", Cols);
slices.set("strategy-workshop-approved", StrategyWorkshopApproved);

const Slice = props => {
  const Component = slices.get(props.type) || Default;
  return <Component {...props} />;
};

export default Slice;
