import React, { useEffect, useState } from "react";
import { Container, Grid, Paper } from "@mui/material";
import "./GeneralStatistics.scss";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { useSelector } from "react-redux";
// import URL from "../../../../../services/api/config";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function GeneralStatistics(props) {
  const generalData =
    useSelector((state) => state.dashboardReducer.generalData) || {};
  console.log({ generalData });

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
              {generalData.productCount}
            </p>
            <p
              style={{ fontFamily: "'Montserrat', san-serif" }}
              className="card-general-statistic-description"
            >
              Tổng số sản phẩm
            </p>
          </div>
        </Grid>
        <Grid item lg={3} md={6} xs={12}>
          <div
            className="card-general-statistic"
            style={{ backgroundColor: "#0060B9" }}
          >
            <p
              style={{ fontFamily: "'Montserrat', san-serif" }}
              className="card-general-statistic-data"
            >
              {generalData.newsCount}
            </p>
            <p
              style={{ fontFamily: "'Montserrat', san-serif" }}
              className="card-general-statistic-description"
            >
              Tổng số bài viết
            </p>
          </div>
        </Grid>
        <Grid item lg={3} md={6} xs={12}>
          <div
            className="card-general-statistic"
            style={{ backgroundColor: "#DE9A27" }}
          >
            <p
              style={{ fontFamily: "'Montserrat', san-serif" }}
              className="card-general-statistic-data"
            >
              {generalData.receiptCount}
            </p>
            <p
              style={{ fontFamily: "'Montserrat', san-serif" }}
              className="card-general-statistic-description"
            >
              Đơn hàng thành công
            </p>
          </div>
        </Grid>
        <Grid item lg={3} md={6} xs={12}>
          <div
            className="card-general-statistic"
            style={{ backgroundColor: "#7B68EE" }}
          >
            <p
              style={{ fontFamily: "'Montserrat', san-serif" }}
              className="card-general-statistic-data"
            >
              {generalData.userCount}
            </p>
            <p
              style={{ fontFamily: "'Montserrat', san-serif" }}
              className="card-general-statistic-description"
            >
              Tổng số người dùng
            </p>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default GeneralStatistics;
