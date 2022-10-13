import React, { useEffect, useState } from "react";
import { Container, Grid, Paper } from "@mui/material";
import "./ReportStatistic.scss";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { useSelector } from "react-redux";
import { dateUltils } from "../../../../../../../utilities/date.ultil";
// import URL from "../../../../../services/api/config";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function ReportStatistic({ timeRange }) {
  const receipt = useSelector((state) => {
    console.log({ state });
    return state.dashboardReducer.timelyData.receipt || [];
  });

  return (
    <div className="general-statistic">
      <Grid container spacing={2}>
        <Grid item lg={3} md={6} xs={12}>
          <div
            className="card-general-statistic"
            style={{ backgroundColor: "#1F1498" }}
          >
            <p
              style={{ fontFamily: "'Montserrat', san-serif" }}
              className="card-general-statistic-data"
            >
              {receipt
                .reduce((prev, current) => {
                  return prev + current.totalPrice;
                }, 0)
                .toLocaleString()}{" "}
              VNĐ
            </p>
            <p
              style={{ fontFamily: "'Montserrat', san-serif" }}
              className="card-general-statistic-description"
            >
              Tổng doanh thu
            </p>
            <span>
              {`(${dateUltils.fortmatToVietNameDay(
                timeRange[0]
              )} - ${dateUltils.fortmatToVietNameDay(timeRange[1])})`}
            </span>
          </div>
        </Grid>

        <Grid item lg={3} md={6} xs={12}>
          <div
            className="card-general-statistic"
            style={{ backgroundColor: "#1F1498" }}
          >
            <p
              style={{ fontFamily: "'Montserrat', san-serif" }}
              className="card-general-statistic-data"
            >
              {receipt
                .reduce((prev, current) => {
                  return prev + current.profit;
                }, 0)
                .toLocaleString()}{" "}
              VNĐ
            </p>
            <p
              style={{ fontFamily: "'Montserrat', san-serif" }}
              className="card-general-statistic-description"
            >
              Lợi nhuận
            </p>
            <span>
              {`(${dateUltils.fortmatToVietNameDay(
                timeRange[0]
              )} - ${dateUltils.fortmatToVietNameDay(timeRange[1])})`}
            </span>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default ReportStatistic;
