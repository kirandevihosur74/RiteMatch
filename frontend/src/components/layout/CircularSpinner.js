// src/components/CircularSpinner.js
import React from "react";
import "./CircularSpinner.css";

const CircularSpinner = ({ size = 100 }) => {
  return (
    <div
      className="sk-chase"
      style={{ width: size, height: size }}
    >
      {[...Array(6)].map((_, i) => (
        <div key={i} className="sk-chase-dot" />
      ))}
    </div>
  );
};

export default CircularSpinner;