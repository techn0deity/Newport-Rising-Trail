import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import { useSettings } from "./state/useSettings";
import { LANGUAGES } from "./lib/i18n";
import WelcomePage from "./pages/WelcomePage";
import { TrailPage } from "./pages/TrailPage";
import StopPage from "./pages/StopPage";
import NearbyPage from "./pages/NearbyPage";
import CommunityPage from "./pages/CommunityPage";
import AboutPage from "./pages/AboutPage";
import SupportPage from "./pages/SupportPage";
import logo from "./assets/logo.png";

// Flag images
import flagEN from "./assets/england_lang.png";
import flagCY from "./assets/wales_lang.png";
import flagPL from "./assets/poland_lang.png";
import flagUK from "./assets/ukraine_lang.png";
import flagPA from "./assets/india_lang.png";
import flagUR from "./assets/pakistan_lang.png";
import flagHU from "./assets/hungary_lang.png";

const FLAGS: Record<string, string> = {
  en: flagEN,
  cy: flagCY,
  pl: flagPL,
  uk: flagUK,
  pa: flagPA,
  ur: flagUR,
  hu: flagHU,
};

export default function App() {
  const { settings, setLang } = useSettings();
  const [langOpen, setLangOpen] = useState(false);

  const currentLang = LANGUAGES.find((l) => l.code === settings.lang);

  return (
    <BrowserRouter>
      <div style={{ minHeight: "100vh", background: "#ede532" }}>
        <header
          style={{
            background: "#000000",
            borderBottom: "4px solid #ede532",
            padding: "10px 16px",
            paddingTop: "max(10px, env(safe-area-inset-top, 10px))",
            position: "sticky",
            top: 0,
            zIndex: 1000,
          }}
        >
          <div
            style={{
              maxWidth: 1200,
              margin: "0 auto",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 12,
            }}
          >
            <Link
              to="/"
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                flexShrink: 0,
              }}
            >
              <img
                src={logo}
                alt="Newport Rising"
                style={{
                  height: 55,
                  width: "auto",
                  filter: "brightness(0) saturate(100%) invert(85%) sepia(62%) saturate(497%) hue-rotate(11deg) brightness(103%) contrast(92%)",
                }}
              />
            </Link>

            <div style={{ position: "relative" }}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                style={{
                  background: "#ede532",
                  color: "#000000",
                  border: "3px solid #ede532",
                  padding: "6px 12px",
                  fontSize: 14,
                  fontWeight: "900",
                  cursor: "pointer",
                  borderRadius: 0,
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <img 
                  src={FLAGS[settings.lang] || flagEN} 
                  alt="" 
                  style={{ width: 24, height: 16, objectFit: "cover" }} 
                />
                {currentLang?.label || "EN"}
                <span style={{ fontSize: 10 }}>{langOpen ? "▲" : "▼"}</span>
              </button>

              {langOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    right: 0,
                    background: "#000000",
                    border: "3px solid #ede532",
                    marginTop: 4,
                    minWidth: 140,
                    zIndex: 1001,
                  }}
                >
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLang(lang.code);
                        setLangOpen(false);
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        width: "100%",
                        background: settings.lang === lang.code ? "#ede532" : "transparent",
                        color: settings.lang === lang.code ? "#000000" : "#ede532",
                        border: "none",
                        borderBottom: "1px solid #333",
                        padding: "12px 16px",
                        fontSize: 14,
                        fontWeight: "900",
                        cursor: "pointer",
                        textAlign: "left",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                      }}
                    >
                      <img 
                        src={FLAGS[lang.code]} 
                        alt="" 
                        style={{ width: 24, height: 16, objectFit: "cover" }} 
                      />
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </header>

        {langOpen && (
          <div
            onClick={() => setLangOpen(false)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 999,
            }}
          />
        )}

        <main>
          <Routes>
            <Route path="/" element={<WelcomePage lang={settings.lang} />} />
            <Route path="/trail" element={<TrailPage lang={settings.lang} />} />
            <Route path="/stop/:number" element={<StopPage lang={settings.lang} />} />
            <Route path="/nearby" element={<NearbyPage lang={settings.lang} />} />
            <Route path="/community" element={<CommunityPage lang={settings.lang} />} />
            <Route path="/about" element={<AboutPage lang={settings.lang} />} />
            <Route path="/support" element={<SupportPage lang={settings.lang} />} />
          </Routes>
        </main>

        <footer
          style={{
            background: "#000000",
            color: "#ede532",
            padding: "24px 16px",
            paddingBottom: "max(24px, env(safe-area-inset-bottom, 16px))",
          }}
        >
          <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
            <img
              src={logo}
              alt="Newport Rising"
              style={{
                height: 50,
                width: "auto",
                filter: "brightness(0) saturate(100%) invert(85%) sepia(62%) saturate(497%) hue-rotate(11deg) brightness(103%) contrast(92%)",
                marginBottom: 16,
              }}
            />
            <p style={{ margin: "0 0 8px 0", fontSize: 14, fontWeight: "bold", textTransform: "uppercase", letterSpacing: "2px" }}>
              Our Chartist Heritage
            </p>
            <p style={{ margin: "0 0 16px 0", fontSize: 12, color: "#ede532", opacity: 0.8 }}>
              Registered Charity No. 1176673
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: 16, marginBottom: 16 }}>
              <a href="https://www.newportrising.co.uk" target="_blank" rel="noreferrer" style={{ color: "#ede532", fontSize: 13, textDecoration: "none", fontWeight: "bold" }}>
                WEBSITE
              </a>
              <span style={{ color: "#ede532", opacity: 0.5 }}>|</span>
              <a href="mailto:community@newportrising.co.uk" style={{ color: "#ede532", fontSize: 13, textDecoration: "none", fontWeight: "bold" }}>
                CONTACT
              </a>
            </div>
            
            {/* Support Our Work section */}
            <div style={{ 
              borderTop: "1px solid rgba(237, 229, 50, 0.3)", 
              paddingTop: 16, 
              marginTop: 8,
            }}>
              <p style={{ margin: "0 0 12px 0", fontSize: 12, fontWeight: "bold", textTransform: "uppercase", letterSpacing: "1px", opacity: 0.9 }}>
                ❤️ Support Our Work
              </p>
              <form action="https://www.paypal.com/donate" method="post" target="_top" style={{ display: "inline-block" }}>
                <input type="hidden" name="hosted_button_id" value="FGA39Q7PULK56" />
                <input 
                  type="image" 
                  src="https://www.paypalobjects.com/en_GB/i/btn/btn_donate_SM.gif" 
                  name="submit" 
                  title="PayPal - The safer, easier way to pay online!" 
                  alt="Donate with PayPal"
                  style={{ cursor: "pointer" }}
                />
              </form>
            </div>

            <p style={{ margin: "16px 0 0 0", fontSize: 11, opacity: 0.6 }}>
              © {new Date().getFullYear()} Newport Rising
            </p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}
