"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Clock, Calendar, Shield } from "lucide-react";
import type { Place, RouteSummary } from "@/components/map/BookingMapEnhancer";

const SINGLE_PAGE = process.env.NEXT_PUBLIC_SINGLE_PAGE === "true";

type Tab = "one-way" | "hourly" | "round-trip";

const BookingMapEnhancer = dynamic(
  () => import("@/components/map/BookingMapEnhancer"),
  { ssr: false, loading: () => null }
);

const BrandDatePicker = dynamic(
  () => import("@/components/booking/BrandDatePicker"),
  { ssr: false }
);

const BrandTimePicker = dynamic(
  () => import("@/components/booking/BrandTimePicker"),
  { ssr: false }
);

export default function HeroSection() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("one-way");
  const [mapEnabled, setMapEnabled] = useState(false);
  const [pickup, setPickup] = useState<Place | null>(null);
  const [destination, setDestination] = useState<Place | null>(null);
  const [route, setRoute] = useState<RouteSummary | null>(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [submitError, setSubmitError] = useState<string | null>(null);
  // Single-page mode fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const pickupRef = useRef<HTMLInputElement>(null);
  const destRef = useRef<HTMLInputElement>(null);
  const enableMap = () => setMapEnabled(true);

  const today = new Date();

  async function handleBookNow() {
    setSubmitError(null);
    if (!firstName.trim() || !lastName.trim()) {
      setSubmitError("Please enter your first and last name.");
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setSubmitError("Please enter a valid email address.");
      return;
    }
    if (!phone.trim()) {
      setSubmitError("Please enter your telephone number.");
      return;
    }
    if (!pickup) {
      setSubmitError("Please enter a pickup location.");
      return;
    }
    if (activeTab !== "hourly" && !destination) {
      setSubmitError("Please enter a destination.");
      return;
    }
    if (!date || !time) {
      setSubmitError("Please select a date and time.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          pickup: pickup.address,
          destination: destination?.address ?? "",
          date,
          time,
          serviceType: activeTab,
          miles: route?.miles.toFixed(2) ?? "",
          minutes: route ? String(route.minutes) : "",
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Unknown error");
      setSubmitSuccess(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleGetPrices() {
    setSubmitError(null);
    if (!pickup || !destination) {
      setSubmitError("Please pick both an origin and a destination.");
      return;
    }
    if (!date || !time) {
      setSubmitError("Please pick a date and time.");
      return;
    }
    if (!route) {
      setSubmitError(
        "Calculating route — give it a second after picking both addresses.",
      );
      return;
    }
    const pickupAt = new Date(`${date}T${time}:00`);
    if (Number.isNaN(pickupAt.getTime())) {
      setSubmitError("Invalid date or time.");
      return;
    }

    const params = new URLSearchParams({
      pickup: pickup.address,
      destination: destination.address,
      pickupAt: pickupAt.toISOString(),
      miles: route.miles.toFixed(2),
      minutes: String(route.minutes),
      serviceType: activeTab,
    });
    router.push(`/quote?${params.toString()}`);
  }

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
            alignItems: "center",
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
              {submitSuccess ? (
                <div
                  style={{
                    padding: "32px 16px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      background: "rgba(168,138,79,0.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 16px",
                      fontSize: "22px",
                    }}
                  >
                    ✓
                  </div>
                  <p
                    style={{
                      fontSize: "15px",
                      fontWeight: 600,
                      color: "var(--ink)",
                      marginBottom: "6px",
                    }}
                  >
                    Request received
                  </p>
                  <p style={{ fontSize: "13px", color: "var(--ink-3)" }}>
                    We&apos;ll be in touch shortly to confirm your booking.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {SINGLE_PAGE && (
                    <div className="flex gap-3">
                      {[
                        { id: "firstName", label: "First Name", value: firstName, onChange: setFirstName, placeholder: "First name" },
                        { id: "lastName", label: "Last Name", value: lastName, onChange: setLastName, placeholder: "Last name" },
                      ].map((f) => (
                        <div
                          key={f.id}
                          style={{
                            flex: 1,
                            border: "1px solid var(--line)",
                            borderRadius: "6px",
                            padding: "12px 14px",
                          }}
                        >
                          <label
                            htmlFor={f.id}
                            style={{
                              fontSize: "9px",
                              letterSpacing: "0.16em",
                              textTransform: "uppercase",
                              color: "var(--ink-4)",
                              display: "block",
                              marginBottom: "4px",
                              fontFamily: "var(--font-jetbrains), ui-monospace, monospace",
                            }}
                          >
                            {f.label}
                          </label>
                          <input
                            id={f.id}
                            type="text"
                            placeholder={f.placeholder}
                            value={f.value}
                            onChange={(e) => f.onChange(e.target.value)}
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
                      ))}
                    </div>
                  )}

                  {SINGLE_PAGE && (
                    <div className="flex gap-3">
                      {[
                        { id: "email", label: "Email", type: "email", value: email, onChange: setEmail, placeholder: "your@email.com" },
                        { id: "phone", label: "Telephone", type: "tel", value: phone, onChange: setPhone, placeholder: "+1 (212) 000-0000" },
                      ].map((f) => (
                        <div
                          key={f.id}
                          style={{
                            flex: 1,
                            border: "1px solid var(--line)",
                            borderRadius: "6px",
                            padding: "12px 14px",
                          }}
                        >
                          <label
                            htmlFor={f.id}
                            style={{
                              fontSize: "9px",
                              letterSpacing: "0.16em",
                              textTransform: "uppercase",
                              color: "var(--ink-4)",
                              display: "block",
                              marginBottom: "4px",
                              fontFamily: "var(--font-jetbrains), ui-monospace, monospace",
                            }}
                          >
                            {f.label}
                          </label>
                          <input
                            id={f.id}
                            type={f.type}
                            placeholder={f.placeholder}
                            value={f.value}
                            onChange={(e) => f.onChange(e.target.value)}
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
                      ))}
                    </div>
                  )}

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
                        fontFamily: "var(--font-jetbrains), ui-monospace, monospace",
                      }}
                      htmlFor="pickup"
                    >
                      Pickup Location
                    </label>
                    <input
                      ref={pickupRef}
                      id="pickup"
                      type="text"
                      placeholder="Enter pickup address"
                      autoComplete="off"
                      onFocus={enableMap}
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
                          fontFamily: "var(--font-jetbrains), ui-monospace, monospace",
                        }}
                        htmlFor="destination"
                      >
                        Destination
                      </label>
                      <input
                        ref={destRef}
                        id="destination"
                        type="text"
                        placeholder="Enter destination"
                        autoComplete="off"
                        onFocus={enableMap}
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

                  <div className="flex flex-col sm:flex-row gap-3">
                    <BrandDatePicker
                      id="date"
                      label="Date"
                      value={date}
                      onChange={setDate}
                      minDate={today}
                    />
                    <BrandTimePicker
                      id="time"
                      label="Time"
                      value={time}
                      onChange={setTime}
                    />
                  </div>
                </div>
              )}

              {/* CTA button */}
              {!submitSuccess && (
                <button
                  type="button"
                  onClick={SINGLE_PAGE ? handleBookNow : handleGetPrices}
                  disabled={isSubmitting}
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
                    cursor: isSubmitting ? "wait" : "pointer",
                    opacity: isSubmitting ? 0.7 : 1,
                    transition: "background 0.2s ease, opacity 0.2s ease",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubmitting)
                      (e.currentTarget as HTMLButtonElement).style.background = "var(--gold)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "var(--ink)";
                  }}
                >
                  {isSubmitting ? "Sending…" : SINGLE_PAGE ? "Book Now →" : "Get my prices →"}
                </button>
              )}

              {submitError && (
                <div
                  role="alert"
                  style={{
                    marginTop: "10px",
                    fontSize: "12px",
                    color: "#a02929",
                    textAlign: "center",
                  }}
                >
                  {submitError}
                </div>
              )}
            </div>

            {/* Trust line — clusters wrap as atomic units so the dot
                separators never orphan at the end of a line */}
            <div
              className="flex items-center flex-wrap"
              style={{
                fontSize: "13px",
                color: "var(--ink-3)",
                columnGap: "14px",
                rowGap: "6px",
              }}
            >
              <div className="flex items-center" style={{ gap: "10px" }}>
                <span
                  style={{
                    color: "var(--gold)",
                    letterSpacing: "2px",
                  }}
                >
                  ★★★★★
                </span>
                <span style={{ fontWeight: 600, color: "var(--ink)" }}>
                  4.97
                </span>
                <span style={{ color: "var(--line-2)" }}>·</span>
                <span>500+ reviews</span>
              </div>
              <div className="flex items-center" style={{ gap: "10px" }}>
                <span>New York City</span>
                <span style={{ color: "var(--line-2)" }}>·</span>
                <span>24/7</span>
              </div>
            </div>
          </div>

          {/* ── Right column — hero image ── */}
          <div
            className="hero-image"
            style={{ position: "relative", minHeight: "540px" }}
          >
            {/* Main frame — map slot (replaces hero image) */}
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
              {!mapEnabled && (
                <Image
                  src="/images/heromain.webp"
                  alt="KL Executive chauffeur opening door for a client"
                  fill
                  loading="lazy"
                  quality={75}
                  className="object-cover animate-heroPan"
                  sizes="(max-width: 900px) 0vw, 600px"
                />
              )}
              <div
                id="hero-map-slot"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  background: mapEnabled ? "var(--bg-2)" : "transparent",
                }}
              />
              {!mapEnabled && (
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
              )}
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

      {/* Google Maps SDK loads only after user focuses pickup/destination — keeps initial bundle untouched */}
      {mapEnabled && (
        <BookingMapEnhancer
          pickupRef={pickupRef}
          destRef={destRef}
          pickup={pickup}
          destination={destination}
          onPickup={setPickup}
          onDestination={setDestination}
          onRoute={setRoute}
          mapSlotId="hero-map-slot"
        />
      )}

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
        /* Google Places Autocomplete dropdown — keep it above floating pills */
        .pac-container {
          z-index: 9999 !important;
          border-radius: 8px;
          box-shadow: 0 12px 40px rgba(40,30,10,0.18);
          border: 1px solid var(--line);
          font-family: var(--font-manrope), system-ui, sans-serif;
        }
        .pac-item {
          padding: 8px 12px;
          font-size: 13px;
        }

        /* Date / time picker field — hover + open states */
        .pickfield:hover { border-color: var(--line-2) !important; }

        /* react-day-picker brand theme overrides */
        .rdp-root {
          --rdp-accent-color: var(--gold);
          --rdp-accent-background-color: var(--gold);
          --rdp-today-color: var(--ink);
          --rdp-day_button-border-radius: 4px;
          --rdp-selected-border: 0;
          font-family: var(--font-manrope), system-ui, sans-serif;
          color: var(--ink);
          margin: 0;
        }
        .rdp-caption_label, .rdp-month_caption {
          font-family: var(--font-cormorant), Georgia, serif;
          font-weight: 500;
          color: var(--ink);
          font-size: 16px;
        }
        .rdp-weekday {
          font-family: var(--font-jetbrains), ui-monospace, monospace;
          font-size: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--ink-3);
          font-weight: 400;
        }
        .rdp-day_button {
          font-size: 13px;
          font-variant-numeric: tabular-nums;
          color: var(--ink);
        }
        .rdp-day_button:hover:not([disabled]) {
          background: var(--bg-2);
          color: var(--ink);
        }
        .rdp-selected .rdp-day_button {
          background: var(--gold);
          color: #fff;
          font-weight: 600;
        }
        .rdp-today:not(.rdp-selected) .rdp-day_button {
          color: var(--gold);
          font-weight: 600;
        }
        .rdp-outside .rdp-day_button {
          color: var(--ink-4);
        }
        .rdp-disabled .rdp-day_button {
          color: var(--ink-4);
          opacity: 0.55;
          cursor: not-allowed;
        }
        .rdp-disabled .rdp-day_button:hover {
          background: transparent !important;
        }
        .rdp-nav button {
          color: var(--ink-3);
          border-radius: 4px;
        }
        .rdp-nav button:hover {
          background: var(--bg-2);
          color: var(--ink);
        }
      `}</style>
    </section>
  );
}
