import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { dashboardActions } from "../../../../../actions";
import { dateUltils } from "../../../../../utilities/date.ultil";
import GeneralStatistics from "./component/GeneralStatistic/GeneralStatistics";
import OrderList from "./component/OrderList/OrderList";
import ReportStatistic from "./component/ReportStatistic/ReportStatistic";
import RevenueBarChar from "./component/RevenueBarChar/RevenueBarChar";
import TimeRangePickerModal from "./component/TimeRangePickerModal/TimeRangePickerModal";

function Dashboard(props) {
  const now = new Date();
  const [timeRange, setTimeRange] = useState([
    new Date(now.getFullYear(), now.getMonth(), 1),
    new Date(now.getFullYear(), now.getMonth() + 1, 0),
  ]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(dashboardActions.getGeneralReport());
  }, []);

  useEffect(() => {
    dispatch(dashboardActions.getTimelyReport(timeRange));
  }, [timeRange]);

  console.log({ timeRange });

  const [timeRangeModal, setTimeRangeModal] = useState(false);
  return (
    <div>
      <div className="genaral-statistic-wrapper">
        <h1>Thống kê</h1>
        <GeneralStatistics />
      </div>
      <div
        style={{
          marginTop: "24px",
        }}
        className="timely-report-dashboard"
      >
        <h1
          style={{
            marginBottom: "8px",
          }}
        >
          Báo cáo
        </h1>
        <span
          style={{
            fontSize: "14px",
            color: "#888",
          }}
        >{`Khoảng thời gian (${dateUltils.fortmatToVietNameDay(
          timeRange[0]
        )} - ${dateUltils.fortmatToVietNameDay(timeRange[1])})`}</span>
        <span
          onClick={() => setTimeRangeModal(true)}
          className="clickable-effect"
          style={{
            display: "inline-block",
            fontSize: "14px",
            color: "#00f",
            cusor: "pointer",
            marginLeft: "18px",
          }}
        >
          Thay đổi
        </span>
        <ReportStatistic timeRange={timeRange} />
        <RevenueBarChar timeRange={timeRange} />
        <OrderList timeRange={timeRange} />
        <TimeRangePickerModal
          handleClose={() => setTimeRangeModal(false)}
          setTimeRange={setTimeRange}
          open={timeRangeModal}
        />
      </div>
    </div>
  );
}

export default Dashboard;
