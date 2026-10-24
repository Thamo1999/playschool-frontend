import React from "react";
import "../styles/StatusBadge.css";

export default function StatusBadge({ status }) {
  const normalized = status.toLowerCase();
  return <span className={`status-badge status-${normalized}`}>{status}</span>;
}
