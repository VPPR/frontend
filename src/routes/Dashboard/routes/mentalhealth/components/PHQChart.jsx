import React from "react";
import { ResponsiveLine } from "@nivo/line";
import data from "../data.json";

function Chart(props) {
    return (
        <div>
            <ResponsiveLine
                data={data}
                xScale={{ type: "linear" }}
                yScale={{ type: "linear", min: 0, max: 27 }}
                axisBottom={{
                    orient: "bottom",
                    tickSize: 5,
                    tickPadding: 0,
                }}
                axisLeft={{
                    orient: "left",
                    tickSize: 5,
                    tickPadding: 0,
                    tickRotation: 0,
                }}
            />
        </div>
    );
}

export default Chart;
