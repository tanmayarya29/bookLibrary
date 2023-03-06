import React, { useEffect, useState } from "react";
import { Box, Link, TextField, Typography } from "@mui/material";
import { delay, topSubjects } from "./constant";
import { useParams } from "react-router-dom";

interface ITrendingSubjects {
  loading: boolean;
  setSearchSubject: (searchSubject: string) => void;
}

export const TrendingSubjects = (props: ITrendingSubjects) => {
  const params = useParams();
  const subject = params?.subject;
  const [tempSearchSubject, setTempSearchSubject] = useState(subject || "");
  const { loading, setSearchSubject } = props;
  useEffect(() => {
    let timer: NodeJS.Timeout;
    timer = setTimeout(() => {
      setSearchSubject(tempSearchSubject);
    }, delay);
    return () => clearTimeout(timer);
  }, [setSearchSubject, tempSearchSubject]);

  return (
    <Box
      sx={{
        width: "300px",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        gap: "10px",
      }}
    >
      <Typography sx={{ fontWeight: "bold" }} color="primary">
        Trending Subjects
      </Typography>
      <TextField
        placeholder="Search Subjects"
        value={tempSearchSubject}
        onChange={(e) => setTempSearchSubject(e.target.value)}
        fullWidth
        sx={{
          backgroundColor: "#fff",
        }}
        disabled={loading}
      />
      {topSubjects?.map((subject: any) => {
        return (
          <Link
            key={subject}
            href={`/${subject}`}
            onClick={() => {
              setTempSearchSubject(subject);
            }}
          >
            {subject}
          </Link>
        );
      })}
    </Box>
  );
};
