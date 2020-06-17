import React from "react";
import { action } from "@storybook/addon-actions";
import Button from "./Button";

export default {
  title: "Button",
  component: Button
};

export const Primary = () => (
  <Button onClick={action("clicked")}>Hello Button</Button>
);
export const OutlinePrimary = () => (
  <Button onClick={action("clicked")} modifier={"outline-primary"}>
    Hello Button
  </Button>
);
