import { Box, Typography } from "@mui/material";
import React from "react";

export const NotFound = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        padding: "20px",
      }}
    >
      <Typography
        sx={{
          fontWeight: "bold",
          fontSize: "30px",
          padding: "0px 10px",
          textTransform: "uppercase",
        }}
      >
        4☹️4 Not Found!!!
      </Typography>
    </Box>
  );
};
