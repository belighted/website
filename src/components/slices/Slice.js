import React from "react";
import Default from "./components/Default";
import Hero from "./components/Hero";
import StrategyWorkshopApproved from "./components/StrategyWorkShopApproved";
import Cols from "./components/Cols";
import LeadingBrands from "../splits/LeadingBrands";
import classNames from "classnames";
import Testimonials from "./components/Testimonials";
import Split from "./components/Split";
import Chapters from "./components/Chapters";
import Referal from "./components/Referal";
import Process from "./components/Process";
import Links from "./components/Links";

const slices = new Map();
slices.set("hero", Hero);
slices.set("trusted", LeadingBrands);
slices.set("cols", Cols);
slices.set("split", Split);
slices.set("chapters", Chapters);
slices.set("process", Process);
slices.set("approved-by", StrategyWorkshopApproved);
slices.set("testimonials", Testimonials);
slices.set("stories", Testimonials);
slices.set("links", Links);
slices.set("referal", Referal);

const Slice = props => {
  const Component = slices.get(props.type) || Default;
  return (
    <div className={classNames("c-slice", props.type)}>
      <Component {...props} />
    </div>
  );
};

export default Slice;
