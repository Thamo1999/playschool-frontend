import React from "react";
import { MdNotificationsNone, MdKeyboardArrowDown } from "react-icons/md";
import "../styles/Topbar.css";

export default function Topbar({ title, subtitle }) {
  return (
    <header className="topbar">
      <div>
        <h1 className="topbar-title">{title}</h1>
        {subtitle && <p className="topbar-subtitle">{subtitle}</p>}
      </div>
      <div className="topbar-right">
        <button className="topbar-bell" aria-label="Notifications">
          <MdNotificationsNone size={22} />
        </button>
        <div className="topbar-admin">
          <div className="topbar-avatar">A</div>
          <span>Admin</span>
          <MdKeyboardArrowDown />
        </div>
      </div>
    </header>
  );
}
