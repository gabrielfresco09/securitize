import React from "react";
import PropTypes from "prop-types";
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2)
    }
  }
}));

const CustomPagination = ({
  rowsPerPage,
  handleChangePage,
  page,
  totalCount
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Pagination
        count={Math.round(totalCount / rowsPerPage)}
        onChange={handleChangePage}
        page={page}
        showFirstButton
        showLastButton
      />
    </div>
  );
};

CustomPagination.propTypes = {
  rowsPerPage: PropTypes.number.isRequired,
  handleChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired
};

export default CustomPagination;
