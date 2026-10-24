import React, { useState } from "react";
import { MdCalendarToday, MdCheckCircle } from "react-icons/md";
import Layout from "../Components/Layout";
import Avatar from "../components/Avatar";
import { initialAttendance } from "../data/mockData";
import "../styles/Students.css";
import "../styles/Attendance.css";

export default function Attendance() {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [records, setRecords] = useState(initialAttendance);
  const [marking, setMarking] = useState(false);

  const toggleStatus = (id) => {
    if (!marking) return;
    setRecords((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, status: r.status === "Present" ? "Absent" : "Present" }
          : r,
      ),
    );
  };

  return (
    <Layout title="Attendance" subtitle="Mark and view student attendance">
      <div className="card students-card">
        <div className="students-toolbar">
          <div className="search-box">
            <MdCalendarToday />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <button
            className={"btn " + (marking ? "btn-success" : "btn-primary")}
            onClick={() => setMarking((m) => !m)}
          >
            <MdCheckCircle /> {marking ? "Done Marking" : "Mark Attendance"}
          </button>
        </div>

        {marking && (
          <p className="attendance-hint">
            Click a status pill below to toggle Present / Absent.
          </p>
        )}

        <table className="simple-table students-table">
          <thead>
            <tr>
              <th>Photo</th>
              <th>Name</th>
              <th>Class</th>
              <th>Section</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r) => (
              <tr key={r.id}>
                <td>
                  <Avatar src={r.photo} name={r.name} size={36} />
                </td>
                <td>{r.name}</td>
                <td>{r.class}</td>
                <td>{r.section}</td>
                <td>
                  <button
                    className={
                      "attendance-pill " +
                      (r.status === "Present" ? "present" : "absent") +
                      (marking ? " clickable" : "")
                    }
                    onClick={() => toggleStatus(r.id)}
                  >
                    <span className="dot" /> {r.status}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
