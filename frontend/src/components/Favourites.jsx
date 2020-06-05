import React, { useState, useEffect } from "react";
import PaginatedTable from "./PaginatedTable";
import { getFavourites } from "../helpers/api";
import { getFavouriteColumns } from "../helpers/tableColumns";

const columns = getFavouriteColumns();

const Favourites = ({ shouldUpdate }) => {
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
  }, [shouldUpdate]);

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
