import React from "react";
import "./navbar.css";

const Navbar = ({ onSelect, currentSection }) => {
  return (
    <nav>
      <ul>
        <li
          className={currentSection === "Metrics" ? "active" : ""}
          onClick={() => onSelect("Metrics")}
        >
          Metrics
        </li>
        <li
          className={currentSection === "VariableAnalisis" ? "active" : ""}
          onClick={() => onSelect("VariableAnalisis")}
        >
          Variable Analisis
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
