import { Link } from "react-router-dom";
import type { Lang } from "../lib/types";
import { t } from "../lib/i18n";

export default function CommunityPage({ lang }: { lang: Lang }) {
  return (
    <div style={{ background: "#ede532", minHeight: "100vh", padding: 16 }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        
        <Link to="/" style={{ display: "inline-block", color: "#000000", fontWeight: "bold", fontSize: 16, textDecoration: "none", marginBottom: 16 }}>
          ← {t(lang, "backToHome")}
        </Link>

        <h1 style={{ margin: "0 0 16px 0", fontSize: 26, fontWeight: "bold", color: "#000000" }}>
          {t(lang, "communityTitle")}
        </h1>

        <div style={{ background: "#ffffff", border: "3px solid #000000", borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: "#333333", margin: 0 }}>
            {t(lang, "communityIntro")}
          </p>
        </div>

        <div style={{ background: "#ffffff", border: "3px solid #000000", borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ margin: "0 0 12px 0", fontSize: 18, color: "#000000" }}>
            {t(lang, "howToContribute")}
          </h2>
          <ul style={{ margin: 0, paddingLeft: 20, color: "#333333", fontSize: 15, lineHeight: 1.8 }}>
            <li>{t(lang, "contribute1")}</li>
            <li>{t(lang, "contribute2")}</li>
            <li>{t(lang, "contribute3")}</li>
            <li>{t(lang, "contribute4")}</li>
          </ul>
          
          <a 
            href="mailto:community@newportrising.co.uk?subject=Community Content Submission"
            style={{ display: "inline-block", marginTop: 20, background: "#000000", color: "#ede532", padding: "14px 24px", borderRadius: 8, textDecoration: "none", fontSize: 16, fontWeight: "bold" }}
          >
            {t(lang, "sendUsYourContent")}
          </a>
        </div>

        <h2 style={{ margin: "24px 0 16px 0", fontSize: 20, color: "#000000" }}>
          {t(lang, "communityGallery")}
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ background: "#ffffff", border: "3px solid #000000", borderRadius: 12, padding: 16 }}>
            <p style={{ margin: "0 0 8px 0", fontSize: 15, color: "#333333" }}>
              "Amazing visit to the Westgate Hotel - you can still see the bullet holes!"
            </p>
            <p style={{ margin: 0, fontSize: 13, color: "#666666" }}>- Sarah T., Newport</p>
          </div>

          <div style={{ background: "#ffffff", border: "3px solid #000000", borderRadius: 12, padding: 16 }}>
            <p style={{ margin: "0 0 8px 0", fontSize: 15, color: "#333333" }}>
              "Learning about the women who supported the movement was really inspiring. Important history that needs to be remembered."
            </p>
            <p style={{ margin: 0, fontSize: 13, color: "#666666" }}>- David M., Cardiff</p>
          </div>

          <div style={{ background: "#ffffff", border: "3px solid #000000", borderRadius: 12, padding: 16 }}>
            <p style={{ margin: "0 0 8px 0", fontSize: 15, color: "#333333" }}>
              "Used the nearby feature to discover sites I never knew existed. Great way to explore the town!"
            </p>
            <p style={{ margin: 0, fontSize: 13, color: "#666666" }}>- Emma L., Bristol</p>
          </div>
        </div>

        <div style={{ background: "#ffffff", border: "3px solid #000000", borderRadius: 12, padding: 20, marginTop: 24, textAlign: "center" }}>
          <p style={{ margin: "0 0 16px 0", fontSize: 15, color: "#333333" }}>
            {t(lang, "wantToSeeYourContent")}
          </p>
          <a 
            href="mailto:community@newportrising.co.uk?subject=Community Content Submission"
            style={{ display: "inline-block", background: "#ede532", color: "#000000", border: "2px solid #000000", padding: "12px 24px", borderRadius: 8, textDecoration: "none", fontSize: 15, fontWeight: "bold" }}
          >
            community@newportrising.co.uk
          </a>
        </div>

        <div style={{ marginTop: 24, textAlign: "center" }}>
          <a 
            href="https://www.newportrising.co.uk" 
            target="_blank" 
            rel="noreferrer"
            style={{ color: "#000000", fontSize: 14 }}
          >
            {t(lang, "visitOurWebsite")} →
          </a>
        </div>
      </div>
    </div>
  );
}
