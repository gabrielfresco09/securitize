import React from "react";
import IconButton from "@material-ui/core/IconButton";
import { red, grey } from "@material-ui/core/colors";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";

const sharedColumns = [
  {
    id: "name",
    label: "Name",
    format: ({ id, name }) => (
      <div className="BlockName">
        <img
          width="30"
          src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${id}.png`}
        />
        {name}
      </div>
    )
  },
  {
    id: "quote",
    label: "Market Price",
    align: "right",
    format: ({ quote }) =>
      quote.USD.price ? quote.USD.price.toLocaleString("en-US") : "-"
  },
  {
    id: "circulating_supply",
    label: "Circulating Supply",
    align: "right",
    format: ({ circulating_supply }) =>
      circulating_supply
        ? circulating_supply.toLocaleString("en-US").concat(" USD")
        : "-"
  }
];

export const getCurrenciesColumns = handleFavClick => [
  ...sharedColumns,
  {
    id: "favorites",
    label: "Favorites",
    align: "right",
    format: (item, index) => (
      <IconButton onClick={() => handleFavClick(item, index)}>
        <FavoriteBorderOutlinedIcon
          style={{ color: item.isFav ? red[500] : grey[900] }}
        />
      </IconButton>
    )
  }
];

export const getFavouriteColumns = () => sharedColumns;
