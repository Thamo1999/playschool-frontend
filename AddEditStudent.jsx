import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../Components/Layout";
import Avatar from "../components/Avatar";
import { useStudents } from "../data/StudentContext";
import { classOptions, sectionOptions } from "../data/mockData";
import "../styles/AddEditStudent.css";

const emptyForm = {
  photo: "",
  name: "",
  dob: "",
  gender: "Male",
  class: "LKG",
  section: "A",
  status: "Active",
  admissionDate: new Date().toISOString().slice(0, 10),
  fatherName: "",
  motherName: "",
  mobile: "",
  altMobile: "",
  address: "",
  bloodGroup: "",
  allergies: "None",
  emergencyContact: "",
};

export default function AddEditStudent() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { getStudentById, addStudent, updateStudent } = useStudents();
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (isEdit) {
      const existing = getStudentById(id);
      if (existing) setForm(existing);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setForm((prev) => ({ ...prev, photo: URL.createObjectURL(file) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      alert("Please enter the student name.");
      return;
    }
    if (isEdit) updateStudent(Number(id), form);
    else addStudent(form);
    navigate("/students");
  };

  return (
    <Layout
      title={isEdit ? "Edit Student" : "Add Student"}
      subtitle="Enter student details"
    >
      <form className="card student-form" onSubmit={handleSubmit}>
        <div className="form-columns">
          <div className="form-photo-block">
            <p className="form-block-title">Student Photo</p>
            <Avatar src={form.photo} name={form.name || "Student"} size={110} />
            <label className="btn btn-outline photo-upload-btn">
              Change Photo
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handlePhotoChange}
              />
            </label>
          </div>

          <div className="form-section">
            <p className="form-block-title">Basic Details</p>
            <div className="form-grid">
              <label>
                Student Name *
                <input
                  type="text"
                  value={form.name}
                  onChange={handleChange("name")}
                  required
                />
              </label>
              <label>
                Date of Birth *
                <input
                  type="date"
                  value={form.dob}
                  onChange={handleChange("dob")}
                  required
                />
              </label>
              <label>
                Gender
                <select value={form.gender} onChange={handleChange("gender")}>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </label>
              <label>
                Class *
                <select
                  value={form.class}
                  onChange={handleChange("class")}
                  required
                >
                  {classOptions.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </label>
              <label>
                Section *
                <select
                  value={form.section}
                  onChange={handleChange("section")}
                  required
                >
                  {sectionOptions.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </label>
              <label>
                Admission No.
                <input
                  type="text"
                  value={form.admissionNo || "Auto-generated"}
                  disabled
                />
              </label>
            </div>
          </div>
        </div>

        <div className="form-columns">
          <div className="form-section">
            <p className="form-block-title">Parent / Guardian Details</p>
            <div className="form-grid">
              <label>
                Father Name *
                <input
                  type="text"
                  value={form.fatherName}
                  onChange={handleChange("fatherName")}
                  required
                />
              </label>
              <label>
                Mother Name
                <input
                  type="text"
                  value={form.motherName}
                  onChange={handleChange("motherName")}
                />
              </label>
              <label>
                Mobile No. *
                <input
                  type="tel"
                  value={form.mobile}
                  onChange={handleChange("mobile")}
                  required
                />
              </label>
              <label>
                Alternate No.
                <input
                  type="tel"
                  value={form.altMobile}
                  onChange={handleChange("altMobile")}
                />
              </label>
              <label className="full-width">
                Address
                <textarea
                  rows={2}
                  value={form.address}
                  onChange={handleChange("address")}
                />
              </label>
            </div>
          </div>

          <div className="form-section">
            <p className="form-block-title">Medical / Emergency (if any)</p>
            <div className="form-grid">
              <label>
                Blood Group
                <select
                  value={form.bloodGroup}
                  onChange={handleChange("bloodGroup")}
                >
                  <option value="">O+</option>
                  <option>O+</option>
                  <option>O-</option>
                  <option>A+</option>
                  <option>A-</option>
                  <option>B+</option>
                  <option>B-</option>
                  <option>AB+</option>
                  <option>AB-</option>
                </select>
              </label>
              <label>
                Allergies (if any)
                <input
                  type="text"
                  value={form.allergies}
                  onChange={handleChange("allergies")}
                />
              </label>
              <label className="full-width">
                Emergency Contact Name
                <input
                  type="text"
                  value={form.emergencyContact}
                  onChange={handleChange("emergencyContact")}
                />
              </label>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => navigate("/students")}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </div>
      </form>
    </Layout>
  );
}
