import React from "react";
import './style/layout.css';

const socialLinks = [
  { href: "https://www.instagram.com", icon: "bi-instagram", label: "Instagram" },
  { href: "https://www.facebook.com", icon: "bi-facebook", label: "Facebook" },
  { href: "https://www.whatsapp.com", icon: "bi-whatsapp", label: "WhatsApp" },
];

const SocialBar = ({ inline = true }) => {
  return (
    <div className={inline ? "social-inline d-flex gap-3 align-items-center" : "social-circle-wrapper"}>
      {socialLinks.map((s, i) => (
        <a
          key={i}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label}
          className={inline ? "social-icon" : "social-btn-circle"}
        >
          <i className={`bi ${s.icon} ${inline ? "fs-4" : ""}`}></i>
        </a>
      ))}
    </div>
  );
};

export default SocialBar;
