"use client";

import { useState } from "react";
import Image from "next/image";
import { Clock, Calendar, Shield } from "lucide-react";

type Tab = "one-way" | "hourly" | "round-trip";

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState<Tab>("one-way");

  const tabs: { id: Tab; label: string }[] = [
    { id: "one-way", label: "One Way" },
    { id: "hourly", label: "Hourly" },
    { id: "round-trip", label: "Round Trip" },
  ];

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "var(--bg)",
        paddingTop: "100px",
        paddingBottom: "80px",
      }}
      aria-label="Hero — private chauffeur service"
    >
      <div className="container-luxury">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.05fr) minmax(0, 1fr)",
            gap: "64px",
            alignItems: "start",
          }}
          className="hero-grid"
        >
          {/* ── Left column ── */}
          <div style={{ paddingTop: "20px" }}>
            {/* Eyebrow */}
            <div className="eyebrow mb-6">Private Chauffeur · New York</div>

            {/* Headline */}
            <h1
              className="font-display"
              style={{
                fontSize: "clamp(48px, 5.6vw, 88px)",
                fontWeight: 500,
                letterSpacing: "-0.026em",
                lineHeight: 1.0,
                maxWidth: "14ch",
                color: "var(--ink)",
                marginBottom: "40px",
              }}
            >
              A quieter way to{" "}
              <em
                style={{
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: "var(--gold)",
                }}
              >
                arrive
              </em>
              , on time.
            </h1>

            {/* Booking widget */}
            <div
              style={{
                background: "#ffffff",
                border: "1px solid var(--line)",
                borderRadius: "8px",
                boxShadow:
                  "0 4px 24px rgba(40,30,10,0.08), 0 1px 4px rgba(40,30,10,0.04)",
                padding: "24px",
                marginBottom: "28px",
              }}
            >
              {/* Tabs */}
              <div
                className="flex gap-1 mb-5"
                style={{
                  background: "var(--bg-2)",
                  borderRadius: "999px",
                  padding: "3px",
                }}
              >
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      flex: 1,
                      borderRadius: "999px",
                      padding: "8px 0",
                      fontSize: "11.5px",
                      fontWeight: 500,
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                      transition: "all 0.2s ease",
                      background:
                        activeTab === tab.id ? "var(--ink)" : "transparent",
                      color: activeTab === tab.id ? "#fff" : "var(--ink-3)",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Inputs */}
              <div className="flex flex-col gap-3">
                <div
                  style={{
                    border: "1px solid var(--line)",
                    borderRadius: "6px",
                    padding: "12px 14px",
                  }}
                >
                  <label
                    style={{
                      fontSize: "9px",
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: "var(--ink-4)",
                      display: "block",
                      marginBottom: "4px",
                      fontFamily:
                        "var(--font-jetbrains), ui-monospace, monospace",
                    }}
                    htmlFor="pickup"
                  >
                    Pickup Location
                  </label>
                  <input
                    id="pickup"
                    type="text"
                    placeholder="Enter pickup address"
                    style={{
                      width: "100%",
                      border: "none",
                      outline: "none",
                      fontSize: "14px",
                      color: "var(--ink)",
                      background: "transparent",
                    }}
                  />
                </div>

                {activeTab !== "hourly" && (
                  <div
                    style={{
                      border: "1px solid var(--line)",
                      borderRadius: "6px",
                      padding: "12px 14px",
                    }}
                  >
                    <label
                      style={{
                        fontSize: "9px",
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color: "var(--ink-4)",
                        display: "block",
                        marginBottom: "4px",
                        fontFamily:
                          "var(--font-jetbrains), ui-monospace, monospace",
                      }}
                      htmlFor="destination"
                    >
                      Destination
                    </label>
                    <input
                      id="destination"
                      type="text"
                      placeholder="Enter destination"
                      style={{
                        width: "100%",
                        border: "none",
                        outline: "none",
                        fontSize: "14px",
                        color: "var(--ink)",
                        background: "transparent",
                      }}
                    />
                  </div>
                )}

                <div className="flex gap-3">
                  <div
                    style={{
                      flex: 1,
                      border: "1px solid var(--line)",
                      borderRadius: "6px",
                      padding: "12px 14px",
                    }}
                  >
                    <label
                      style={{
                        fontSize: "9px",
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color: "var(--ink-4)",
                        display: "block",
                        marginBottom: "4px",
                        fontFamily:
                          "var(--font-jetbrains), ui-monospace, monospace",
                      }}
                      htmlFor="date"
                    >
                      Date
                    </label>
                    <input
                      id="date"
                      type="date"
                      style={{
                        width: "100%",
                        border: "none",
                        outline: "none",
                        fontSize: "14px",
                        color: "var(--ink)",
                        background: "transparent",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      flex: 1,
                      border: "1px solid var(--line)",
                      borderRadius: "6px",
                      padding: "12px 14px",
                    }}
                  >
                    <label
                      style={{
                        fontSize: "9px",
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color: "var(--ink-4)",
                        display: "block",
                        marginBottom: "4px",
                        fontFamily:
                          "var(--font-jetbrains), ui-monospace, monospace",
                      }}
                      htmlFor="time"
                    >
                      Time
                    </label>
                    <input
                      id="time"
                      type="time"
                      style={{
                        width: "100%",
                        border: "none",
                        outline: "none",
                        fontSize: "14px",
                        color: "var(--ink)",
                        background: "transparent",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* CTA button */}
              <button
                style={{
                  marginTop: "16px",
                  width: "100%",
                  background: "var(--ink)",
                  color: "#fff",
                  borderRadius: "6px",
                  padding: "15px",
                  fontSize: "13px",
                  fontWeight: 500,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  border: "none",
                  cursor: "pointer",
                  transition: "background 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "var(--gold)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "var(--ink)";
                }}
              >
                Get my prices →
              </button>
            </div>

            {/* Trust line */}
            <div
              className="flex items-center gap-3 flex-wrap"
              style={{ fontSize: "13px", color: "var(--ink-3)" }}
            >
              <span style={{ color: "var(--gold)", letterSpacing: "2px" }}>
                ★★★★★
              </span>
              <span style={{ fontWeight: 600, color: "var(--ink)" }}>4.97</span>
              <span style={{ color: "var(--line-2)" }}>·</span>
              <span>500+ reviews</span>
              <span style={{ color: "var(--line-2)" }}>·</span>
              <span>New York City</span>
              <span style={{ color: "var(--line-2)" }}>·</span>
              <span>24/7</span>
            </div>
          </div>

          {/* ── Right column — hero image ── */}
          <div
            className="hero-image"
            style={{ position: "relative", minHeight: "540px" }}
          >
            {/* Main frame */}
            <div
              className="frame"
              style={{
                borderRadius: "8px",
                overflow: "hidden",
                background: "var(--bg-3)",
                boxShadow: "0 50px 80px -50px rgba(40,30,10,0.35)",
                aspectRatio: "4/5",
                position: "relative",
              }}
            >
              <Image
                src="/images/heromain.webp"
                alt="KL Executive chauffeur opening door for a client"
                fill
                loading="lazy"
                quality={75}
                className="object-cover animate-heroPan"
                sizes="(max-width: 900px) 0vw, 600px"
              />
              {/* Bottom gradient overlay */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(20,18,12,0.25) 0%, transparent 50%)",
                  pointerEvents: "none",
                }}
              />
            </div>

            {/* Pill TL — Perfectly Timed */}
            <div
              className="pill tl animate-floatY"
              style={{
                position: "absolute",
                top: "36px",
                left: "-28px",
                background: "rgba(255,255,255,0.92)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.7)",
                borderRadius: "14px",
                padding: "12px 16px",
                boxShadow: "0 8px 32px rgba(40,30,10,0.12)",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                minWidth: "180px",
                animationDelay: "0s",
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  background: "rgba(168,138,79,0.12)",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Clock size={18} style={{ color: "var(--gold)" }} />
              </div>
              <div>
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "var(--ink)",
                    lineHeight: 1.2,
                  }}
                >
                  Perfectly Timed
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "var(--ink-3)",
                    marginTop: "2px",
                  }}
                >
                  Right on schedule
                </div>
              </div>
            </div>

            {/* Pill BR — Plan Ahead */}
            <div
              className="pill br animate-floatY"
              style={{
                position: "absolute",
                bottom: "110px",
                right: "-36px",
                background: "rgba(255,255,255,0.92)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.7)",
                borderRadius: "14px",
                padding: "12px 16px",
                boxShadow: "0 8px 32px rgba(40,30,10,0.12)",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                minWidth: "170px",
                animationDelay: "-3s",
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  background: "rgba(168,138,79,0.12)",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Calendar size={18} style={{ color: "var(--gold)" }} />
              </div>
              <div>
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "var(--ink)",
                    lineHeight: 1.2,
                  }}
                >
                  Plan Ahead
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "var(--ink-3)",
                    marginTop: "2px",
                  }}
                >
                  Book in advance
                </div>
              </div>
            </div>

            {/* Pill BL dark — NDA Chauffeurs */}
            <div
              className="pill bl animate-floatY"
              style={{
                position: "absolute",
                bottom: "36px",
                left: "-22px",
                background: "var(--ink)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "14px",
                padding: "12px 16px",
                boxShadow: "0 8px 32px rgba(40,30,10,0.22)",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                minWidth: "170px",
                animationDelay: "-1.5s",
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  background: "rgba(168,138,79,0.18)",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Shield size={18} style={{ color: "var(--gold)" }} />
              </div>
              <div>
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#fff",
                    lineHeight: 1.2,
                  }}
                >
                  NDA Chauffeurs
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "rgba(255,255,255,0.6)",
                    marginTop: "2px",
                  }}
                >
                  Total discretion
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive: stack on mobile */}
      <style>{`
        .hero-grid {
          grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr);
          gap: 64px;
        }
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          .hero-image { display: none; }
        }
      `}</style>
    </section>
  );
}
