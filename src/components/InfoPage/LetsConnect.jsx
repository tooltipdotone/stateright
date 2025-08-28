'use client'
const LetsConnect = () => {
  return (
    <section className="py-5" style={{ background: "#FFEC8D" }}>
      <div className="container">
        <div className="row align-items-center gy-3">
          <div className="col-12 col-lg-6">
            <h2
              className="mb-0"
              style={{
                fontFamily: "DM Serif Display",
                fontWeight: 400,
                fontSize: "56px",
                lineHeight: "60px",
              }}
            >
              Let’s
            </h2>
            <h2
              className="mb-3"
              style={{
                fontFamily: "DM Serif Display",
                fontWeight: 400,
                color: "#F26052",
                fontSize: "56px",
                lineHeight: "60px",
              }}
            >
              Connect
            </h2>
          </div>
          <div className="col-12 col-lg-6">
            <p className="mb-2">
              We’d love to hear from you. Whether it’s feedback, collaboration,
              or just a
              <br />
              hello — feel free to reach out.
            </p>
            <p className="mb-0 text-muted">
              Thank you for being a part of our journey.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LetsConnect;
