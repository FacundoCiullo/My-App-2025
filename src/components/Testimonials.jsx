// src/components/Testimonials.jsx
import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "María López",
    text: "Excelente calidad y envío súper rápido. Volveré a comprar sin dudas.",
    location: "Buenos Aires",
    rating: 5,
  },
  {
    name: "Juan Pérez",
    text: "Buena atención y el producto llegó tal cual se veía en la web.",
    location: "Córdoba",
    rating: 4,
  },
  {
    name: "Lucía Gómez",
    text: "Gran experiencia de compra. Muy recomendable.",
    location: "Rosario",
    rating: 5,
  },
];

const Star = ({ filled }) => (
  <span style={{ color: filled ? "#f5c518" : "#ddd", marginRight: 2 }}>★</span>
);

const Testimonials = () => {
  return (
    <section className="testimonials-section container my-5">
      <motion.h2
        className="text-center mb-4 fw-bold"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Qué dicen nuestros clientes
      </motion.h2>

      <div className="row gy-3">
        {testimonials.map((t, i) => (
          <motion.div
            className="col-md-4"
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
          >
            <div className="p-3 bg-white rounded-4 shadow-sm h-100 testimonial-card">
              <div className="d-flex align-items-center mb-2">
                <div
                  className="avatar rounded-circle me-3"
                  style={{
                    width: 48,
                    height: 48,
                    backgroundColor: "#e9ecef",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    color: "#495057",
                  }}
                >
                  {t.name.split(" ").map(n => n[0]).slice(0,2).join("")}
                </div>
                <div>
                  <div className="fw-bold">{t.name}</div>
                  <div className="text-muted small">{t.location}</div>
                </div>
              </div>

              <p className="text-muted mb-2" style={{ minHeight: "64px" }}>
                “{t.text}”
              </p>

              <div>
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} filled={idx < t.rating} />
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;