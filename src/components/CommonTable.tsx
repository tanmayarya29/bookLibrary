import React from "react";
import {
  CircularProgress,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { columnNames } from "./constant";
import { Book } from "../api/schema";

interface ICommonTable {
  books: Book[];
  loading: boolean;
}

export const CommonTable = (props: ICommonTable) => {
  const { books, loading } = props;
  return (
    <Table
      sx={{
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: "10px",
        boxShadow: "0px 0px 10px 2px rgba(0,0,0,0.1)",
        padding: "10px",
        marginTop: "10px",
        height: "600px",
      }}
    >
      <TableHead>
        <TableRow>
          {columnNames.map((columnName) => {
            return (
              <TableCell
                key={columnName}
                sx={{
                  fontWeight: "bold",
                }}
              >
                {columnName}
              </TableCell>
            );
          })}
        </TableRow>
      </TableHead>
      <TableBody>
        {books?.length === 0 ? (
          loading ? (
            <TableRow>
              <TableCell colSpan={4} sx={{ textAlign: "center" }}>
                <CircularProgress />
              </TableCell>
            </TableRow>
          ) : (
            <TableRow>
              <TableCell colSpan={4} sx={{ textAlign: "center" }}>
                No books found
              </TableCell>
            </TableRow>
          )
        ) : (
          books?.map((book: any, index: number) => {
            return (
              <TableRow key={String(index)}>
                {loading ? (
                  <TableCell>
                    <Typography>
                      <Skeleton />
                    </Typography>
                  </TableCell>
                ) : (
                  <TableCell>
                    <Tooltip
                      title={
                        book?.title +
                        " " +
                        (book?.subtitle === undefined ? " " : book?.subtitle)
                      }
                      placement="top"
                    >
                      <Typography
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          width: "200px",
                        }}
                      >
                        {book?.title +
                          " " +
                          (book?.subtitle === undefined ? " " : book?.subtitle)}
                      </Typography>
                    </Tooltip>
                  </TableCell>
                )}
                {loading ? (
                  <TableCell>
                    <Skeleton />
                  </TableCell>
                ) : (
                  <TableCell>
                    <Tooltip
                      title={book?.author_name?.join(", ")}
                      placement="top"
                    >
                      <Typography
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          width: "200px",
                        }}
                      >
                        {book?.author_name?.join(", ")}
                      </Typography>
                    </Tooltip>
                  </TableCell>
                )}
                {loading ? (
                  <TableCell>
                    <Skeleton />
                  </TableCell>
                ) : (
                  <TableCell>{book?.first_publish_year}</TableCell>
                )}
                {loading ? (
                  <TableCell>
                    <Skeleton />
                  </TableCell>
                ) : (
                  <TableCell>{book?.latest_publish_year}</TableCell>
                )}
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  );
};
