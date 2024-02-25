import React, { useState, useEffect, useMemo } from "react";
import useAuth from "~/lib/hooks/useAuth";
import { curveCatmullRom } from 'd3-shape';
import 'react-vis/dist/style.css';

import {
    XYPlot,
    XAxis,
    YAxis,
    HorizontalGridLines,
    VerticalGridLines,
    LineSeries
} from 'react-vis';

const Visualizer = () => {
    const { user } = useAuth();
    const [data, setData] = useState([]);

    useEffect(() => {
        setData([
            { x: 1, y: 20 },
            { x: 2, y: 0 },
            { x: 3, y: 30 },
            { x: 4, y: 10 },
        ]);
    }, []);

    const XtickValues = useMemo(() => {
        const maxX = Math.max(...data.map(item => item.x));
        const minX = Math.min(...data.map(item => item.x));

        const XAxis = [];
        for (let i = minX; i <= maxX; i += 1) {
            XAxis.push(i);
        }
        console.log(XAxis);
        return XAxis;
    }, [data]);

    const YtickValues = useMemo(() => {
        const maxY = Math.max(...data.map(item => item.y));

        const YAxis = [];
        for (let i = 0; i <= maxY; i += 10) {
            YAxis.push(i);
        }
        console.log(YAxis);
        return YAxis;
    }, [data]);

    return (
        <XYPlot width={300} height={300}>
            <HorizontalGridLines style={{ stroke: '#6B6B76', display: "none" }} />
            <VerticalGridLines style={{ stroke: '#6B6B76', display: "none" }} />
            <XAxis
                title="날짜"
                tickValues={XtickValues}
                tickFormat={v => `2/${v}`}
                style={{
                    line: { stroke: '#000000' },
                    ticks: { stroke: '#6B6B76' },
                    text: { stroke: 'none', fill: '#6b6b76', fontWeight: 600 }
                }}
            />
            <YAxis
                title="문제 수"
                tickValues={YtickValues}
                // range={[0, 30]}
                style={{
                    line: { stroke: '#000000' },
                    ticks: { stroke: '#6B6B76' },
                    text: { stroke: 'none', fill: '#6b6b76', fontWeight: 600 }
                }} />
            <LineSeries
                className="first-series"
                // data={[{ x: 1, y: 3 }, { x: 2, y: 5 }, { x: 3, y: 15 }, { x: 4, y: 12 }]}
                data={data}
                style={{
                    stroke: '#0047FF',
                    strokeLinejoin: 'round',
                    strokeWidth: 4
                }}
            />
        </XYPlot>
    );
};

export default Visualizer;
