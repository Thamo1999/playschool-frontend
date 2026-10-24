import React from "react";
import { MdGroups, MdBoy, MdGirl, MdAutoAwesome } from "react-icons/md";
import "../styles/StatCard.css";

const iconMap = {
  students: <MdGroups />,
  boy: <MdBoy />,
  girl: <MdGirl />,
  new: <MdAutoAwesome />,
};

export default function StatCard({ label, value, icon, color }) {
  return (
    <div className="stat-card">
      <div className="stat-icon" style={{ background: `${color}22`, color }}>
        {iconMap[icon]}
      </div>
      <div>
        <p className="stat-value">{value}</p>
        <p className="stat-label">{label}</p>
      </div>
    </div>
  );
}
