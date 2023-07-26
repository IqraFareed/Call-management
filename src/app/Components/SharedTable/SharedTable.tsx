"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Paper, Box } from "@mui/material";
import { getCallData } from "../../apis/actions/CallAction";
import { useDispatch, useSelector } from "react-redux";

export default function SharedTable() {
  const [data, setData] = useState<any>([]);

  const columns = [
    { id: "call_type", label: "CALL TYPE", minWidth: 60, align: "left" },
    { id: "direction", label: "DIRECTION", minWidth: 60, align: "left" },
    { id: "duration", label: "DURATION", minWidth: 60, align: "left" },
    { id: "from", label: "FROM", minWidth: 60, align: "left" },
    { id: "to", label: "TO", minWidth: 60, align: "left" },
    { id: "via", label: "VIA", minWidth: 60, align: "left" },
    { id: "created_at", label: "CREATED AT", minWidth: 60, align: "left" },
    { id: "", label: "STATUS", minWidth: 60, align: "left" },
    { id: "action", label: "ACTION", minWidth: 60, align: "left" },
  ];
  const getCallData = () => {
    const config = {
      method: "get",
      url: "https://frontend-test-api.aircall.io/calls?offset=1&limit=10",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    axios(config)
      .then(function (response) {
        console.log(response.data.nodes, "plrsr");
        setData(response.data.nodes);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  React.useEffect(() => {
    getCallData();
  }, []);
  return (
    <Box
      bgcolor={"white"}
      height={"100vh"}
      display={"flex"}
      paddingX={"3rem"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <TableContainer component={Paper}>
        <Table aria-label="caption table">
          <TableHead>
            <TableRow>
              {columns?.map((column, index) => (
                <TableCell
                  align={column.align}
                  key={index}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row: any) => (
              <TableRow key={row.name}>
                {columns.map((column: any, index) => {
                  const value = row[column.id];
                  return (
                    <TableCell key={index} align="left">
                      {value}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
