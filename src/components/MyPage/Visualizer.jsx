import React, { useState, useEffect, useMemo, useContext } from "react";
import useAuth from "../../lib/hooks/useAuth";
import "react-vis/dist/style.css";
import "react-vis/dist/style.css";
import "./Visualizer.css";

import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  LineSeries,
} from "react-vis";

const Visualizer = ({ dateArray }) => {
  const { user } = useAuth();
  const [data, setData] = useState([]);
  const [dates, setDates] = useState([]);

  useEffect(() => {
    setDates(
      dateArray
        ?.map((dateString) => new Date(dateString))
        .sort((a, b) => a.getTime() - b.getTime())
    );
  }, [user]);

  useEffect(() => {
    let maps = new Map();
    console.log(dates);
    if (dates) {
      for (const date of dates) {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        const convertedDate = new Date(year, month - 1, day);
        const timestamp = convertedDate.getTime();

        if (!maps.has(timestamp)) {
          maps.set(timestamp, 10);
        } else {
          maps.set(timestamp, maps.get(timestamp) + 10);
        }
      }
    }

    let result = [];
    for (let key of maps) {
      result.push({ x: key[0], y: key[1] });
    }
    setData(result);
  }, [dates]);

  const XtickValues = useMemo(() => {
    const maxX = Math.max(...data.map((item) => item.x));
    const minX = Math.min(...data.map((item) => item.x));

    const XAxis = [];
    for (let i = minX; i <= maxX; i += 86400000) {
      XAxis.push(i);
    }
    return XAxis;
  }, [data]);

  const YtickValues = useMemo(() => {
    const maxY = Math.max(...data.map((item) => item.y));
    return [0, maxY + 10];
  }, [data]);

  return (
    <div className="visualizer-container">
      <XYPlot
        width={70 * XtickValues.length}
        height={5 * YtickValues[1]}
        yDomain={YtickValues}
      >
        <HorizontalGridLines style={{ stroke: "#6B6B76", display: "none" }} />
        <VerticalGridLines style={{ stroke: "#6B6B76", display: "none" }} />
        <XAxis
          title="날짜"
          tickValues={XtickValues}
          tickFormat={(v) => {
            const date = new Date(v);
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, "0");
            const day = date.getDate().toString().padStart(2, "0");
            return `${year}/${month}/${day}`;
          }}
          style={{
            line: { stroke: "#000000" },
            ticks: { stroke: "#6B6B76" },
            text: { stroke: "none", fill: "#6b6b76", fontWeight: 600 },
          }}
        />
        <YAxis
          title="문제 수"
          style={{
            line: { stroke: "#000000" },
            ticks: { stroke: "#6B6B76" },
            text: { stroke: "none", fill: "#6b6b76", fontWeight: 600 },
          }}
        />
        <LineSeries
          className="first-series"
          data={data}
          style={{
            stroke: "#0047FF",
            strokeLinejoin: "round",
            strokeWidth: 4,
          }}
        />
      </XYPlot>
    </div>
  );
};

export default Visualizer;
