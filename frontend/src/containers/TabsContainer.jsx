import React, { useState } from "react";

import CurrenciesList from "../components/CurrenciesList";
import Favorites from "../components/Favorites";
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
        <Tab label="Favorites" />
      </Tabs>
      <div role="tabpanel" hidden={value !== 0}>
        <CurrenciesList />
      </div>
      <div role="tabpanel" hidden={value !== 1}>
        {/* If I used redux I could avoided this since the state would have been shared.
         But I had no time to do so */}
        <Favorites shouldUpdate={!!value} />
      </div>
    </React.Fragment>
  );
};

export default TabsContainer;
