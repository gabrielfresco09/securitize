import React, { useState, useEffect } from "react";
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

const PaginatedTable = ({ columns, rows, fetchData, rowsPerPage }) => {
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
            {rows.map(row => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map(column => {
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format(row)}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={3000} // FIXME coinmarketcap doensn't return a total count
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
      />
    </Paper>
  );
};

export default PaginatedTable;
