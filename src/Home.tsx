/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { getBooks, getBooksBySubject } from "./api/apis";
import { Book, BookMetadata } from "./api/schema";
import { TrendingSubjects } from "./components/TrendingSubjects";
import { AlertSnackbar } from "./components/AlertSnackbar";
import { CommonTable } from "./components/CommonTable";
import { delay } from "./components/constant";
import { CustomPagination } from "./components/CustomPagination";
import { useParams } from "react-router-dom";

const Home = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [booksMeta, setBooksMeta] = useState<BookMetadata>({
    total: 0,
  });
  const [pagination, setPagination] = useState({
    limit: 10,
    offset: 0,
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [severity, setSeverity] = useState<"success" | "error">("success");
  const [alertMessage, setAlertMessage] = useState("");

  const [searchSubject, setSearchSubject] = useState("");
  const [searchText, setSearchText] = useState("");
  const [tempSearchText, setTempSearchText] = useState("");

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (tempSearchText)
      timer = setTimeout(() => {
        setSearchText(tempSearchText);
      }, delay);
    else {
      setSearchText("");
    }
    return () => clearTimeout(timer);
  }, [tempSearchText]);

  useEffect(() => {
    setPagination({
      limit: 10,
      offset: 0,
    });
    if (!searchSubject) {
      if (searchText) {
        setLoading(true);
        getBooks({
          query: searchText,
          pagination,
        })
          .then((res) => {
            setBooksMeta({ total: res?.data?.numFound });
            const filteredBooks = res?.data?.docs?.map((book: any) => {
              return {
                title: book?.title,
                subtitle: book?.subtitle || "",
                author_name: book?.author_name || ["NA"],
                first_publish_year: book?.first_publish_year || "NA",
                latest_publish_year: book?.publish_year
                  ? Math.max.apply(null, [...book?.publish_year])
                  : "NA",
              };
            });
            setBooks(filteredBooks);
            setLoading(false);
            setAlert(true);
            setSeverity("success");
            setAlertMessage("Books fetched successfully");
          })
          .catch((err) => {
            setLoading(false);
            setAlert(true);
            setSeverity("error");
            setAlertMessage("Error fetching books");
          });
      } else {
        setBooks([]);
        setPagination({
          limit: 10,
          offset: 0,
        });
        setBooksMeta({
          total: 0,
        });
      }
    }
  }, [searchText]);
  useEffect(() => {
    if (searchText) {
      setLoading(true);
      getBooks({
        query: searchText,
        pagination,
      })
        .then((res) => {
          setBooksMeta({ total: res?.data?.numFound });
          const filteredBooks = res?.data?.docs?.map((book: any) => {
            return {
              title: book?.title,
              subtitle: book?.subtitle,
              author_name: book?.author_name,
              first_publish_year: book?.first_publish_year,
              latest_publish_year: book?.publish_year
                ? Math.max.apply(null, [...book?.publish_year])
                : "NA",
            };
          });
          setBooks(filteredBooks);
          setLoading(false);
          setAlert(true);
          setSeverity("success");
          setAlertMessage("Books fetched successfully");
        })
        .catch((err) => {
          setLoading(false);
          setAlert(true);
          setSeverity("error");
          setAlertMessage("Error fetching books");
        });
    } else if (searchSubject) {
      setLoading(true);
      getBooksBySubject({
        subject: searchSubject,
        pagination,
      })
        .then((res) => {
          setBooksMeta({ total: res?.data?.work_count });
          const filteredBooks = res?.data?.works?.map((book: any) => {
            return {
              title: book?.title,
              subtitle: book?.subtitle || "",
              author_name: book?.authors.map(
                (item: { name: string; key: string }) => item?.name
              ) || ["NA"],
              first_publish_year: book?.first_publish_year || "NA",
              latest_publish_year:
                book?.first_publish_year + book?.edition_count,
            };
          });
          setBooks(filteredBooks);
          setLoading(false);
          setAlert(true);
          setSeverity("success");
          setAlertMessage("Books fetched successfully");
        })
        .catch((err) => {
          setLoading(false);
          setAlert(true);
          setSeverity("error");
          setAlertMessage("Error fetching books");
        });
    } else {
      setBooks([]);
      setPagination({
        limit: 10,
        offset: 0,
      });
      setBooksMeta({
        total: 0,
      });
    }
  }, [pagination]);

  useEffect(() => {
    if (searchSubject) {
      setSearchText("");
      setBooks([]);
      setBooksMeta({
        total: 0,
      });
      setLoading(true);
      getBooksBySubject({
        subject: searchSubject,
        pagination,
      })
        .then((res) => {
          setBooksMeta({ total: res?.data?.work_count });
          const filteredBooks = res?.data?.works?.map((book: any) => {
            return {
              title: book?.title,
              subtitle: book?.subtitle || "",
              author_name: book?.authors.map(
                (item: { name: string; key: string }) => item?.name
              ) || ["NA"],
              first_publish_year: book?.first_publish_year || "NA",
              latest_publish_year:
                book?.first_publish_year + book?.edition_count,
            };
          });
          setBooks(filteredBooks);
          setLoading(false);
          setAlert(true);
          setSeverity("success");
          setAlertMessage("Books fetched successfully");
        })
        .catch((err) => {
          setLoading(false);
          setAlert(true);
          setSeverity("error");
          setAlertMessage("Error fetching books");
        });
    } else {
      setSearchText("");
      setBooks([]);
      setPagination({
        limit: 10,
        offset: 0,
      });
      setBooksMeta({
        total: 0,
      });
    }
  }, [searchSubject]);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-start",
        backgroundColor: "#f5f5f5",
        height: "100vh",
      }}
    >
      <TrendingSubjects loading={loading} setSearchSubject={setSearchSubject} />
      <Box
        sx={{
          width: "calc(100vw - 300px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#f5f5f5",
          gap: "10px",
          padding: "20px",
          borderLeft: "1px dashed #e0e0e0",
        }}
      >
        {searchSubject ? (
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "30px",
              padding: "0px 10px",
              textTransform: "uppercase",
            }}
            color="primary"
          >
            {searchSubject}
          </Typography>
        ) : (
          <TextField
            placeholder="Search Books by Title or Author"
            value={tempSearchText}
            onChange={(e) => setTempSearchText(e.target.value)}
            fullWidth
            sx={{
              backgroundColor: "#fff",
            }}
            InputProps={
              tempSearchText
                ? {
                    endAdornment: (
                      <IconButton onClick={() => setTempSearchText("")}>
                        <ClearIcon />
                      </IconButton>
                    ),
                  }
                : {}
            }
            disabled={loading}
            autoComplete="off"
            autoFocus
          />
        )}
        <CommonTable loading={loading} books={books} />
        {books?.length !== 0 && (
          <CustomPagination
            booksMeta={booksMeta}
            pagination={pagination}
            setPagination={setPagination}
            loading={loading}
            booksLength={books?.length}
          />
        )}
      </Box>
      <AlertSnackbar
        open={alert}
        onClose={() => setAlert(false)}
        severity={severity}
        alertMessage={alertMessage}
      />
    </Box>
  );
};

export default Home;
