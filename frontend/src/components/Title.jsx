import React from "react";
import { SvgIcon } from "@material-ui/core";

export const Title = ({ title }) => (
  <div className="BlockTitle">
    <img width="25" src="revenue.svg" /> <h1>{title}</h1>
  </div>
);
