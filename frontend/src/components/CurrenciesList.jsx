import React, { useState, useEffect } from "react";
import PaginatedTable from "./PaginatedTable";
import { getCurrencies, addFavourite, removeFavourite } from "../helpers/api";
import CustomSnackBar from "./CustomSnackBar";
import { getCurrenciesColumns } from "../helpers/tableColumns";

const CurrenciesList = () => {
  const [currencies, setCurrencies] = useState([]);
  const [snackBarInfo, setSnackBarInfo] = useState({ open: false });

  const handleFavClick = async (item, index) => {
    try {
      const { data } = item.isFav
        ? await removeFavourite(item.id)
        : await addFavourite(item);

      setSnackBarInfo({
        open: true,
        message: item.isFav
          ? `Removed ${item.name} from favs`
          : `Added ${item.name} to favs`,
        handleClose
      });
      debugger;
      currencies[index] = data;
      setCurrencies([...currencies]);
    } catch (err) {
      setSnackBarInfo({
        open: true,
        message: "An error ocurred",
        handleClose
      });
    }
  };

  const columns = getCurrenciesColumns(handleFavClick);

  const fetchCurrencies = async params => {
    try {
      const { data } = await getCurrencies(params);
      setCurrencies(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCurrencies({ limit: 25, start: 1 });
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackBarInfo({ open: false, message: "", handleClose });
  };

  return (
    <div>
      <PaginatedTable
        rows={currencies}
        fetchData={fetchCurrencies}
        columns={columns}
        rowsPerPage={25}
      />
      <CustomSnackBar {...snackBarInfo} />
    </div>
  );
};

export default CurrenciesList;
