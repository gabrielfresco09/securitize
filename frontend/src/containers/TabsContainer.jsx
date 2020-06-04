import React, { useState, useEffect } from "react";
import { getCurrencies } from "../helpers/api";
import CurrenciesTable from "../components/CurrenciesTable";

const TabsContainer = () => {
  const [currencies, setCurrencies] = useState([]);
  useEffect(async () => {
    try {
      const { data } = await getCurrencies({ limit: 5000, start: 1 });
      console.log("Currencies", data);
      setCurrencies(data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  return <div>{<CurrenciesTable rows={currencies} />}</div>;
};

export default TabsContainer;
