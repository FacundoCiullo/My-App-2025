// src/components/items/MobileFiltersBar.jsx


import { GoGear } from "react-icons/go";
import "./style/mobilefiltersbar.css";

const MobileFiltersBar = ({ onOpenFilters }) => {
  return (
    <div className="mobile-navbar">
      <button className="btn-no-style" onClick={onOpenFilters}>
        <span className="mobile-title"><GoGear /></span>
      </button>
      <span className="mobile-title"> </span>
    </div>
  );
};

export default MobileFiltersBar;