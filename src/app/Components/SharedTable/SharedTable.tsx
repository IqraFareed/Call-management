"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Paper, Box, Typography, Button } from "@mui/material";
import { fetchCalls } from "@/app/apis/slice/callSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/apis/store";
import moment from "moment";
import SharedPagination from "../SharedPagination/SharedPagination";
import SharedModal from "../SharedModal/SharedModal";
export default function SharedTable() {
  const columns = [
    { id: "call_type", label: "CALL TYPE", minWidth: 60, align: "left" },
    { id: "direction", label: "DIRECTION", minWidth: 60, align: "left" },
    { id: "duration", label: "DURATION", minWidth: 60, align: "left" },
    { id: "from", label: "FROM", minWidth: 60, align: "left" },
    { id: "to", label: "TO", minWidth: 60, align: "left" },
    { id: "via", label: "VIA", minWidth: 60, align: "left" },
    { id: "created_at", label: "CREATED AT", minWidth: 60, align: "left" },
    { id: "is_archived", label: "STATUS", minWidth: 60, align: "left" },
    { id: "action", label: "ACTION", minWidth: 60, align: "left" },
  ];
  const dispatch = useDispatch<AppDispatch>();
  const { entities } = useSelector((state: RootState) => state.call);
  let data = entities.nodes;

  const { accessToken } = useSelector((state: RootState) => state.accessToken);
  const [open, setOpen] = React.useState(false);
  const [modalData, setModalData] = React.useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const NumberOfRecordsPerPage = 8;
  const lastIndex = currentPage * NumberOfRecordsPerPage;
  const firstIndex = lastIndex - NumberOfRecordsPerPage;
  const offset = (currentPage - 1) * NumberOfRecordsPerPage;
  const totalPages = Math.ceil(entities.totalCount / NumberOfRecordsPerPage);
  const numbers: number[] = totalPages
    ? [...Array(totalPages + 1).keys()].slice(1)
    : [];

  React.useEffect(() => {
    if (accessToken) {
      dispatch(
        fetchCalls({
          accessToken: `Bearer ${accessToken}`,
          limit: NumberOfRecordsPerPage,
          offset: offset,
        })
      );
    }
  }, [accessToken, offset]);
  function formatSecondsToMinutesAndSeconds(seconds: "string") {
    const duration = moment.duration(seconds, "seconds");
    const minutes = duration.minutes();
    const remainingSeconds = duration.seconds();
    return `${minutes} minutes and ${remainingSeconds} seconds`;
  }

  const handleOpen = (row: any) => {
    setOpen(true);
    setModalData(row);
  };
  const handleClose = () => setOpen(false);
  return (
    <Box bgcolor={"white"} paddingX={"3rem"}>
      <Box paddingY={"1rem"}>Filter by: Status</Box>
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
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
                        {column.id === "call_type" ? (
                          <Typography>{value}</Typography>
                        ) : column.id === "duration" ? (
                          <Typography>
                            {formatSecondsToMinutesAndSeconds(value)}
                          </Typography>
                        ) : column.id === "created_at" ? (
                          <Typography>
                            {moment(value).format("DD-MM-YYYY")}
                          </Typography>
                        ) : column.id === "is_archived" ? (
                          <Typography>
                            {value ? "Archived" : "Unarchive"}
                          </Typography>
                        ) : column.id === "action" ? (
                          <Box>
                            <Button
                              variant="contained"
                              onClick={() => handleOpen(row)}
                            >
                              Add Note
                            </Button>
                          </Box>
                        ) : (
                          <Typography>{value}</Typography>
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
              {open && (
                <Box>
                  <SharedModal
                    open={open}
                    handleClose={handleClose}
                    data={modalData}
                  />
                </Box>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box
        marginY={5}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <SharedPagination
          totalRecords={entities.totalCount}
          NumberOfRecordsPerPage={NumberOfRecordsPerPage}
          totalPages={totalPages}
          setRecord={(e: any) => setCurrentPage(e)}
          record={currentPage}
          setCurrentPage={(e: any) => setCurrentPage(e)}
          currentPage={currentPage}
          numbers={numbers}
          firstIndex={firstIndex}
          lastIndex={lastIndex}
        />
      </Box>
    </Box>
  );
}
