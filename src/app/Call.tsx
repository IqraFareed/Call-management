import React from "react";
import SharedTable from "./Components/SharedTable/SharedTable";
import { Box, Paper } from "@mui/material";
import { fetchToken } from "@/app/apis/slice/generateToken";
import { useDispatch, useSelector } from "react-redux";
const Call = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchToken());
  }, []);
  return (
    <>
      <Box>
        <SharedTable />
      </Box>
    </>
  );
};

export default Call;
