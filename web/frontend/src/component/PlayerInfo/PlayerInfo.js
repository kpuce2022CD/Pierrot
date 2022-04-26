import Layout from "../../Layout/Layout";
import React, { Component, useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./PlayerInfo.css";


const PlayerInfo =()=> {
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

  const user = {
    'name':'test',
    'age':32,
    'height': 177,
    'team':'tuk'
  }
  
  return (
    <Layout>
      <div className="playerInfo">
      <div className="player-info">
        <div className="profile_img">
          <img src="../image/profile.png"/>
        </div>
        <div className="player-info-detail">
        <div className="profile_name">
          <p className="tag">name</p>
          <p>{user.name}</p>
        </div>
        <div className="profile_age">
          <p className="tag">age</p>
          <p>{user.age}</p>
        </div>
        <div className="profile_height">
          <p className="tag">height</p>
          <p>{user.height}</p>
        </div>
        <div className='profile_tema'>
          <p className="tag">team</p>
        <p>{user.team}</p>
        </div>
        </div>

      </div>
      
      <div className="meterial-table">
        <TableContainer component={Paper}>
          <Table sx={{ width: '50%' }} size="small" aria-label="customized table">
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
      </div>
      </div>
      
    </Layout>
  );
}

export default PlayerInfo;
