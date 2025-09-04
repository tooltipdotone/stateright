"use client";

import { settingsData } from "@/redux/reuducer/settingSlice";
import Link from "next/link";
import { useSelector } from "react-redux";

const InfoFooter = ({
  title = (
    <h2
      className="fw-bold"
      style={{
        fontWeight: 400,
        fontSize: "clamp(36px, 5vw, 60px)",
        lineHeight: "1.1",
        color: "#3658BF",
        marginBottom: 0,
      }}
    >
      <span style={{ color: "#3658BF" }}>Become a</span>
      <br />
      <span style={{ color: "#F26052" }}>Partner</span>
    </h2>
  ),
  secondTitle = (
    <p
      className="lead mb-0"
      style={{
        color: "#4a5568",
        fontSize: "clamp(16px, 2.5vw, 18px)",
        lineHeight: "1.6",
      }}
    >
      Interested in partnering with us? We're always open to new collaborations
      that align with our mission. Send us a message at{" "}
      <Link
        href={`https://mail.google.com/mail/?view=cm&fs=1&to=admin@gmail.com `}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span
          style={{
            color: "#3658BF",
            textDecoration: "underline",
            fontWeight: "500",
            cursor: "pointer",
          }}
        >
          admin@gmail.com
        </span>
      </Link>
      or visit our{" "}
      <Link
        href="/contact-us"
        style={{
          color: "#3658BF",
          textDecoration: "underline",
          fontWeight: "500",
        }}
      >
        Contact Page
      </Link>{" "}
      to get started.
    </p>
  ),
}) => {
  const systemSettingsData = useSelector(settingsData);
  const settings = systemSettingsData?.data;
  return (
    <section
      className="position-relative"
      style={{
        background: "#FFEC8D",
        padding: "4rem 0",
      }}
    >
      <div className="container position-relative" style={{ zIndex: 3 }}>
        <div className="row align-items-center">
          {/* Left side - Heading */}
          <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">{title}</div>

          {/* Right side - Description and contact */}
          <div className="col-lg-7 col-md-6">{secondTitle}</div>
        </div>
      </div>
    </section>
  );
};

export default InfoFooter;
