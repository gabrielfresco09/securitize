import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import PaginatedTable from "./PaginatedTable";
import { getFavorites } from "../helpers/api";
import { getFavouriteColumns } from "../helpers/tableColumns";
import { Title } from "./Title";

const columns = getFavouriteColumns();

const Favorites = ({ shouldUpdate }) => {
  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = async () => {
    try {
      const { data } = await getFavorites();
      setFavorites(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, [shouldUpdate]);

  return (
    <div>
      <Title title="Favorite assets" />
      <PaginatedTable
        rows={favorites}
        fetchData={fetchFavorites}
        columns={columns}
        showPagination={false}
      />
    </div>
  );
};

Favorites.propTypes = {
  shouldUpdate: PropTypes.bool.isRequired
};

export default Favorites;
