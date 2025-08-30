"use client";
import Image from "next/image";
import HeroImage from "../../../public/assets/info-page/hero-work.jpg";
import HeroImageWork from "../../../public/assets/info-page/hero-team-work.jpg";

const InfoPageTwo = () => {
    return (
        <div>
            <section
                className="py-5 position-relative"
                style={{
                    background: "white",
                    backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(0, 0, 0, 0.02) 20px, rgba(0, 0, 0, 0.02) 21px),
            repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(0, 0, 0, 0.02) 20px, rgba(0, 0, 0, 0.02) 21px)
          `,
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                }}
            >
                {/* Top yellow line */}
                <div
                    className="position-absolute top-0 start-0 w-100"
                    style={{
                        height: "2px",
                        background: "linear-gradient(90deg, rgba(255, 236, 141, 0.8) 0%, transparent 100%)",
                        zIndex: 1,
                    }}
                />

                {/* Left blue line */}
                <div
                    className="position-absolute top-0 start-0 h-100"
                    style={{
                        width: "2px",
                        background: "linear-gradient(180deg, rgba(54, 88, 191, 0.3) 0%, transparent 100%)",
                        zIndex: 1,
                    }}
                />

                {/* Top right yellow gradient */}
                <div
                    className="position-absolute top-0 end-0"
                    style={{
                        width: "300px",
                        height: "300px",
                        background: "radial-gradient(circle, rgba(255, 236, 141, 0.2) 0%, transparent 70%)",
                        zIndex: 0,
                    }}
                />

                <div className="container position-relative" style={{ zIndex: 2 }}>
                    <div className="row align-items-center">
                        {/* Left side - Text content */}
                        <div className="col-lg-6 text-lg-start text-center mb-5 mb-lg-0">
                            <h1
                                className="fw-bold mb-4"
                                style={{
                                    fontFamily: "DM Serif Display, serif",
                                    fontWeight: 400,
                                    fontSize: "clamp(36px, 5vw, 60px)",
                                    lineHeight: "1.1",
                                    color: "#1a202c",
                                    marginBottom: "1.5rem",
                                }}
                            >
                                Welcome to our wo<span style={{ color: "#1a202c" }}>rld</span> <br className="d-none d-md-block" />
                                where innovation <span style={{ color: "#1a202c" }}>meets</span>{" "}
                                <span style={{ color: "#F26052" }}>simplicity.</span>
                            </h1>

                            <p
                                className="lead"
                                style={{
                                    maxWidth: "500px",
                                    color: "#4a5568",
                                    fontSize: "clamp(16px, 2.5vw, 18px)",
                                    lineHeight: "1.6",
                                    margin: "0 auto",
                                    marginLeft: "0",
                                }}
                            >
                                We're a team of creators, builders, and problem-solvers committed to
                                delivering meaningful digital experiences.
                            </p>
                        </div>

                        {/* Right side - Circular Images */}
                        <div className="col-lg-6 d-flex justify-content-center align-items-center">
                            <div className="position-relative" style={{ minHeight: "450px" }}>
                                {/* Large Top Circle - Main image */}
                                <div
                                    className="rounded-circle overflow-hidden shadow-lg position-relative"
                                    style={{
                                        width: "280px",
                                        height: "280px",
                                        zIndex: 3,
                                        position: "relative",
                                        top: "0px",
                                        left: "0px",
                                    }}
                                >
                                    <Image
                                        src={HeroImage}
                                        alt="Smiling man at desk"
                                        width={280}
                                        height={280}
                                        className="object-fit-cover w-100 h-100"
                                    />
                                    {/* Yellow glow effect */}
                                    <div
                                        className="position-absolute top-0 start-0 w-100 h-100 rounded-circle"
                                        style={{
                                            boxShadow: "0 0 20px rgba(255, 236, 141, 0.6)",
                                            zIndex: -1,
                                        }}
                                    />
                                </div>

                                {/* Small blue outlined circle above main image */}
                                <div
                                    className="position-absolute rounded-circle"
                                    style={{
                                        width: "40px",
                                        height: "40px",
                                        border: "2px solid rgba(54, 88, 191, 0.4)",
                                        top: "-20px",
                                        right: "20px",
                                        zIndex: 4,
                                        background: "transparent",
                                    }}
                                />

                                {/* Faint shadow behind main circle */}
                                <div
                                    className="position-absolute rounded-circle"
                                    style={{
                                        width: "280px",
                                        height: "280px",
                                        background: "rgba(0, 0, 0, 0.05)",
                                        top: "10px",
                                        left: "10px",
                                        zIndex: 1,
                                    }}
                                />

                                {/* Smaller Bottom Circle - Team image */}
                                <div
                                    className="rounded-circle overflow-hidden shadow-lg position-absolute"
                                    style={{
                                        width: "200px",
                                        height: "200px",
                                        bottom: "20px",
                                        right: "180px",
                                        zIndex: 2
                                    }}
                                >
                                    <Image
                                        src={HeroImageWork}
                                        alt="Team working together"
                                        width={200}
                                        height={200}
                                        className="object-fit-cover w-100 h-100"
                                    />
                                    {/* Red glow effect */}
                                    <div
                                        className="position-absolute top-0 start-0 w-100 h-100 rounded-circle"
                                        style={{
                                            boxShadow: "0 0 20px rgba(242, 96, 82, 0.5)",
                                            zIndex: -1,
                                        }}
                                    />
                                </div>

                                {/* Small gray outlined circle above team image */}
                                <div
                                    className="position-absolute rounded-circle"
                                    style={{
                                        width: "35px",
                                        height: "35px",
                                        border: "2px solid rgba(107, 114, 128, 0.3)",
                                        bottom: "180px",
                                        right: "180px",
                                        zIndex: 4,
                                        background: "transparent",
                                    }}
                                />

                                {/* Faint shadow behind team circle */}
                                <div
                                    className="position-absolute rounded-circle"
                                    style={{
                                        width: "200px",
                                        height: "200px",
                                        background: "rgba(0, 0, 0, 0.05)",
                                        bottom: "0px",
                                        right: "200px",
                                        zIndex: 1,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default InfoPageTwo