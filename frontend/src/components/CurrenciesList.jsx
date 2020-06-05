import React, { useState, useEffect } from "react";
import PaginatedTable from "./PaginatedTable";
import { getCurrencies, addFavourite, removeFavourite } from "../helpers/api";
import CustomSnackBar from "./CustomSnackBar";
import { getCurrenciesColumns } from "../helpers/tableColumns";
import { Title } from "./Title";

const CurrenciesList = () => {
  const [currencies, setCurrencies] = useState({ data: [], totalCount: 0 });
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
      currencies.data[index] = data;
      setCurrencies({
        data: [...currencies.data],
        totalCount: currencies.totalCount
      });
    } catch (err) {
      setSnackBarInfo({
        open: true,
        message: "An error ocurred",
        handleClose
      });
    }
  };

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

  const columns = getCurrenciesColumns(handleFavClick);

  return (
    <div>
      <Title title="Cryptocurrencies" />
      <PaginatedTable
        rows={currencies.data}
        totalCount={currencies.totalCount}
        fetchData={fetchCurrencies}
        columns={columns}
        rowsPerPage={25}
        showPagination={true}
      />
      <CustomSnackBar {...snackBarInfo} />
    </div>
  );
};

export default CurrenciesList;
