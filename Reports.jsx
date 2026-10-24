import React from "react";
import {
  MdList,
  MdEventAvailable,
  MdAttachMoney,
  MdClass,
  MdCake,
  MdAssignmentInd,
} from "react-icons/md";
import Layout from "../Components/Layout";
import PromoBanner from "../components/PromoBanner";
import { reports } from "../data/mockData";
import "../styles/Reports.css";

const iconMap = {
  list: <MdList />,
  attendance: <MdEventAvailable />,
  fee: <MdAttachMoney />,
  class: <MdClass />,
  birthday: <MdCake />,
  admission: <MdAssignmentInd />,
};

export default function Reports() {
  return (
    <Layout title="Reports" subtitle="View and download reports">
      <div className="reports-grid">
        {reports.map((r) => (
          <button
            key={r.id}
            className="report-card"
            onClick={() => alert(`Generating "${r.title}" report...`)}
          >
            <div
              className="report-icon"
              style={{ background: `${r.color}22`, color: r.color }}
            >
              {iconMap[r.icon]}
            </div>
            <div>
              <p className="report-title">{r.title}</p>
              <p className="report-subtitle">{r.subtitle}</p>
            </div>
          </button>
        ))}
      </div>
      <PromoBanner />
    </Layout>
  );
}
