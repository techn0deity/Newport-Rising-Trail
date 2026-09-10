import { Link } from "react-router-dom";
import type { Lang } from "../lib/types";
import { t } from "../lib/i18n";
import tshirtImage from "../assets/black_six_points_tee.png";

const content: Record<Lang, {
  title: string;
  intro: string;
  donateTitle: string;
  donateDesc: string;
  donateButton: string;
  shopTitle: string;
  shopDesc: string;
  shopButton: string;
  hubTitle: string;
  hubDesc: string;
  hubButton: string;
  thanks: string;
}> = {
  en: {
    title: "Support Newport Rising",
    intro: "If you've enjoyed this free app, you can support our work in preserving and sharing Newport's Chartist heritage.",
    donateTitle: "Make a Donation",
    donateDesc: "Your donation helps us continue our educational programmes, maintain the trail, and develop new resources. As a registered charity, 100% of your PayPal donation comes to us with no fees.",
    donateButton: "Donate Now",
    shopTitle: "Visit Our Shop",
    shopDesc: "Browse Newport Rising merchandise including our iconic Six Points t-shirt, books, prints, and gifts celebrating our Chartist heritage.",
    shopButton: "Shop Now",
    hubTitle: "Newport Rising Hub",
    hubDesc: "Visit our hub for more information, interactive AI John Frost, upcoming events, and exclusive merchandise.",
    hubButton: "Visit the Hub",
    thanks: "Thank you for supporting Our Chartist Heritage!",
  },
  cy: {
    title: "Cefnogi Gwrthryfel Casnewydd",
    intro: "Os ydych wedi mwynhau'r ap rhad ac am ddim hwn, gallwch gefnogi ein gwaith wrth gadw a rhannu treftadaeth Siartwyr Casnewydd.",
    donateTitle: "Gwneud Rhodd",
    donateDesc: "Mae eich rhodd yn ein helpu i barhau â'n rhaglenni addysgol, cynnal y llwybr, a datblygu adnoddau newydd. Fel elusen gofrestredig, mae 100% o'ch rhodd PayPal yn dod atom heb unrhyw ffioedd.",
    donateButton: "Rhowch Nawr",
    shopTitle: "Ymweld â'n Siop",
    shopDesc: "Porwch nwyddau Gwrthryfel Casnewydd gan gynnwys ein crys-t eiconig Chwe Phwynt, llyfrau, printiau, ac anrhegion.",
    shopButton: "Siopa Nawr",
    hubTitle: "Canolfan Gwrthryfel Casnewydd",
    hubDesc: "Ymwelwch â'n canolfan am fwy o wybodaeth, AI rhyngweithiol John Frost, digwyddiadau sydd i ddod, a nwyddau unigryw.",
    hubButton: "Ymweld â'r Ganolfan",
    thanks: "Diolch am gefnogi Ein Treftadaeth Siartwyr!",
  },
  pl: {
    title: "Wesprzyj Newport Rising",
    intro: "Jeśli spodobała Ci się ta bezpłatna aplikacja, możesz wesprzeć naszą pracę w zachowaniu i dzieleniu się dziedzictwem czartystów z Newport.",
    donateTitle: "Przekaż darowiznę",
    donateDesc: "Twoja darowizna pomaga nam kontynuować programy edukacyjne, utrzymywać szlak i rozwijać nowe zasoby. Jako zarejestrowana organizacja charytatywna, 100% Twojej darowizny PayPal trafia do nas bez żadnych opłat.",
    donateButton: "Przekaż teraz",
    shopTitle: "Odwiedź nasz sklep",
    shopDesc: "Przeglądaj produkty Newport Rising, w tym naszą kultową koszulkę Six Points, książki, reprodukcje i upominki.",
    shopButton: "Kup teraz",
    hubTitle: "Centrum Newport Rising",
    hubDesc: "Odwiedź nasze centrum, aby uzyskać więcej informacji, interaktywnego AI Johna Frosta, nadchodzące wydarzenia i ekskluzywne produkty.",
    hubButton: "Odwiedź Centrum",
    thanks: "Dziękujemy za wsparcie Naszego Dziedzictwa Czartystów!",
  },
  uk: {
    title: "Підтримайте Newport Rising",
    intro: "Якщо вам сподобався цей безкоштовний додаток, ви можете підтримати нашу роботу зі збереження та поширення чартистської спадщини Ньюпорта.",
    donateTitle: "Зробити пожертву",
    donateDesc: "Ваша пожертва допомагає нам продовжувати освітні програми, підтримувати маршрут та розробляти нові ресурси. Як зареєстрована благодійна організація, 100% вашої пожертви PayPal надходить до нас без комісій.",
    donateButton: "Пожертвувати зараз",
    shopTitle: "Відвідайте наш магазин",
    shopDesc: "Перегляньте товари Newport Rising, включаючи нашу культову футболку Six Points, книги, репродукції та подарунки.",
    shopButton: "Купити зараз",
    hubTitle: "Центр Newport Rising",
    hubDesc: "Відвідайте наш центр для отримання додаткової інформації, інтерактивного ШІ Джона Фроста, майбутніх подій та ексклюзивних товарів.",
    hubButton: "Відвідати Центр",
    thanks: "Дякуємо за підтримку Нашої Чартистської Спадщини!",
  },
  pa: {
    title: "ਨਿਊਪੋਰਟ ਰਾਈਜ਼ਿੰਗ ਦਾ ਸਮਰਥਨ ਕਰੋ",
    intro: "ਜੇਕਰ ਤੁਸੀਂ ਇਸ ਮੁਫ਼ਤ ਐਪ ਦਾ ਆਨੰਦ ਮਾਣਿਆ ਹੈ, ਤਾਂ ਤੁਸੀਂ ਨਿਊਪੋਰਟ ਦੀ ਚਾਰਟਿਸਟ ਵਿਰਾਸਤ ਨੂੰ ਸੰਭਾਲਣ ਅਤੇ ਸਾਂਝਾ ਕਰਨ ਵਿੱਚ ਸਾਡੇ ਕੰਮ ਦਾ ਸਮਰਥਨ ਕਰ ਸਕਦੇ ਹੋ।",
    donateTitle: "ਦਾਨ ਕਰੋ",
    donateDesc: "ਤੁਹਾਡਾ ਦਾਨ ਸਾਨੂੰ ਸਾਡੇ ਵਿਦਿਅਕ ਪ੍ਰੋਗਰਾਮਾਂ ਨੂੰ ਜਾਰੀ ਰੱਖਣ ਵਿੱਚ ਮਦਦ ਕਰਦਾ ਹੈ। ਰਜਿਸਟਰਡ ਚੈਰਿਟੀ ਹੋਣ ਕਰਕੇ, ਤੁਹਾਡੇ PayPal ਦਾਨ ਦਾ 100% ਬਿਨਾਂ ਫੀਸ ਸਾਨੂੰ ਮਿਲਦਾ ਹੈ।",
    donateButton: "ਹੁਣੇ ਦਾਨ ਕਰੋ",
    shopTitle: "ਸਾਡੀ ਦੁਕਾਨ 'ਤੇ ਜਾਓ",
    shopDesc: "ਸਾਡੀ ਆਈਕਾਨਿਕ Six Points ਟੀ-ਸ਼ਰਟ, ਕਿਤਾਬਾਂ, ਪ੍ਰਿੰਟਸ ਅਤੇ ਤੋਹਫ਼ੇ ਸਮੇਤ ਨਿਊਪੋਰਟ ਰਾਈਜ਼ਿੰਗ ਦਾ ਸਮਾਨ ਬ੍ਰਾਊਜ਼ ਕਰੋ।",
    shopButton: "ਹੁਣੇ ਖਰੀਦੋ",
    hubTitle: "ਨਿਊਪੋਰਟ ਰਾਈਜ਼ਿੰਗ ਹੱਬ",
    hubDesc: "ਹੋਰ ਜਾਣਕਾਰੀ, ਇੰਟਰਐਕਟਿਵ AI ਜੌਹਨ ਫ੍ਰੌਸਟ, ਆਉਣ ਵਾਲੇ ਸਮਾਗਮਾਂ ਅਤੇ ਵਿਸ਼ੇਸ਼ ਸਮਾਨ ਲਈ ਸਾਡੇ ਹੱਬ 'ਤੇ ਜਾਓ।",
    hubButton: "ਹੱਬ 'ਤੇ ਜਾਓ",
    thanks: "ਸਾਡੀ ਚਾਰਟਿਸਟ ਵਿਰਾਸਤ ਦਾ ਸਮਰਥਨ ਕਰਨ ਲਈ ਧੰਨਵਾਦ!",
  },
  ur: {
    title: "نیوپورٹ رائزنگ کی حمایت کریں",
    intro: "اگر آپ نے اس مفت ایپ سے لطف اندوز ہوا ہے، تو آپ نیوپورٹ کی چارٹسٹ ورثے کو محفوظ رکھنے اور شیئر کرنے میں ہمارے کام کی حمایت کر سکتے ہیں۔",
    donateTitle: "عطیہ کریں",
    donateDesc: "آپ کا عطیہ ہمیں اپنے تعلیمی پروگراموں کو جاری رکھنے میں مدد کرتا ہے۔ رجسٹرڈ چیریٹی ہونے کی وجہ سے، آپ کے PayPal عطیے کا 100% بغیر کسی فیس کے ہمیں ملتا ہے۔",
    donateButton: "ابھی عطیہ کریں",
    shopTitle: "ہماری دکان ملاحظہ کریں",
    shopDesc: "ہماری آئیکونک Six Points ٹی شرٹ، کتابوں، پرنٹس اور تحائف سمیت نیوپورٹ رائزنگ کا سامان براؤز کریں۔",
    shopButton: "ابھی خریدیں",
    hubTitle: "نیوپورٹ رائزنگ ہب",
    hubDesc: "مزید معلومات، انٹرایکٹو AI جان فراسٹ، آنے والے پروگراموں اور خصوصی سامان کے لیے ہمارے ہب پر جائیں۔",
    hubButton: "ہب ملاحظہ کریں",
    thanks: "ہماری چارٹسٹ ورثے کی حمایت کرنے کا شکریہ!",
  },
  hu: {
    title: "Támogasd a Newport Rising-ot",
    intro: "Ha élvezted ezt az ingyenes alkalmazást, támogathatod munkánkat Newport chartista örökségének megőrzésében és megosztásában.",
    donateTitle: "Adományozz",
    donateDesc: "Adományod segít folytatni oktatási programjainkat, fenntartani az ösvényt és új forrásokat fejleszteni. Bejegyzett jótékonysági szervezetként PayPal adományod 100%-a díjmentesen érkezik hozzánk.",
    donateButton: "Adományozz most",
    shopTitle: "Látogasd meg boltunkat",
    shopDesc: "Böngészd Newport Rising termékeit, beleértve ikonikus Six Points pólónkat, könyveket, nyomatokat és ajándékokat.",
    shopButton: "Vásárolj most",
    hubTitle: "Newport Rising Központ",
    hubDesc: "Látogasd meg központunkat további információkért, interaktív AI John Frostért, közelgő eseményekért és exkluzív árukért.",
    hubButton: "Látogasd meg a Központot",
    thanks: "Köszönjük, hogy támogatod Chartista Örökségünket!",
  },
};

export default function SupportPage({ lang }: { lang: Lang }) {
  const c = content[lang] || content.en;

  return (
    <div style={{ padding: 16, background: "#ede532", minHeight: "100vh" }}>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        
        <Link to="/" style={{ 
          display: "inline-block", 
          color: "#000000", 
          fontWeight: "900", 
          fontSize: 16, 
          textDecoration: "none", 
          marginBottom: 16,
          textTransform: "uppercase",
          letterSpacing: "1px",
        }}>
          {lang === "ur" ? "→" : "←"} {t(lang, "backToHome")}
        </Link>

        <h1 style={{ 
          margin: "0 0 16px 0", 
          fontSize: 28, 
          fontWeight: "900", 
          color: "#000000",
          textTransform: "uppercase",
          letterSpacing: "1px",
        }}>
          {c.title}
        </h1>

        <div style={{ 
          background: "#000000", 
          padding: 20, 
          marginBottom: 16,
          border: "4px solid #000000",
        }}>
          <p style={{ 
            fontSize: 16, 
            color: "#ffffff", 
            lineHeight: 1.6,
            margin: 0,
          }}>
            {c.intro}
          </p>
        </div>

        {/* Donate Section with PayPal */}
        <div style={{ 
          background: "#ffffff", 
          border: "4px solid #000000", 
          padding: 20, 
          marginBottom: 12,
        }}>
          <h2 style={{ 
            margin: "0 0 8px 0", 
            fontSize: 20, 
            fontWeight: "900", 
            color: "#000000",
            textTransform: "uppercase",
          }}>
            ❤️ {c.donateTitle}
          </h2>
          <p style={{ fontSize: 15, color: "#333333", lineHeight: 1.5, margin: "0 0 16px 0" }}>
            {c.donateDesc}
          </p>
          <div style={{ textAlign: "center" }}>
            <form action="https://www.paypal.com/donate" method="post" target="_top">
              <input type="hidden" name="hosted_button_id" value="FGA39Q7PULK56" />
              <input 
                type="image" 
                src="https://www.paypalobjects.com/en_GB/i/btn/btn_donate_LG.gif" 
                name="submit" 
                title="PayPal - The safer, easier way to pay online!" 
                alt="Donate with PayPal button"
                style={{ cursor: "pointer" }}
              />
            </form>
          </div>
        </div>

        {/* Shop Section with T-shirt Image */}
        <div style={{ 
          background: "#ffffff", 
          border: "4px solid #000000", 
          padding: 20, 
          marginBottom: 12,
        }}>
          <h2 style={{ 
            margin: "0 0 8px 0", 
            fontSize: 20, 
            fontWeight: "900", 
            color: "#000000",
            textTransform: "uppercase",
          }}>
            🛒 {c.shopTitle}
          </h2>
          <p style={{ fontSize: 15, color: "#333333", lineHeight: 1.5, margin: "0 0 16px 0" }}>
            {c.shopDesc}
          </p>
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <img 
              src={tshirtImage} 
              alt="Six Points Charter T-Shirt" 
              style={{ 
                maxWidth: "100%", 
                width: 250,
                border: "4px solid #000000",
              }} 
            />
          </div>
          <a 
            href="https://www.newportrising.co.uk/online-store" 
            target="_blank" 
            rel="noreferrer"
            style={{ 
              display: "block", 
              background: "#000000", 
              color: "#ede532", 
              padding: "14px 20px", 
              textDecoration: "none", 
              fontSize: 16, 
              fontWeight: "900", 
              textAlign: "center",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            {c.shopButton} {lang === "ur" ? "←" : "→"}
          </a>
        </div>

        {/* Hub Section */}
        <div style={{ 
          background: "#ffffff", 
          border: "4px solid #000000", 
          padding: 20, 
          marginBottom: 16,
        }}>
          <h2 style={{ 
            margin: "0 0 8px 0", 
            fontSize: 20, 
            fontWeight: "900", 
            color: "#000000",
            textTransform: "uppercase",
          }}>
            🏛️ {c.hubTitle}
          </h2>
          <p style={{ fontSize: 15, color: "#333333", lineHeight: 1.5, margin: "0 0 16px 0" }}>
            {c.hubDesc}
          </p>
          <a 
            href="https://www.newportrising.co.uk/about-3" 
            target="_blank" 
            rel="noreferrer"
            style={{ 
              display: "block", 
              background: "#000000", 
              color: "#ede532", 
              padding: "14px 20px", 
              textDecoration: "none", 
              fontSize: 16, 
              fontWeight: "900", 
              textAlign: "center",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            {c.hubButton} {lang === "ur" ? "←" : "→"}
          </a>
        </div>

        {/* Thank You */}
        <div style={{ 
          background: "#ede532", 
          border: "4px solid #000000", 
          padding: 20,
          textAlign: "center",
        }}>
          <p style={{ 
            fontSize: 16, 
            color: "#000000", 
            margin: 0,
            fontWeight: "900",
          }}>
            🙏 {c.thanks}
          </p>
        </div>
      </div>
    </div>
  );
}