import React from "react";
import { Box, Button, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { BookMetadata } from "../api/schema";

interface ICustomPagination {
  booksMeta: BookMetadata;
  pagination: {
    offset: number;
    limit: number;
  };
  setPagination: (pagination: { offset: number; limit: number }) => void;
  loading: boolean;
  booksLength: number;
}

export const CustomPagination = (props: ICustomPagination) => {
  const { booksMeta, pagination, setPagination, loading, booksLength } = props;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "10px",
        padding: "10px 0px",
        width: "100%",
      }}
    >
      <Typography
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: "10px",
          fontSize: "14px",
          fontWeight: "bold",
        }}
      >
        Page {booksMeta?.total === 0 ? 0 : pagination.offset + 1} of{" "}
        {Math.ceil(booksMeta?.total / pagination?.limit)}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <Button
          onClick={() => {
            setPagination({ ...pagination, offset: pagination.offset - 1 });
          }}
          disabled={
            pagination.offset === 0 || loading || booksMeta?.total === 0
          }
          variant="outlined"
          color="primary"
          startIcon={<NavigateBeforeIcon />}
        >
          Previous
        </Button>
        <Button
          onClick={() => {
            setPagination({ ...pagination, offset: pagination.offset + 1 });
          }}
          disabled={
            loading || booksMeta?.total === 0 || booksLength < pagination.limit
          }
          variant="outlined"
          color="primary"
          endIcon={<NavigateNextIcon />}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};
