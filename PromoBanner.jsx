import React from "react";
import { MdRocketLaunch } from "react-icons/md";
import "../styles/PromoBanner.css";

export default function PromoBanner() {
  return (
    <div className="promo-banner">
      <div className="promo-icon">
        <MdRocketLaunch size={26} />
      </div>
      <p>
        We can develop this Play School Student Data Maintenance Application at
        a <strong>minimum cost.</strong>
      </p>
    </div>
  );
}
