import { homeContent } from "./contentConfig";

function navigateTo(url) {
  if (url && typeof url === "string") {
    window.location.href = url;
  }
}

export default function App() {
  return (
    <main style={homeWrapStyle}>
      <section style={homeCardStyle}>
        <header style={heroHeaderStyle}>
          <p style={eyebrowStyle}>{homeContent.role}</p>
          <h1 style={homeTitleStyle}>{homeContent.heroTitle ?? homeContent.name}</h1>
          {homeContent.profileImage && (
            <a href={homeContent.profileImageLink} target="_blank" rel="noreferrer" style={profileImageLinkStyle}>
              <img src={homeContent.profileImage} alt={homeContent.name} style={profileImageStyle} />
              <span style={profileCaptionStyle}>{homeContent.profileImageCaption}</span>
            </a>
          )}
          <p style={homeTextStyle}>{homeContent.intro}</p>
          <p style={homeTextStyle}>{homeContent.details}</p>
        </header>

        {homeContent.aboutSections?.length > 0 && (
          <section style={projectSectionStyle}>
            <p style={sectionTitleStyle}>About Me</p>
            <article style={projectCardStyle}>
              {homeContent.aboutSections.map((section) => (
                <div key={section.title} style={aboutBlockStyle}>
                  <h3 style={aboutTitleStyle}>{section.title}</h3>
                  <p style={homeTextStyle}>{section.text}</p>
                </div>
              ))}
              {homeContent.interests?.length > 0 && (
                <>
                  <h3 style={aboutTitleStyle}>My Interests</h3>
                  <ul style={interestListStyle}>
                    {homeContent.interests.map((interest) => (
                      <li key={interest}>{interest}</li>
                    ))}
                  </ul>
                </>
              )}
            </article>
          </section>
        )}

        <section style={projectSectionStyle}>
          <p style={sectionTitleStyle}>Featured Project</p>
          <article style={projectCardStyle}>
            <h2 style={projectTitleStyle}>{homeContent.featuredProject.title}</h2>
            <p style={projectSubStyle}>{homeContent.featuredProject.subtitle}</p>
            <p style={homeTextStyle}>{homeContent.featuredProject.summary}</p>
            <button
              type="button"
              onClick={() => navigateTo(homeContent.roomAppUrl)}
              style={primaryBtnStyle}
            >
              {homeContent.featuredProject.cta}
            </button>
          </article>
        </section>

        <section style={projectSectionStyle}>
          <p style={sectionTitleStyle}>Contact</p>
          <div style={homeActionsStyle}>
            <a href={`mailto:${homeContent.email}`} style={ghostLinkStyle}>
              {homeContent.email}
            </a>
            {homeContent.links.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noreferrer" style={ghostLinkStyle}>
                {link.label}
              </a>
            ))}
          </div>
          <p style={metaTextStyle}>Location: {homeContent.location}</p>
        </section>
      </section>
    </main>
  );
}

const homeWrapStyle = {
  minHeight: "100vh",
  display: "grid",
  placeItems: "center",
  background: "linear-gradient(160deg, #0b1222 0%, #1d335a 45%, #2f4f84 100%)",
  padding: "24px",
};

const homeCardStyle = {
  width: "min(860px, 94vw)",
  background: "rgba(255, 255, 255, 0.94)",
  border: "1px solid rgba(255,255,255,0.7)",
  borderRadius: "18px",
  boxShadow: "0 25px 80px rgba(0,0,0,0.28)",
  padding: "34px 30px",
  fontFamily: "system-ui, sans-serif",
};

const heroHeaderStyle = {
  marginBottom: 24,
};

const eyebrowStyle = {
  margin: "0 0 10px",
  fontSize: "0.85rem",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "#475569",
};

const homeTitleStyle = {
  margin: "0 0 12px",
  fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
  color: "#111827",
};

const homeTextStyle = {
  margin: "0 0 10px",
  fontSize: "1rem",
  lineHeight: 1.6,
  color: "#334155",
};

const profileImageLinkStyle = {
  display: "inline-flex",
  flexDirection: "column",
  textDecoration: "none",
  margin: "8px 0 14px",
};

const profileImageStyle = {
  width: "min(220px, 40vw)",
  borderRadius: 12,
  border: "1px solid #dbe4f0",
};

const profileCaptionStyle = {
  marginTop: 8,
  fontSize: "0.85rem",
  color: "#475569",
};

const aboutBlockStyle = {
  marginBottom: 14,
};

const aboutTitleStyle = {
  margin: "0 0 8px",
  fontSize: "1rem",
  color: "#0f172a",
};

const interestListStyle = {
  margin: "0",
  paddingLeft: "20px",
  color: "#334155",
  lineHeight: 1.7,
};

const projectSectionStyle = {
  marginTop: 20,
};

const sectionTitleStyle = {
  margin: "0 0 10px",
  fontSize: "0.9rem",
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: "#64748b",
};

const projectCardStyle = {
  border: "1px solid #dbe4f0",
  borderRadius: 12,
  padding: "16px",
  background: "#f8fafc",
};

const projectTitleStyle = {
  margin: "0 0 4px",
  fontSize: "1.3rem",
  color: "#0f172a",
};

const projectSubStyle = {
  margin: "0 0 10px",
  color: "#475569",
  fontSize: "0.95rem",
};

const homeActionsStyle = {
  marginTop: 10,
  display: "flex",
  gap: 12,
  flexWrap: "wrap",
};

const metaTextStyle = {
  margin: "14px 0 0",
  color: "#64748b",
  fontSize: "0.92rem",
};

const primaryBtnStyle = {
  border: "none",
  borderRadius: 10,
  padding: "11px 16px",
  background: "#0f172a",
  color: "#fff",
  fontSize: "0.95rem",
  cursor: "pointer",
};

const ghostLinkStyle = {
  border: "1px solid #0f172a",
  borderRadius: 10,
  padding: "10px 15px",
  color: "#0f172a",
  textDecoration: "none",
  fontSize: "0.95rem",
};
