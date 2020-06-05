import React from "react";
import IconButton from "@material-ui/core/IconButton";
import { red, grey } from "@material-ui/core/colors";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";

export const getCurrenciesColumns = handleFavClick => [
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
    id: "favorites",
    label: "Favorites",
    align: "right",
    format: (item, index) => (
      <IconButton onClick={() => handleFavClick(item, index)}>
        <FavoriteBorderOutlinedIcon
          style={{ color: item.isFav ? red[500] : grey[500] }}
        />
      </IconButton>
    )
  }
];

export const getFavouriteColumns = () => [
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
  }
];
