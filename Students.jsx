import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdAdd, MdSearch, MdEdit, MdDeleteOutline } from "react-icons/md";
import Layout from "../Components/Layout";
import Avatar from "../components/Avatar";
import StatusBadge from "../components/StatusBadge";
import { useStudents } from "../data/StudentContext";
import { classOptions, sectionOptions } from "../data/mockData";
import "../styles/Students.css";

const PAGE_SIZE = 5;

export default function Students() {
  const { students, deleteStudent } = useStudents();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("All Classes");
  const [sectionFilter, setSectionFilter] = useState("All Sections");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return students.filter((s) => {
      const matchesSearch =
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.admissionNo.toLowerCase().includes(search.toLowerCase());
      const matchesClass =
        classFilter === "All Classes" || s.class === classFilter;
      const matchesSection =
        sectionFilter === "All Sections" || s.section === sectionFilter;
      return matchesSearch && matchesClass && matchesSection;
    });
  }, [students, search, classFilter, sectionFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleDelete = (id, name) => {
    if (window.confirm(`Remove ${name} from the student list?`))
      deleteStudent(id);
  };

  return (
    <Layout title="Students" subtitle="Manage student records">
      <div className="card students-card">
        <div className="students-toolbar">
          <div className="search-box">
            <MdSearch />
            <input
              type="text"
              placeholder="Search by name or admission no..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>
          <select
            value={classFilter}
            onChange={(e) => {
              setClassFilter(e.target.value);
              setPage(1);
            }}
          >
            <option>All Classes</option>
            {classOptions.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <select
            value={sectionFilter}
            onChange={(e) => {
              setSectionFilter(e.target.value);
              setPage(1);
            }}
          >
            <option>All Sections</option>
            {sectionOptions.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/students/add")}
          >
            <MdAdd /> Add Student
          </button>
        </div>

        <table className="simple-table students-table">
          <thead>
            <tr>
              <th>Photo</th>
              <th>Name</th>
              <th>Admission No.</th>
              <th>Class</th>
              <th>Section</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map((s) => (
              <tr key={s.id}>
                <td>
                  <Avatar src={s.photo} name={s.name} size={36} />
                </td>
                <td>
                  <span
                    className="student-link"
                    onClick={() => navigate(`/students/${s.id}`)}
                  >
                    {s.name}
                  </span>
                </td>
                <td>{s.admissionNo}</td>
                <td>{s.class}</td>
                <td>{s.section}</td>
                <td>
                  <StatusBadge status={s.status} />
                </td>
                <td className="action-cell">
                  <button
                    className="icon-btn edit"
                    aria-label={`Edit ${s.name}`}
                    onClick={() => navigate(`/students/edit/${s.id}`)}
                  >
                    <MdEdit />
                  </button>
                  <button
                    className="icon-btn delete"
                    aria-label={`Delete ${s.name}`}
                    onClick={() => handleDelete(s.id, s.name)}
                  >
                    <MdDeleteOutline />
                  </button>
                </td>
              </tr>
            ))}
            {pageItems.length === 0 && (
              <tr>
                <td colSpan={7} className="empty-row">
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="students-footer">
          <span>Total Records: {filtered.length}</span>
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                className={"page-btn" + (n === page ? " active" : "")}
                onClick={() => setPage(n)}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
