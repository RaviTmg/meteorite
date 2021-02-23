import React from "react";
import { Meteor } from "meteor/meteor";
import { render } from "react-dom";
import { LoginForm } from "../imports/ui/LoginForm";
import { App } from "../imports/ui/App";

Meteor.startup(() => {
  render(<App />, document.getElementById("react-target"));
});