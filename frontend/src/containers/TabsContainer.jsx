import React, { useState } from "react";

import CurrenciesList from "../components/CurrenciesList";
import Favourites from "../components/Favourites";
import { Tabs, Tab } from "@material-ui/core";

const TabsContainer = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        aria-label="disabled tabs example"
      >
        <Tab label="Assets" />
        <Tab label="Favourites" />
      </Tabs>
      <div role="tabpanel" hidden={value !== 0}>
        <CurrenciesList />
      </div>
      <div role="tabpanel" hidden={value !== 1}>
        <Favourites />
      </div>
    </React.Fragment>
  );
};

export default TabsContainer;
