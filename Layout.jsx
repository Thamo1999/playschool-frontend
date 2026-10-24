import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import "../styles/Layout.css";

export default function Layout({ title, subtitle, children }) {
  return (
    <div className="layout">
      <Sidebar />
      <div className="layout-main">
        <Topbar title={title} subtitle={subtitle} />
        <div className="layout-content">{children}</div>
      </div>
    </div>
  );
}
