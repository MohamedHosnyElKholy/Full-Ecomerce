"use client";
import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Box, Typography } from "@mui/material";
import Countdown from "react-countdown";
import imageone from "../../assets/disc.svg";

const Completionist = () => <span>Countdown finished!</span>;

export default function Page() {
  const totalSeconds = 60 * 60 * 24 * 100;
  const [countEndData, setCountEndData] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Safe to access localStorage here
      const endCount = localStorage.getItem("countdownEndDate");
      if (endCount) {
        setCountEndData(Number(endCount));
      } else {
        const newEndDate = Date.now() + totalSeconds * 1000;
        setCountEndData(newEndDate);
        localStorage.setItem("countdownEndDate", newEndDate);
      }
    }
  }, []);

  if (countEndData === null) {
    return null; // Render nothing until countEndData is set
  }

  return (
    <Box>
      <Container
        sx={{
          backgroundColor: "#000",
          padding: { xs: "40px 20px", md: "60px 40px" },
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography sx={{ fontWeight: 600, color: "#00FF66" }}>
              Categories
            </Typography>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: { xs: "24px", md: "36px" },
                color: "#fff",
              }}
            >
              Enhance Your Music Experience
            </Typography>
            <Countdown
              date={countEndData}
              renderer={({ days, hours, minutes, seconds, completed }) => {
                if (completed) {
                  return <Completionist />;
                } else {
                  return (
                    <Box
                      sx={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "flex-start",
                        marginTop: "20px",
                      }}
                    >
                      {[{ label: "days", value: days }, { label: "hours", value: hours }, { label: "minutes", value: minutes }, { label: "seconds", value: seconds }].map(
                        ({ label, value }) => (
                          <Box
                            key={label}
                            sx={{
                              textAlign: "center",
                              backgroundColor: "#fff",
                              padding: "10px",
                              borderRadius: "5px",
                              flex: 1,
                              minWidth: "60px",
                            }}
                          >
                            <Typography
                              sx={{
                                fontWeight: 600,
                                fontSize: "24px",
                                color: "#000",
                              }}
                            >
                              {value}
                            </Typography>
                            <Typography
                              sx={{
                                fontWeight: 400,
                                fontSize: "11px",
                                color: "#000",
                              }}
                            >
                              {label}
                            </Typography>
                          </Box>
                        )
                      )}
                    </Box>
                  );
                }
              }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              backgroundImage: `url(${imageone.src})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              width: "100%",
              height: { xs: "200px", md: "400px" },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Content for the second column goes here */}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
