import React, { useState } from "react";
import "../styles/Avatar.css";

export default function Avatar({ src, name, size = 40 }) {
  const [errored, setErrored] = useState(false);
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "?";

  if (!src || errored) {
    return (
      <div
        className="avatar avatar-fallback"
        style={{ width: size, height: size, fontSize: size * 0.4 }}
      >
        {initials}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      className="avatar"
      style={{ width: size, height: size }}
      onError={() => setErrored(true)}
    />
  );
}
