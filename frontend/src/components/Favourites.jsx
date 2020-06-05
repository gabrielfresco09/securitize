import React, { useState, useEffect } from "react";
import PaginatedTable from "./PaginatedTable";
import { getFavourites } from "../helpers/api";

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
  }
];

const Favourites = () => {
  const [favourites, setFavourites] = useState([]);

  const fetchFavourites = async () => {
    try {
      const { data } = await getFavourites();
      setFavourites(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFavourites();
  }, []);

  return (
    <PaginatedTable
      rows={favourites}
      fetchData={fetchFavourites}
      columns={columns}
      rowsPerPage={25}
    />
  );
};

export default Favourites;
