import React, { useMemo, useState } from "react";
import { MdAdd, MdSearch, MdEdit, MdDeleteOutline } from "react-icons/md";
import Layout from "../Components/Layout";
import Avatar from "../components/Avatar";
import { initialParents } from "../data/mockData";
import "../styles/Students.css";

export default function Parents() {
  const [parents, setParents] = useState(initialParents);
  const [search, setSearch] = useState("");

  const filtered = useMemo(
    () =>
      parents.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.mobile.includes(search),
      ),
    [parents, search],
  );

  const handleDelete = (id, name) => {
    if (window.confirm(`Remove ${name} from parent records?`))
      setParents((prev) => prev.filter((p) => p.id !== id));
  };

  const handleAdd = () => {
    const name = window.prompt("Parent name?");
    if (!name) return;
    const mobile = window.prompt("Mobile number?") || "";
    const relation =
      window.prompt("Relation (Father/Mother/Guardian)?") || "Guardian";
    setParents((prev) => [
      ...prev,
      {
        id: prev.length ? Math.max(...prev.map((p) => p.id)) + 1 : 1,
        name,
        mobile,
        relation,
        photo: "",
      },
    ]);
  };

  return (
    <Layout title="Parents" subtitle="Manage parent / guardian details">
      <div className="card students-card">
        <div className="students-toolbar">
          <div className="search-box">
            <MdSearch />
            <input
              type="text"
              placeholder="Search by name or mobile no..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="btn btn-primary" onClick={handleAdd}>
            <MdAdd /> Add Parent
          </button>
        </div>
        <table className="simple-table students-table">
          <thead>
            <tr>
              <th>Photo</th>
              <th>Parent Name</th>
              <th>Mobile No.</th>
              <th>Relation</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id}>
                <td>
                  <Avatar src={p.photo} name={p.name} size={36} />
                </td>
                <td>{p.name}</td>
                <td>{p.mobile}</td>
                <td>{p.relation}</td>
                <td className="action-cell">
                  <button
                    className="icon-btn edit"
                    aria-label={`Edit ${p.name}`}
                  >
                    <MdEdit />
                  </button>
                  <button
                    className="icon-btn delete"
                    aria-label={`Delete ${p.name}`}
                    onClick={() => handleDelete(p.id, p.name)}
                  >
                    <MdDeleteOutline />
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="empty-row">
                  No parents found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
