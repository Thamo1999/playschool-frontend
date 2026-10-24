import React, { useState } from "react";
import { MdCheckCircle } from "react-icons/md";
import Layout from "../Components/Layout";
import PromoBanner from "../components/PromoBanner";
import "../styles/Reports.css";
import "../styles/Settings.css";

const keyFeatures = [
  "Student Registration & Profile Management",
  "Parent / Guardian Details",
  "Class & Section Management",
  "Attendance Tracking",
  "Fee Collection & Payment History",
  "Reports (Student, Attendance, Fee, etc.)",
  "Easy Search, Edit & Delete",
  "Secure Login & Data Protection",
];

export default function Settings() {
  const [schoolName, setSchoolName] = useState("Little Stars Play School");
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <Layout title="Settings" subtitle="Manage application preferences">
      <div className="settings-layout">
        <form className="card settings-form" onSubmit={handleSave}>
          <h3 className="card-title">School Details</h3>
          <label>
            School Name
            <input
              type="text"
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
            />
          </label>
          <label>
            Tagline
            <input type="text" defaultValue="Simple | Secure | Smart" />
          </label>
          <label>
            Contact Email
            <input type="email" defaultValue="admin@littlestars.school" />
          </label>
          <button type="submit" className="btn btn-primary">
            Save Changes
          </button>
          {saved && (
            <p className="settings-saved">Settings saved successfully!</p>
          )}
        </form>

        <div className="card key-features-card">
          <h3 className="card-title">Key Features</h3>
          <ul className="key-features-list">
            {keyFeatures.map((f) => (
              <li key={f}>
                <MdCheckCircle className="feature-check" /> {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <PromoBanner />
    </Layout>
  );
}

