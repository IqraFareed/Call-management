import React from "react";
// import "./paginationButton.css";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import {
  Paper,
  Box,
  Typography,
  Button,
  Link,
  List,
  ListItem,
} from "@mui/material";
import "./style.css";
interface PaginationProps {
  totalRecords: number;
  NumberOfRecordsPerPage: number;
  totalPages: number;
  setRecord: () => number;
  record: number;
  setCurrentPage: (currentPage: number) => number;
  currentPage: number;
  numbers: number[];
  firstIndex: number;
  lastIndex: number;
}

const SharedPagination = (props: PaginationProps) => {
  const { numbers, currentPage, totalPages, setCurrentPage, lastIndex } = props;
  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const nextPage = () => {
    if (currentPage !== totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const changeCurrentPage = (n: number) => {
    setCurrentPage(n);
  };
  return (
    <Box display={"grid"}>
      <Box>
        <nav>
          <List sx={{ display: "flex" }}>
            <ListItem>
              <Link to="#" onClick={prevPage} className={"arrows"}>
                <ArrowBackIos />
              </Link>
            </ListItem>
            {numbers?.map((n: number) => {
              return (
                <ListItem
                  className={`page-item ${currentPage === n ? "active" : ""}`}
                >
                  <Link
                    to="#"
                    onClick={() => changeCurrentPage(n)}
                    className={`page-item ${
                      currentPage === n ? "activeText" : "inactiveText"
                    }`}
                  >
                    {n}
                  </Link>
                </ListItem>
              );
            })}
            <ListItem>
              <Link to="#" onClick={nextPage} className={"arrows"}>
                <ArrowForwardIos />
              </Link>
            </ListItem>
          </List>
        </nav>
      </Box>
      <Box display={"flex"} justifyContent={"center"}>
        1- of {totalPages} results
      </Box>
    </Box>
  );
};
export default SharedPagination;
