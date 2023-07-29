import React from "react";
import SharedTable from "./Components/SharedTable/SharedTable";
import { Box, Paper, Typography } from "@mui/material";
import { fetchToken } from "@/app/apis/slice/generateToken";
import { useDispatch, useSelector } from "react-redux";
const Call = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchToken());
  }, []);
  return (
    <>
      <Box bgcolor={"white"} paddingTop={5}>
        <Typography paddingLeft={6} fontSize={"24px"} fontWeight={600}>
          Call Data
        </Typography>
        <SharedTable />
      </Box>
    </>
  );
};

export default Call;
