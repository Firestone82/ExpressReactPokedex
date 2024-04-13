import React from "react";
import { Paper, Stack } from "@mui/material";
import MainPage from "../component/MainPage";
import panorama from "../assets/img/background.jpg";

const Index = () => {
  return (
    <Stack spacing={2}>
      <img src={panorama} alt="panorama" width="100%" style={{ borderRadius: "5px" }} />
      <Paper>
        <MainPage />
      </Paper>
    </Stack>
  );
};

export default Index;
