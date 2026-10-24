import React from "react";
import Layout from "../Components/Layout";
import StatCard from "../Components/StatCard";
import ClassBarChart from "../components/ClassBarChart";
import Avatar from "../components/Avatar";
import { useStudents } from "../data/StudentContext";
import { dashboardStats, classWiseCount } from "../data/mockData";
import "../styles/Dashboard.css";

export default function Dashboard() {
  const { students } = useStudents();
  const recentAdmissions = [...students]
    .sort((a, b) => new Date(b.admissionDate) - new Date(a.admissionDate))
    .slice(0, 5);

  return (
    <Layout
      title="Good Morning, Admin!"
      subtitle="Here's what's happening at Little Stars Play School"
    >
      <section className="stats-grid">
        {dashboardStats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </section>

      <section className="dashboard-lower">
        <div className="card class-wise-card">
          <h3 className="card-title">Class Wise Students</h3>
          <ClassBarChart data={classWiseCount} />
        </div>

        <div className="card recent-admissions-card">
          <h3 className="card-title">Recent Admissions</h3>
          <table className="simple-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Class</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentAdmissions.map((s) => (
                <tr key={s.id}>
                  <td className="name-cell">
                    <Avatar src={s.photo} name={s.name} size={30} />
                    {s.name}
                  </td>
                  <td>{s.class}</td>
                  <td>{formatDate(s.admissionDate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </Layout>
  );
}

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
