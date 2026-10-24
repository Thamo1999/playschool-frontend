import React from "react";
import "../styles/ClassBarChart.css";

export default function ClassBarChart({ data }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="bar-chart">
      <div className="bar-chart-bars">
        {data.map((d) => (
          <div className="bar-chart-col" key={d.label}>
            <span className="bar-chart-value">{d.value}</span>
            <div
              className="bar-chart-bar"
              style={{
                height: `${(d.value / max) * 100}%`,
                background: d.color,
              }}
            />
            <span className="bar-chart-label">{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
