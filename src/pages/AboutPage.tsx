import { Link } from "react-router-dom";
import type { Lang } from "../lib/types";
import { t } from "../lib/i18n";
import newportCC from "../assets/NEWPORT_CC_LOGO_BLACK.png";
import heritageFund from "../assets/Welsh_stamp_black_PNG.png";

export default function AboutPage({ lang }: { lang: Lang }) {
  return (
    <div style={{ background: "#ede532", minHeight: "100vh", padding: 16 }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        
        <Link to="/" style={{ display: "inline-block", color: "#000000", fontWeight: "bold", fontSize: 16, textDecoration: "none", marginBottom: 16 }}>
          ← {t(lang, "backToHome")}
        </Link>

        <h1 style={{ margin: "0 0 20px 0", fontSize: 26, fontWeight: "bold", color: "#000000" }}>
          {t(lang, "aboutTitle")}
        </h1>

        {/* About the Trail */}
        <div style={{ background: "#ffffff", border: "3px solid #000000", borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ margin: "0 0 12px 0", fontSize: 18, color: "#000000" }}>
            {t(lang, "welcomeTitle")}
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.6, color: "#333333", margin: "0 0 12px 0" }}>
            {t(lang, "trailDescription1")}
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.6, color: "#333333", margin: "0 0 12px 0" }}>
            {t(lang, "trailDescription2")}
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.6, color: "#333333", margin: 0 }}>
            {t(lang, "trailDescription3")}
          </p>
        </div>

        {/* New Content Notice */}
        <div style={{ background: "#ffffff", border: "3px solid #000000", borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ margin: "0 0 12px 0", fontSize: 18, color: "#000000" }}>
            {t(lang, "newContent")}
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.6, color: "#333333", margin: "0 0 12px 0" }}>
            {t(lang, "newContentDesc")}
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.6, color: "#333333", margin: 0, fontStyle: "italic" }}>
            {t(lang, "treasureHint")}
          </p>
        </div>

        {/* About OCH */}
        <div style={{ background: "#ffffff", border: "3px solid #000000", borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ margin: "0 0 12px 0", fontSize: 18, color: "#000000" }}>
            {t(lang, "aboutOCH")}
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.6, color: "#333333", margin: "0 0 12px 0" }}>
            {t(lang, "ochDescription1")}
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.6, color: "#333333", margin: "0 0 12px 0" }}>
            {t(lang, "ochDescription2")}
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.6, color: "#333333", margin: 0 }}>
            {t(lang, "ochDescription3")}
          </p>
          <a 
            href="https://www.newportrising.co.uk" 
            target="_blank" 
            rel="noreferrer"
            style={{ display: "inline-block", marginTop: 16, background: "#000000", color: "#ede532", padding: "12px 20px", borderRadius: 8, textDecoration: "none", fontSize: 14, fontWeight: "bold" }}
          >
            {t(lang, "visitOurWebsite")} →
          </a>
        </div>

        {/* Contact */}
        <div style={{ background: "#ffffff", border: "3px solid #000000", borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ margin: "0 0 12px 0", fontSize: 18, color: "#000000" }}>
            {t(lang, "contact")}
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.6, color: "#333333", margin: 0 }}>
            {t(lang, "email")}: <a href="mailto:community@newportrising.co.uk" style={{ color: "#000000" }}>community@newportrising.co.uk</a>
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.6, color: "#333333", margin: "8px 0 0 0" }}>
            {t(lang, "website")}: <a href="https://www.newportrising.co.uk" target="_blank" rel="noreferrer" style={{ color: "#000000" }}>www.newportrising.co.uk</a>
          </p>
        </div>

        {/* Sponsors */}
        <div style={{ background: "#ffffff", border: "3px solid #000000", borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ margin: "0 0 16px 0", fontSize: 18, color: "#000000", textAlign: "center" }}>
            {t(lang, "supportedBy")}
          </h2>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 30, flexWrap: "wrap" }}>
            <img src={heritageFund} alt="Heritage Fund" style={{ height: 90 }} />
            <img src={newportCC} alt="Newport City Council" style={{ height: 60 }} />
          </div>
        </div>

      </div>
    </div>
  );
}
