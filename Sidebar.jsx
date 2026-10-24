import React from "react";
import { NavLink } from "react-router-dom";
import {
  MdDashboard,
  MdOutlineChildCare,
  MdFamilyRestroom,
  MdEventAvailable,
  MdAttachMoney,
  MdInsertChart,
  MdSettings,
} from "react-icons/md";
import "../styles/Sidebar.css";

const navItems = [
  { to: "/", label: "Dashboard", icon: <MdDashboard /> },
  { to: "/students", label: "Students", icon: <MdOutlineChildCare /> },
  { to: "/parents", label: "Parents", icon: <MdFamilyRestroom /> },
  { to: "/attendance", label: "Attendance", icon: <MdEventAvailable /> },
  { to: "/fees", label: "Fees", icon: <MdAttachMoney /> },
  { to: "/reports", label: "Reports", icon: <MdInsertChart /> },
  { to: "/settings", label: "Settings", icon: <MdSettings /> },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span className="sidebar-logo-emoji" role="img" aria-label="sun">
          🌞
        </span>
        <div>
          <p className="sidebar-logo-title">Little Stars</p>
          <p className="sidebar-logo-subtitle">Play School</p>
        </div>
      </div>
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) =>
              "sidebar-link" + (isActive ? " active" : "")
            }
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-footer">
        <span role="img" aria-label="kids">
          🧒👧
        </span>
        <p>
          Small Steps <br /> Big Dreams <span className="heart">💙</span>
        </p>
      </div>
    </aside>
  );
}
