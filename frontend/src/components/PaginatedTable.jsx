import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

const useStyles = makeStyles({
  table: {
    minWidth: "100%"
  }
});

const PaginatedTable = ({
  columns,
  rows,
  fetchData,
  rowsPerPage,
  showPagination
}) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    fetchData({
      limit: rowsPerPage,
      start: page ? rowsPerPage * page : 1
    });
  }, [page]);

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map(column => {
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format(row, index)}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {showPagination && (
        <TablePagination
          component="div"
          count={3000} // FIXME coinmarketcap doesn't return a total count
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
        />
      )}
    </Paper>
  );
};

PaginatedTable.defaultProps = {
  rowsPerPage: 25
};

PaginatedTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      align: PropTypes.string,
      format: PropTypes.func
    })
  ).isRequired,
  rows: PropTypes.arrayOf(PropTypes.shape(PropTypes.any)).isRequired,
  fetchData: PropTypes.func.isRequired,
  rowsPerPage: PropTypes.number,
  showPagination: PropTypes.bool.isRequired
};

export default PaginatedTable;
