import React, { useState } from "react";
import Layout from "../Components/Layout";
import { classOptions, feeSummary, paymentHistory } from "../data/mockData";
import "../styles/Fees.css";

export default function Fees() {
  const [selectedClass, setSelectedClass] = useState("LKG");

  return (
    <Layout title="Fees Details" subtitle="View and manage fee payments">
      <div className="fees-header">
        <label className="class-select">
          Select Class
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            {classOptions.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
      </div>

      <section className="fee-summary-grid">
        <div className="fee-summary-card total">
          <p className="fee-summary-label">Total Fee</p>
          <p className="fee-summary-value">
            ₹ {feeSummary.total.toLocaleString("en-IN")}
          </p>
        </div>
        <div className="fee-summary-card paid">
          <p className="fee-summary-label">Paid</p>
          <p className="fee-summary-value">
            ₹ {feeSummary.paid.toLocaleString("en-IN")}
          </p>
        </div>
        <div className="fee-summary-card due">
          <p className="fee-summary-label">Due</p>
          <p className="fee-summary-value">
            ₹ {feeSummary.due.toLocaleString("en-IN")}
          </p>
        </div>
      </section>

      <div className="card">
        <h3 className="card-title">Payment History</h3>
        <table className="simple-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Payment Mode</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {paymentHistory.map((p) => (
              <tr key={p.id}>
                <td>{p.date}</td>
                <td>{p.description}</td>
                <td>₹ {p.amount.toLocaleString("en-IN")}</td>
                <td>{p.mode}</td>
                <td>
                  <span
                    className={"status-badge status-" + p.status.toLowerCase()}
                  >
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
