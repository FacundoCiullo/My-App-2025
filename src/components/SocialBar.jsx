// src/components/SocialBar.jsx
import React from "react";


const socialLinks = [
  { href: "https://www.instagram.com", iconClass: "bi-instagram", label: "Instagram" },
  { href: "https://www.facebook.com", iconClass: "bi-facebook", label: "Facebook" },
  { href: "https://www.whatsapp.com", iconClass: "bi-whatsapp", label: "WhatsApp" },
];

const SocialBar = ({ inline = true }) => {
  if (inline) {
    return (
      <div className="social-bar d-flex gap-3 align-items-center">
        {socialLinks.map((s, i) => (
          <a
            key={i}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            className="text-decoration-none"
          >
            <i className={`bi ${s.iconClass} fs-4`}></i>
          </a>
        ))}
      </div>
    );
  }
  return (
    <div className="d-flex justify-content-center my-3">
      {socialLinks.map((s, i) => (
        <a
          key={i}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-light rounded-circle shadow-sm mx-1"
          style={{ width: 44, height: 44, display: "inline-flex", alignItems: "center", justifyContent: "center" }}
          aria-label={s.label}
        >
          <i className={`bi ${s.iconClass}`}></i>
        </a>
      ))}
    </div>
  );
};

export default SocialBar;


