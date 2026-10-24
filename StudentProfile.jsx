import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdEdit, MdPrint } from "react-icons/md";
import Layout from "../Components/Layout";
import Avatar from "../components/Avatar";
import StatusBadge from "../components/StatusBadge";
import { useStudents } from "../data/StudentContext";
import "../styles/StudentProfile.css";

const TABS = [
  "Parent Details",
  "Medical Info",
  "Fee Details",
  "Attendance",
  "Notes",
];

export default function StudentProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getStudentById } = useStudents();
  const [activeTab, setActiveTab] = useState("Parent Details");
  const student = getStudentById(id);

  if (!student) {
    return (
      <Layout title="Student Profile">
        <div className="card">
          <p>Student not found.</p>
        </div>
      </Layout>
    );
  }

  const age = calculateAge(student.dob);

  return (
    <Layout title="Student Profile">
      <div className="card profile-card">
        <div className="profile-top">
          <Avatar src={student.photo} name={student.name} size={90} />
          <div className="profile-top-info">
            <h2>
              {student.name} <StatusBadge status={student.status} />
            </h2>
            <p>Admission No: {student.admissionNo}</p>
            <p>
              Class: {student.class} - {student.section}
            </p>
            <p>
              Date of Birth: {formatDate(student.dob)} ({age})
            </p>
            <p>Gender: {student.gender}</p>
          </div>
          <div className="profile-top-actions">
            <button
              className="btn btn-primary"
              onClick={() => navigate(`/students/edit/${student.id}`)}
            >
              <MdEdit /> Edit
            </button>
            <button className="btn btn-outline" onClick={() => window.print()}>
              <MdPrint /> Print
            </button>
          </div>
        </div>

        <div className="profile-tabs">
          {TABS.map((tab) => (
            <button
              key={tab}
              className={"profile-tab" + (activeTab === tab ? " active" : "")}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="profile-tab-content">
          {activeTab === "Parent Details" && (
            <div className="detail-grid">
              <Detail label="Father Name" value={student.fatherName} />
              <Detail label="Mother Name" value={student.motherName} />
              <Detail label="Mobile No." value={student.mobile} />
              <Detail label="Alternate No." value={student.altMobile} />
              <Detail label="Address" value={student.address} full />
            </div>
          )}
          {activeTab === "Medical Info" && (
            <div className="detail-grid">
              <Detail label="Blood Group" value={student.bloodGroup} />
              <Detail label="Allergies" value={student.allergies} />
              <Detail
                label="Emergency Contact"
                value={student.emergencyContact}
                full
              />
            </div>
          )}
          {activeTab === "Fee Details" && (
            <div className="detail-grid">
              <Detail label="Total Fee" value="₹ 36,000" />
              <Detail label="Paid" value="₹ 12,000" />
              <Detail label="Due" value="₹ 24,000" />
            </div>
          )}
          {activeTab === "Attendance" && (
            <div className="detail-grid">
              <Detail label="This Month" value="18 / 20 Present" />
              <Detail label="Overall %" value="90%" />
            </div>
          )}
          {activeTab === "Notes" && (
            <div className="detail-grid">
              <Detail label="Notes" value="No notes added yet." full />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

function Detail({ label, value, full }) {
  return (
    <div className={"detail-item" + (full ? " full-width" : "")}>
      <p className="detail-label">{label}</p>
      <p className="detail-value">{value || "-"}</p>
    </div>
  );
}

function formatDate(iso) {
  if (!iso) return "-";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function calculateAge(iso) {
  if (!iso) return "";
  const dob = new Date(iso);
  const diff = Date.now() - dob.getTime();
  const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
  const months = Math.floor((diff / (1000 * 60 * 60 * 24 * 30.44)) % 12);
  return `${years} Years ${months} Months`;
}
