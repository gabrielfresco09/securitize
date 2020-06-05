import React, { useState, useEffect } from "react";
import PaginatedTable from "./PaginatedTable";
import IconButton from "@material-ui/core/IconButton";
import { red, grey } from "@material-ui/core/colors";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import { getCurrencies, addFavourite, removeFavourite } from "../helpers/api";
import CustomSnackBar from "./CustomSnackBar";

const CurrenciesList = () => {
  const [currencies, setCurrencies] = useState([]);
  const [snackBarInfo, setSnackBarInfo] = useState({ open: false });

  const handleFavClick = async item => {
    try {
      item.isFav ? await removeFavourite(item.id) : await addFavourite(item);

      setSnackBarInfo({
        open: true,
        message: item.isFav
          ? `Removed ${item.name} from favs`
          : `Added ${item.name} to favs`,
        handleClose
      });
    } catch (err) {
      setSnackBarInfo({
        open: true,
        message: "An error ocurred",
        handleClose
      });
    }
  };

  const columns = [
    {
      id: "name",
      label: "Name",
      format: ({ id, name }) => (
        <React.Fragment>
          <img
            width="30"
            src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${id}.png`}
          />
          {name}
        </React.Fragment>
      )
    },
    {
      id: "quote",
      label: "Market Price",
      align: "right",
      format: ({ quote }) => quote.USD.price.toLocaleString("en-US")
    },
    {
      id: "circulating_supply",
      label: "Circulating Supply",
      align: "right",
      format: ({ circulating_supply }) =>
        circulating_supply.toLocaleString("en-US").concat(" USD")
    },
    {
      id: "favourites",
      label: "Favourites",
      align: "right",
      format: item => (
        <IconButton onClick={() => handleFavClick(item)}>
          <FavoriteBorderOutlinedIcon
            style={{ color: item.isFav ? red[500] : grey[500] }}
          />
        </IconButton>
      )
    }
  ];

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
    setSnackBarInfo({ opne: false, message: "", handleClose });
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
