import React, { useState, useEffect } from "react";
import "react-vis/dist/style.css";
import "./Visualizer.css";

import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  LineMarkSeries,
} from "react-vis";

const Visualizer = ({ dateArray }) => {
  const [data, setData] = useState([]);
  const [dates, setDates] = useState([]);
  const [x, setX] = useState([]);
  const [y, setY] = useState([]);
  const [maxY, setMaxY] = useState([]);

  useEffect(() => {
    setDates(
      dateArray
        ?.map((dateString) => new Date(dateString))
        .sort((a, b) => a.getTime() - b.getTime())
    );
  }, []);

  useEffect(() => {
    let maps = new Map();
    let maxY = 0;

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

        const nowY = maps.get(timestamp);
        maxY = maxY > nowY ? maxY : nowY;
      }
    }

    const minDate = Math.min(...Array.from(maps.keys()));
    const maxDate = Math.max(...Array.from(maps.keys()));

    const result = [];
    const xArray = [];
    for (let date = minDate; date <= maxDate; date += 86400000) {
      xArray.push(date);
      if (!maps.has(date)) {
        result.push({ x: date, y: 0 });
      } else {
        result.push({ x: date, y: maps.get(date) });
      }
    }

    const YArray = [];
    for (let i = 0; i <= maxY + 10; i += 10) {
      YArray.push(i);
    }

    setData(result);
    setX(xArray);
    setY(YArray);
    setMaxY([0, maxY + 10]);
  }, [dates]);

  return (
    <div className="visualizer-container">
      <XYPlot
        width={70 * x.length > 700 ? 70 * x.length : 700}
        height={470}
        yDomain={maxY}
      >
        <HorizontalGridLines style={{ stroke: "#6B6B76", display: "none" }} />
        <VerticalGridLines style={{ stroke: "#6B6B76", display: "none" }} />
        <XAxis
          title="날짜"
          tickValues={x}
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
          tickValues={y}
          style={{
            line: { stroke: "#000000" },
            ticks: { stroke: "#6B6B76" },
            text: { stroke: "none", fill: "#6b6b76", fontWeight: 600 },
          }}
        />
        <LineMarkSeries
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
