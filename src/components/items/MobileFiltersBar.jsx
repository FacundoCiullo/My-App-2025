// src/components/items/MobileFiltersBar.jsx



import "./style/mobileNavbar.css";

const MobileFiltersBar = ({ onOpenFilters }) => {
  return (
    <div className="mobile-navbar">
      <button className="btn-no-style" onClick={onOpenFilters}>
        <span className="mobile-title">Filtros</span>
      </button>
      <span className="mobile-title"> </span>
    </div>
  );
};

export default MobileFiltersBar;