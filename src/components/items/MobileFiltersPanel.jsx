// src/components/items/MobileFiltersPanel.jsx

import { motion, AnimatePresence } from "framer-motion";
import "./style/mobileFiltersPanel.css";



const MobileFiltersPanel = ({ show, onClose, children }) => {
  return (
    <AnimatePresence>
      {show && (
        <>
          {/* OVERLAY */}
          <motion.div
            className="mobile-filters-overlay"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          />

          {/* PANEL */}
          <motion.div
            className="mobile-filters-panel"
            initial={{ x: "-100%" }}
            animate={{ x: "00%" }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.33, ease: "easeOut" }}
          >

            
            <div className="filters-content">{children}</div>
            
          </motion.div>
          
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileFiltersPanel;
