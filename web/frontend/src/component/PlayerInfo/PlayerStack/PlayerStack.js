import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 15
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0
  }
}));

function createData(name, matches, win, defeat, rate) {
  return { name, matches, win, defeat, rate };
}

const rows = [
  // 시즌에는 id값을 넣고 뒤에는 경기수 등은 만들어 넣어야함
  createData("Season_2021", 159, 6.0, 24, 4.0),
  createData("Spring_2022", 237, 9.0, 37, 4.3),
  createData("Summer_2022", 262, 16.0, 24, 6.0)
];

export default function CustomizedTables() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Season</StyledTableCell>
            <StyledTableCell align="right">Matches</StyledTableCell>
            <StyledTableCell align="right">Win&nbsp;Game</StyledTableCell>
            <StyledTableCell align="right">Defeat&nbsp;Game</StyledTableCell>
            <StyledTableCell align="right">Win&nbsp;Rate</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">G : {row.matches}</StyledTableCell>
              <StyledTableCell align="right">W : {row.win}</StyledTableCell>
              <StyledTableCell align="right">D : {row.defeat}</StyledTableCell>
              <StyledTableCell align="right">{row.rate}%</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
