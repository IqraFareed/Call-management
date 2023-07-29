"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Divider, Modal, TextField } from "@mui/material";
import Close from "@mui/icons-material/Close";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "2px",
  boxShadow: 24,
  p: 3,
};

interface IProps {
  open: boolean;
  data: any;
  handleClose: () => boolean;
}

export default function sharedModal(props: IProps) {
  const { open, data, handleClose } = props;

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Add Notes
              </Typography>
              <Typography>CallID:{data.id}</Typography>
            </Box>

            <Box onClick={handleClose} sx={{ cursor: "pointer" }}>
              <Close />
            </Box>
          </Box>
          <Divider sx={{ marginY: "10px" }} />
          <Box>
            <Box display={"flex"}>
              <Typography>Call Type</Typography>
              <Typography marginLeft={"10px"}>{data.call_type} </Typography>
            </Box>
            <Box display={"flex"}>
              <Typography> Duration</Typography>

              <Typography marginLeft={"10px"}>{data.duration} </Typography>
            </Box>
            <Box display={"flex"}>
              <Typography> From</Typography>

              <Typography marginLeft={"10px"}>{data.from} </Typography>
            </Box>
            <Box display={"flex"}>
              <Typography> To</Typography>

              <Typography marginLeft={"10px"}>{data.to} </Typography>
            </Box>
            <Box display={"flex"}>
              <Typography> Via</Typography>

              <Typography marginLeft={"10px"}>{data.via} </Typography>
            </Box>
            <Box>
              <Typography> Note</Typography>

              <TextField
                id="outlined-multiline-static"
                label="Multiline"
                multiline
                rows={3}
                variant="outlined"
                sx={{ width: "22rem" }}
              />
            </Box>
            <Divider sx={{ marginY: "10px" }} />
            <Box mt="25px" display="flex" justifyContent={"center"}>
              <Button variant="contained" sx={{ width: "20rem" }}>
                Save
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
