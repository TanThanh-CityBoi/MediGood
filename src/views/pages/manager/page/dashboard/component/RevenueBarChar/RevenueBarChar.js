import React, { useLayoutEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  HorizontalGridLines,
  LineMarkSeries,
  VerticalBarSeries,
  VerticalGridLines,
  XAxis,
  XYPlot,
  YAxis,
} from "react-vis";
import { dateUltils } from "../../../../../../../utilities/date.ultil";
function RevenueBarChar(props) {
  const receipt = useSelector((state) => {
    return state.dashboardReducer.timelyData.receipt || [];
  });

  const objectR = {};

  receipt.forEach((item) => {
    objectR[item.createdAt] = item.totalPrice;
  });
  console.log({ objectR });
  //   const data = new Array(15).fill(0).reduce(
  //     (prev, curr) => {
  //       const tomorrow = parseInt(prev.slice(-1)[0].x) + 1;
  //       return [
  //         ...prev,
  //         {
  //           x: tomorrow.toString(),
  //           y: prev.slice(-1)[0].y * (0.9 + Math.random() * 0.2),
  //         },
  //       ];
  //     },
  //     [{ x: "1", y: 10 }]
  //   );

  const data = Object.keys(objectR).map((key) => {
    return {
      x: dateUltils.fortmatToVietNameDay(key).slice(0, 5),
      y: objectR[key],
    };
  });

  const myData = [
    { x: "A", y: 10 },
    { x: "B", y: 5 },
    { x: "C", y: 15 },
  ];

  const ref = useRef(null);

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    setWidth(ref.current.offsetWidth);
    setHeight(ref.current.offsetHeight);
  }, []);

  return (
    <div ref={ref}>
      <h2
        style={{
          margin: "12px 0",
          fontWeight: "500",
          color: "#555",
        }}
      >
        Doanh thu
      </h2>
      <XYPlot xType="ordinal" width={width} height={400}>
        <VerticalGridLines />
        <XAxis />
        <YAxis
          style={{
            line: { stroke: "#ADDDE1" },
            ticks: { stroke: "#ADDDE1" },
            text: { stroke: "none", fill: "#6b6b76", fontWeight: 600 },
          }}
        />
        <HorizontalGridLines />
        <VerticalBarSeries data={data} />
      </XYPlot>
    </div>
  );
}

export default RevenueBarChar;
