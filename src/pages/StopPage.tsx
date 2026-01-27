import { Link, useParams } from "react-router-dom";
import type { Lang } from "../lib/types";
import { useTrail } from "../state/useTrail";
import { t } from "../lib/i18n";

// Stop descriptions in all 7 languages
const descriptions: Record<number, Record<Lang, string>> = {
  1: {
    en: "Newport Museum and Art Gallery has extensive Chartist displays, bringing the subject to life and exploring characters on both sides. Contemporary guns and other weapons sit alongside artworks and written accounts showing the devastating impact the events of 4 November 1839 had on the area and the country as a whole.",
    cy: "Mae gan Amgueddfa ac Oriel Gelf Casnewydd arddangosfeydd Siartwyr helaeth, yn dod a'r pwnc yn fyw ac yn archwilio cymeriadau ar y ddwy ochr.",
    pl: "Muzeum i Galeria Sztuki w Newport posiada obszerne wystawy czartystowskie, ożywiające temat i przedstawiające postacie z obu stron. Współczesne pistolety i inna broń stoją obok dzieł sztuki i pisemnych relacji pokazujących niszczycielski wpływ wydarzeń z 4 listopada 1839 roku na region i cały kraj.",
    uk: "Музей і художня галерея Ньюпорта мають великі виставки, присвячені чартистам, оживляючи цю тему і досліджуючи учасників з обох боків. Сучасні пістолети та інша зброя стоять поряд із творами мистецтва та письмовими свідченнями.",
    pa: "ਨਿਊਪੋਰਟ ਮਿਊਜ਼ੀਅਮ ਅਤੇ ਆਰਟ ਗੈਲਰੀ ਵਿੱਚ ਵਿਆਪਕ ਚਾਰਟਿਸਟ ਡਿਸਪਲੇ ਹਨ, ਵਿਸ਼ੇ ਨੂੰ ਜੀਵਨ ਵਿੱਚ ਲਿਆਉਂਦੇ ਹਨ ਅਤੇ ਦੋਵਾਂ ਪਾਸਿਆਂ ਦੇ ਪਾਤਰਾਂ ਦੀ ਪੜਚੋਲ ਕਰਦੇ ਹਨ।",
    ur: "نیوپورٹ میوزیم اور آرٹ گیلری میں وسیع چارٹسٹ ڈسپلے ہیں، موضوع کو زندہ کرتے ہیں اور دونوں طرف سے کرداروں کو تلاش کرتے ہیں۔",
    hu: "A Newport Múzeum és Művészeti Galéria kiterjedt Chartista kiállításokkal rendelkezik, életre keltve a témát és feltárva a karaktereket mindkét oldalon."
  },
  2: {
    en: "This is where Frost called the meeting of 30th October 1838 when an audience of 400-500 people adopted The People's Charter. Thomas Walker was the landlord of the Parrot Inn and also a special constable; he was injured at High Cross during the Newport Rising.",
    cy: "Dyma lle y galwodd Frost gyfarfod ar 30 Hydref 1838 pan fabwysiadodd cynulleidfa o 400-500 o bobl Siarter y Bobl.",
    pl: "To tutaj Frost zwołał spotkanie 30 października 1838 roku, kiedy 400-500-osobowe audytorium przyjęło Kartę Ludową. Thomas Walker był właścicielem gospody Parrot Inn i jednocześnie specjalnym konstablem; został ranny pod High Cross podczas Powstania w Newport.",
    uk: "Саме тут Фрост скликав зустріч 30 жовтня 1838 року, коли зібралося 400-500 осіб, які затвердили Народну Хартію. Томас Волкер був власником готелю Папуга, а також спеціальним констеблем.",
    pa: "ਇਹ ਉਹ ਥਾਂ ਹੈ ਜਿੱਥੇ ਫਰੌਸਟ ਨੇ 30 ਅਕਤੂਬਰ 1838 ਦੀ ਮੀਟਿੰਗ ਬੁਲਾਈ ਸੀ ਜਦੋਂ 400-500 ਲੋਕਾਂ ਦੇ ਦਰਸ਼ਕਾਂ ਨੇ ਦਿ ਪੀਪਲਜ਼ ਚਾਰਟਰ ਨੂੰ ਅਪਣਾਇਆ।",
    ur: "یہ وہ جگہ ہے جہاں فروسٹ نے 30 اکتوبر 1838 کو اجلاس بلایا جب 400-500 لوگوں کے سامعین نے دی پیپلز چارٹر کو اپنایا۔",
    hu: "Ide hívta Frost az 1838. október 30-i találkozót, amikor a 400-500 fős hallgatóság elfogadta a Népi Chartát."
  },
  3: {
    en: "On 4 November 1839, thousands of Chartists massed in front of the Westgate Inn and tried to force entry through the main door. Shots were exchanged with the soldiers hidden inside and the battle raged for more than 20 minutes. The Chartists scattered, leaving more than 20 dead. This event became known as The Newport Rising.",
    cy: "Ar 4 Tachwedd 1839, ymgasglodd miloedd o Siartwyr o flaen y Westgate Inn a cheisio mynd i mewn trwy'r prif ddrws. Cyfnewidiwyd ergydion gyda'r milwyr a oedd yn cuddio y tu mewn a pharhaodd y frwydr am fwy nag 20 munud.",
    pl: "4 listopada 1839 roku tysiące czartystów zgromadziło się przed Westgate Inn i próbowało wyważyć główne drzwi. Wymieniono strzały z ukrytymi wewnątrz żołnierzami, a bitwa trwała ponad 20 minut. Czartyści rozproszyli się, pozostawiając ponad 20 zabitych.",
    uk: "4 листопада 1839 року тисячі чартистів зібралися перед готелем Вестгейт і спробували увірватися до нього через головні двері. Почалася перестрілка з солдатами, що ховалися всередині, і бій тривав понад 20 хвилин.",
    pa: "4 ਨਵੰਬਰ 1839 ਨੂੰ, ਹਜ਼ਾਰਾਂ ਚਾਰਟਿਸਟ ਵੈਸਟਗੇਟ ਇਨ ਦੇ ਸਾਹਮਣੇ ਇਕੱਠੇ ਹੋਏ ਅਤੇ ਮੁੱਖ ਦਰਵਾਜ਼ੇ ਰਾਹੀਂ ਦਾਖਲ ਹੋਣ ਦੀ ਕੋਸ਼ਿਸ਼ ਕੀਤੀ।",
    ur: "4 نومبر 1839 کو، ہزاروں چارٹسٹ ویسٹ گیٹ ان کے سامنے جمع ہوئے اور مرکزی دروازے سے زبردستی داخل ہونے کی کوشش کی۔",
    hu: "1839. november 4-én chartisták ezrei gyűltek össze a Westgate Inn előtt, és megpróbáltak erőszakkal bejutni a főajtón. Lövéseket váltottak a bent rejtett katonákkal."
  },
  4: {
    en: "From an upstairs window of a building at this site, a young artist called James Flewitt Mullock witnessed the attack on the Westgate Inn. When a shot struck nearby, he fled down Skinner Street. A year later, he produced a lithograph of the scene, which has been printed many times since.",
    cy: "O ffenestr ar lawr uchaf adeilad ar y safle hwn, gwelodd arlunydd ifanc o'r enw James Flewitt Mullock yr ymosodiad ar y Westgate Inn.",
    pl: "Z okna na piętrze budynku w tym miejscu młody artysta James Flewitt Mullock był świadkiem ataku na Westgate Inn. Kiedy w pobliżu padł strzał, uciekł ulicą Skinner Street. Rok później wykonał litografię tej sceny.",
    uk: "З вікна верхнього поверху будівлі неподалік, молодий художник Джеймс Флевітт Маллок став свідком атаки на готель Вестгейт. Коли неподалік пролунав постріл, він втік вниз по Skinner Street.",
    pa: "ਇਸ ਸਾਈਟ 'ਤੇ ਇੱਕ ਇਮਾਰਤ ਦੀ ਉੱਪਰਲੀ ਖਿੜਕੀ ਤੋਂ, ਜੇਮਸ ਫਲੀਵਿਟ ਮੂਲਕ ਨਾਮਕ ਇੱਕ ਨੌਜਵਾਨ ਕਲਾਕਾਰ ਨੇ ਵੈਸਟਗੇਟ ਇਨ 'ਤੇ ਹਮਲੇ ਨੂੰ ਦੇਖਿਆ।",
    ur: "اس سائٹ پر ایک عمارت کی اوپر کی کھڑکی سے، جیمز فلیویٹ ملوک نامی ایک نوجوان فنکار نے ویسٹ گیٹ ان پر حملے کا مشاہدہ کیا۔",
    hu: "Az ezen a helyen található épület emeleti ablakából egy James Flewitt Mullock nevű fiatal művész szemtanúja volt a Westgate Inn elleni támadásnak."
  },
  5: {
    en: "John Frost was one of the owners of this building which dates from 1533. His draper's shop also stood on this side of High Street until the late 1870s. Once the home of the High Sheriff of Monmouthshire, today the Murenger is a public house.",
    cy: "Roedd John Frost yn un o berchnogion yr adeilad hwn sy'n dyddio o 1533. Roedd ei siop dillad hefyd yn sefyll ar yr ochr hon o'r Stryd Fawr tan ddiwedd y 1870au.",
    pl: "John Frost był jednym z właścicieli tego budynku, który pochodzi z 1533 roku. Jego sklep sukienniczy również stał po tej stronie High Street do końca lat 70. XIX wieku.",
    uk: "Джон Фрост був одним із власників цієї будівлі, яка була побудована у 1533 році. Його швацька майстерня також стояла на цьому боці High Street до кінця 1870-х років.",
    pa: "ਜੌਹਨ ਫਰੌਸਟ ਇਸ ਇਮਾਰਤ ਦੇ ਮਾਲਕਾਂ ਵਿੱਚੋਂ ਇੱਕ ਸੀ ਜੋ 1533 ਦੀ ਹੈ। ਉਸਦੀ ਡਰਾਪਰ ਦੀ ਦੁਕਾਨ ਵੀ 1870 ਦੇ ਦਹਾਕੇ ਦੇ ਅਖੀਰ ਤੱਕ ਹਾਈ ਸਟਰੀਟ ਦੇ ਇਸ ਪਾਸੇ ਖੜ੍ਹੀ ਸੀ।",
    ur: "جان فراسٹ اس عمارت کے مالکان میں سے ایک تھے جو کہ 1533 کی ہے۔ اس کی ڈریپر کی دکان بھی 1870 کی دہائی کے آخر تک ہائی اسٹریٹ کے اس طرف کھڑی تھی۔",
    hu: "John Frost volt az egyik tulajdonosa ennek az 1533-ból származó épületnek. Az ő drapériája is a High Street ezen oldalán állt az 1870-es évek végéig."
  },
  6: {
    en: "On Saturday 2 November 1839, a young Chartist messenger from Bradford stayed in the Carpenters Arms before travelling home by stage-coach the next day. He had met Frost in Blackwood, where he unsuccessfully tried to persuade him to delay the march on Newport because the Yorkshire Chartists were not yet ready to rise in support.",
    cy: "Ar ddydd Sadwrn 2 Tachwedd 1839, arhosodd negesydd Siartaidd ifanc o Bradford yn y Carpenters Arms cyn teithio adref ar goets y diwrnod canlynol.",
    pl: "W sobotę 2 listopada 1839 roku młody posłaniec czartystowski z Bradford zatrzymał się w Carpenters Arms przed powrotem do domu dyliżansem następnego dnia.",
    uk: "У суботу, 2 листопада 1839 року, молодий чартистський посланець з Бредфорда зупинився в Теслярському Арсеналі, щоб наступного дня поїхати додому диліжансом.",
    pa: "ਸ਼ਨੀਵਾਰ 2 ਨਵੰਬਰ 1839 ਨੂੰ, ਬ੍ਰੈਡਫੋਰਡ ਦਾ ਇੱਕ ਨੌਜਵਾਨ ਚਾਰਟਿਸਟ ਮੈਸੇਂਜਰ ਅਗਲੇ ਦਿਨ ਸਟੇਜ-ਕੋਚ ਦੁਆਰਾ ਘਰ ਜਾਣ ਤੋਂ ਪਹਿਲਾਂ ਕਾਰਪੇਂਟਰਸ ਆਰਮਜ਼ ਵਿੱਚ ਰਿਹਾ।",
    ur: "ہفتہ 2 نومبر 1839 کو، بریڈ فورڈ کا ایک نوجوان چارٹسٹ میسنجر اگلے دن سٹیج کوچ کے ذریعے گھر جانے سے پہلے کارپینٹرز آرمز میں رہا۔",
    hu: "1839. november 2-án, szombaton egy fiatal chartista hírnök Bradfordból a Carpenters Armsnál maradt, majd másnap hazautazott egy edzővel."
  },
  7: {
    en: "This building stands on the site of the entrance to Thomas Street, where John Frost's parents, John and Sarah, kept the Royal Oak public house. He became a magistrate and mayor of Newport in 1836 before becoming involved in the Chartist movement.",
    cy: "Saif yr adeilad hwn ar safle'r fynedfa i Stryd Thomas, lle roedd rhieni John Frost, John a Sarah, yn cadw tafarn y Royal Oak.",
    pl: "Ten budynek stoi w miejscu wejścia na Thomas Street, gdzie rodzice Johna Frosta, John i Sarah, prowadzili pub Royal Oak. Został sędzią i burmistrzem Newport w 1836 roku, zanim zaangażował się w ruch czartystowski.",
    uk: "Ця будівля стоїть на початку Thomas Street, де батьки Джона Фроста, Джон і Сара, тримали паб Royal Oak. У 1836 році він став суддею і мером Ньюпорта.",
    pa: "ਇਹ ਇਮਾਰਤ ਥਾਮਸ ਸਟਰੀਟ ਦੇ ਪ੍ਰਵੇਸ਼ ਦੁਆਰ ਦੇ ਸਥਾਨ 'ਤੇ ਖੜ੍ਹੀ ਹੈ, ਜਿੱਥੇ ਜੌਨ ਫਰੌਸਟ ਦੇ ਮਾਤਾ-ਪਿਤਾ ਜੌਨ ਅਤੇ ਸਾਰਾਹ ਨੇ ਰਾਇਲ ਓਕ ਪਬਲਿਕ ਹਾਊਸ ਰੱਖਿਆ ਸੀ।",
    ur: "یہ عمارت تھامس اسٹریٹ کے داخلی دروازے کی جگہ پر کھڑی ہے، جہاں جان فراسٹ کے والدین جان اور سارہ نے رائل اوک پبلک ہاؤس رکھا تھا۔",
    hu: "Ez az épület a Thomas Street bejáratának helyén áll, ahol John Frost szülei, John és Sarah tartották a Royal Oak nyilvános házat."
  },
  8: {
    en: "The six points of The People's Charter are inscribed alongside the steps leading to John Frost Square. The Charter was drafted by William Lovett and sets out the changes the Chartists wanted to see in the electoral system. The People's Charter still provides the foundation for our modern democracy.",
    cy: "Mae chwe phwynt Siarter y Bobl wedi'u harysgrifio ochr yn ochr a'r grisiau sy'n arwain at Sgwar John Frost.",
    pl: "Sześć punktów Karty Ludowej jest wypisanych wzdłuż schodów prowadzących na Plac Johna Frosta. Karta została przygotowana przez Williama Lovetta i określa zmiany, które czartyści chcieli zobaczyć w systemie wyborczym.",
    uk: "Шість пунктів Народної Хартії вибиті на сходах, що ведуть до площі Джона Фроста. Хартія була складена Вільямом Ловеттом і відображає зміни, які чартисти хотіли бачити у виборчій системі.",
    pa: "ਪੀਪਲਜ਼ ਚਾਰਟਰ ਦੇ ਛੇ ਨੁਕਤੇ ਜੌਹਨ ਫ੍ਰੌਸਟ ਸਕੁਆਇਰ ਵੱਲ ਜਾਣ ਵਾਲੀਆਂ ਪੌੜੀਆਂ ਦੇ ਨਾਲ ਉੱਕਰੇ ਹੋਏ ਹਨ।",
    ur: "دی پیپلز چارٹر کے چھ نکات جان فراسٹ اسکوائر کی طرف جانے والی سیڑھیوں کے ساتھ کندہ ہیں۔",
    hu: "A The People's Charter hat pontja a John Frost térre vezető lépcsők mellett van felírva."
  },
  9: {
    en: "John Frost Square, originally created in the 1970s and redeveloped in 2015, is named after one of the leaders of the South Wales Chartists. The tall building visible to the north of the Square is called Chartist Tower in commemoration of the Rising. Newport Museum and Art Gallery contains an extensive Chartist exhibition.",
    cy: "Mae Sgwar John Frost, a grëwyd yn wreiddiol yn y 1970au ac a ailddatblygwyd yn 2015, wedi'i enwi ar ol un o arweinwyr Siartwyr De Cymru.",
    pl: "Plac Johna Frosta, utworzony pierwotnie w latach 70. XX wieku i przebudowany w 2015 roku, nosi imię jednego z przywódców czartystów z Południowej Walii.",
    uk: "Площа Джона Фроста, створена у 1970-х роках і перепланована у 2015 році, названа на честь одного з лідерів південноуельських чартистів.",
    pa: "ਜੌਹਨ ਫ੍ਰੌਸਟ ਸਕੁਆਇਰ, ਅਸਲ ਵਿੱਚ 1970 ਦੇ ਦਹਾਕੇ ਵਿੱਚ ਬਣਾਇਆ ਗਿਆ ਅਤੇ 2015 ਵਿੱਚ ਦੁਬਾਰਾ ਵਿਕਸਿਤ ਕੀਤਾ ਗਿਆ, ਦਾ ਨਾਮ ਦੱਖਣੀ ਵੇਲਜ਼ ਚਾਰਟਿਸਟਾਂ ਦੇ ਨੇਤਾਵਾਂ ਵਿੱਚੋਂ ਇੱਕ ਦੇ ਨਾਮ ਉੱਤੇ ਰੱਖਿਆ ਗਿਆ ਹੈ।",
    ur: "جان فراسٹ اسکوائر، جو اصل میں 1970 کی دہائی میں بنایا گیا تھا اور 2015 میں دوبارہ تیار کیا گیا تھا، کا نام ساؤتھ ویلز چارٹسٹوں کے ایک رہنما کے نام پر رکھا گیا ہے۔",
    hu: "Az eredetileg az 1970-es években létrehozott, majd 2015-ben felújított John Frost Square a dél-walesi chartisták egyik vezetőjéről kapta a nevét."
  },
  10: {
    en: "St Paul's Church opened in 1836. In April 1839, the Rev. James Francis, the church's first vicar, preached from Jeremiah 2:13, warning against 'foolish allegiances' with the Chartist Movement. Many Chartists in the congregation, including Henry Vincent, John Lovell and Charles Waters, sat in the pews in silent protest.",
    cy: "Agorodd Eglwys Sant Paul yn 1836. Ym mis Ebrill 1839, pregethodd y Parch. James Francis, ficer cyntaf yr eglwys, o Jeremeia 2:13, gan rybuddio yn erbyn 'teyrngarwch ffol' gyda Mudiad y Siartwyr.",
    pl: "Kościół św. Pawła otwarto w 1836 roku. W kwietniu 1839 roku ks. James Francis, pierwszy wikariusz kościoła, głosił kazanie z Jeremiasza 2:13, ostrzegając przed głupimi lojalnościami wobec ruchu czartystowskiego.",
    uk: "Церква Святого Павла була відкрита в 1836 році. У квітні 1839 року, преподобний Джеймс Френсіс, перший парох церкви, проповідував з Єремії 2:13, застерігаючи від нерозумної підтримки чартистського руху.",
    pa: "ਸੇਂਟ ਪੌਲ ਚਰਚ 1836 ਵਿੱਚ ਖੋਲ੍ਹਿਆ ਗਿਆ। ਅਪ੍ਰੈਲ 1839 ਵਿੱਚ, ਚਰਚ ਦੇ ਪਹਿਲੇ ਵਿਕਾਰ, ਰੇਵਰ ਜੇਮਜ਼ ਫ੍ਰਾਂਸਿਸ ਨੇ ਯਿਰਮਿਯਾਹ 2:13 ਤੋਂ ਪ੍ਰਚਾਰ ਕੀਤਾ।",
    ur: "سینٹ پال چرچ 1836 میں کھولا گیا۔ اپریل 1839 میں، چرچ کے پہلے وکر ریورنڈ جیمز فرانسس نے یرمیاہ 2:13 سے تبلیغ کی۔",
    hu: "A St. Paul's Church 1836-ban nyílt meg. 1839 áprilisában James Francis tiszteletes, az egyház első vikáriusa Jeremiás 2:13-ból prédikált."
  },
  11: {
    en: "Women contributed one in five of all signatures on the National Petition to Parliament in 1839, even though the Charter would not give them the vote. The seven mosaics on St. Paul's Walk honour 100 years of women's history and remember several significant Newport women including Mary Brewer and Joan Williams who supported the Chartists.",
    cy: "Cyfrannodd menywod un o bob pump o'r holl lofnodion ar y Ddeiseb Genedlaethol i'r Senedd yn 1839, er na fyddai'r Siarter yn rhoi'r bleidlais iddynt.",
    pl: "Kobiety złożyły jeden na pięć wszystkich podpisów pod Petycją Narodową do Parlamentu w 1839 roku, mimo że Karta nie dawałaby im prawa głosu.",
    uk: "Жінки поставили кожен п'ятий підпис під національною петицією до парламенту в 1839 році, хоча Хартія не давала їм права голосу.",
    pa: "ਔਰਤਾਂ ਨੇ 1839 ਵਿੱਚ ਸੰਸਦ ਨੂੰ ਦਿੱਤੀ ਗਈ ਰਾਸ਼ਟਰੀ ਪਟੀਸ਼ਨ 'ਤੇ ਸਾਰੇ ਦਸਤਖਤਾਂ ਵਿੱਚੋਂ ਪੰਜ ਵਿੱਚੋਂ ਇੱਕ ਦਾ ਯੋਗਦਾਨ ਪਾਇਆ।",
    ur: "خواتین نے 1839 میں پارلیمنٹ میں قومی پٹیشن پر دستخطوں میں سے پانچ میں سے ایک حصہ ڈالا۔",
    hu: "A nők 1839-ben a parlamenthez benyújtott nemzeti petíció minden ötödik aláírását adták."
  },
  12: {
    en: "At approximately 8am on Monday 4 November 1839, the Chartists paused at the Cwrt-y-bella weighing machine near this site, after walking through the night from the Valleys. They received news that troops had occupied the Westgate Inn. Led by Frost and Jack the Fifer, they marched in military formation towards the turnpike gate on Stow Hill.",
    cy: "Am oddeutu 8 o'r gloch fore Llun 4 Tachwedd 1839, seibiodd y Siartwyr wrth beiriant pwyso Cwrt-y-bella ger y safle hwn, ar ol cerdded drwy'r nos o'r Cymoedd.",
    pl: "Około godziny 8 rano w poniedziałek 4 listopada 1839 roku czartyści zatrzymali się przy wadze Cwrt-y-bella w pobliżu tego miejsca, po całonocnym marszu z dolin.",
    uk: "Приблизно о 8 годині ранку в понеділок, 4 листопада 1839 року, чартисти зупинилися біля зважувальної машини Cwrt-Y-Bella неподалік від цього місця, після нічного маршу з долин.",
    pa: "ਸੋਮਵਾਰ 4 ਨਵੰਬਰ 1839 ਨੂੰ ਸਵੇਰੇ ਲਗਭਗ 8 ਵਜੇ, ਚਾਰਟਿਸਟਾਂ ਨੇ ਘਾਟੀਆਂ ਤੋਂ ਰਾਤ ਭਰ ਤੁਰਨ ਤੋਂ ਬਾਅਦ, ਇਸ ਸਾਈਟ ਦੇ ਨੇੜੇ Cwrt-y-bella ਤੋਲਣ ਵਾਲੀ ਮਸ਼ੀਨ 'ਤੇ ਰੁਕਿਆ।",
    ur: "پیر 4 نومبر 1839 کی صبح تقریباً 8 بجے، چارٹسٹ وادیوں سے رات بھر چلنے کے بعد، اس سائٹ کے قریب Cwrt-y-bella وزنی مشین پر رک گئے۔",
    hu: "1839. november 4-én, hétfőn körülbelül reggel 8 órakor a Chartisták megálltak a Cwrt-y-bella mérlegnél e hely közelében, miután egész éjszaka gyalogoltak a völgyekből."
  },
  13: {
    en: "On 4th November 1839, the Chartists stopped to regroup at Cwrt-y-bella weighing machine which stood on Cardiff Road just below this site. After enjoying this beautiful park which opened in 1894, you can rejoin the Chartist Trail either at the car park gate, or at the bottom lodge gate.",
    cy: "Ar 4 Tachwedd 1839, stopiodd y Siartwyr i ail-grwpio wrth beiriant pwyso Cwrt-y-bella a oedd yn sefyll ar Cardiff Road ychydig islaw'r safle hwn.",
    pl: "4 listopada 1839 roku czartyści zatrzymali się, aby się przegrupować przy wadze Cwrt-y-bella, która stała na Cardiff Road tuż poniżej tego miejsca.",
    uk: "4 листопада 1839 року чартисти зупинилися для перегрупування біля зважувальної машини Cwrt-Y-Bella, яка стояла на Cariff Road трохи нижче цього місця.",
    pa: "4 ਨਵੰਬਰ 1839 ਨੂੰ, ਚਾਰਟਿਸਟਾਂ ਨੇ Cwrt-y-bella ਤੋਲਣ ਵਾਲੀ ਮਸ਼ੀਨ 'ਤੇ ਦੁਬਾਰਾ ਇਕੱਠੇ ਹੋਣ ਲਈ ਰੁਕਿਆ ਜੋ ਇਸ ਸਾਈਟ ਦੇ ਬਿਲਕੁਲ ਹੇਠਾਂ ਕਾਰਡਿਫ ਰੋਡ 'ਤੇ ਖੜ੍ਹੀ ਸੀ।",
    ur: "4 نومبر 1839 کو، چارٹسٹ Cwrt-y-bella وزنی مشین پر دوبارہ جمع ہونے کے لیے رکے جو اس سائٹ سے بالکل نیچے کارڈف روڈ پر کھڑی تھی۔",
    hu: "1839. november 4-én a Chartisták megálltak, hogy újra csoportosuljanak a Cwrt-y-bella mérlegnél, amely a Cardiff Roadon állt, közvetlenül e hely alatt."
  },
  14: {
    en: "Nearby stands the Friars which was built in the early 1840s for Octavius Morgan, magistrate, MP and eighth son of Sir Charles Morgan of Tredegar Park. He examined prisoners and witnesses after the Rising, served on the Grand Jury in Shire Hall, Monmouth, and campaigned against pardons for the Chartist leaders throughout the 1840s.",
    cy: "Gerllaw saif y Friars a adeiladwyd yn gynnar yn y 1840au ar gyfer Octavius Morgan, ynad, AS ac wythfed mab Syr Charles Morgan o Barc Tredegar.",
    pl: "W pobliżu stoi Friars, zbudowany na początku lat 40. XIX wieku dla Octaviusa Morgana, sędziego, posła i ósmego syna Sir Charlesa Morgana z Tredegar Park.",
    uk: "Неподалік стоїть монастир, побудований на початку 1840-х років для Октавія Моргана, судді, члена парламенту і восьмого сина сера Чарльза Моргана з Tredegar Park.",
    pa: "ਨੇੜੇ ਫ੍ਰਾਈਅਰਸ ਖੜ੍ਹਾ ਹੈ ਜੋ 1840 ਦੇ ਦਹਾਕੇ ਦੇ ਸ਼ੁਰੂ ਵਿੱਚ ਔਕਟੇਵੀਅਸ ਮੋਰਗਨ, ਮੈਜਿਸਟ੍ਰੇਟ, ਐਮਪੀ ਅਤੇ ਟ੍ਰੇਡੇਗਰ ਪਾਰਕ ਦੇ ਸਰ ਚਾਰਲਸ ਮੋਰਗਨ ਦੇ ਅੱਠਵੇਂ ਪੁੱਤਰ ਲਈ ਬਣਾਇਆ ਗਿਆ ਸੀ।",
    ur: "قریب ہی فریئرز کھڑا ہے جو 1840 کی دہائی کے اوائل میں آکٹیوئس مورگن، مجسٹریٹ، ایم پی اور ٹریڈیگر پارک کے سر چارلس مورگن کے آٹھویں بیٹے کے لیے بنایا گیا تھا۔",
    hu: "A közelben áll a Friars, amelyet az 1840-es évek elején építettek Octavius Morgan bírónak, parlamenti képviselőnek és Sir Charles Morgan nyolcadik fiának."
  },
  15: {
    en: "This was where Captain Stack and 70 infantrymen of the 45th Regiment were stationed in the new workhouse. As the Chartists passed the Stow Hill turnpike on the morning of 4 November, they could see the soldiers on guard at their makeshift barracks. After the Rising, the workhouse served as both a prison camp and hospital.",
    cy: "Dyma lle roedd Capten Stack a 70 o wyr traed y 45ain Gatrawd wedi'u lleoli yn y tloty newydd.",
    pl: "To tutaj kapitan Stack i 70 piechurów z 45. pułku było stacjonowanych w nowym przytułku. Gdy czartyści przeszli obok rogatki Stow Hill rano 4 listopada, mogli zobaczyć żołnierzy na straży przy ich prowizorycznych koszarach.",
    uk: "Саме тут розмістилися капітан Стек і 70 піхотинців 45-го полку. Проїжджаючи вранці 4 листопада повз поворот на Stow Hill, чартисти побачили солдатів, які чергували біля імпровізованих казарм.",
    pa: "ਇਹ ਉਹ ਥਾਂ ਸੀ ਜਿੱਥੇ ਕੈਪਟਨ ਸਟੈਕ ਅਤੇ 45ਵੀਂ ਰੈਜੀਮੈਂਟ ਦੇ 70 ਪੈਦਲ ਜਵਾਨ ਨਵੇਂ ਵਰਕਹਾਊਸ ਵਿੱਚ ਤਾਇਨਾਤ ਸਨ।",
    ur: "یہ وہ جگہ تھی جہاں نئے ورک ہاؤس میں کیپٹن اسٹیک اور 45ویں رجمنٹ کے 70 انفنٹری مین تعینات تھے۔",
    hu: "Itt volt állomásozva Stack kapitány és a 45. ezred 70 gyalogosa az új munkaházban."
  },
  16: {
    en: "The Chartist force of more than 5000 men passed through here on the morning of November 4th before marching down Stow Hill and into the town.",
    cy: "Fe basiodd llur Siartwyr o fwy na 5000 o ddynion yma ar fore Tachwedd 4ydd cyn martsio i lawr Stow Hill ac i mewn i'r dref.",
    pl: "Siły czartystów liczące ponad 5000 ludzi przeszły tędy rano 4 listopada, zanim zeszły Stow Hill i wkroczyły do miasta.",
    uk: "Чартисти, чисельністю понад 5000 чоловік, пройшли тут вранці 4 листопада перед тим, як вирушити вниз по Stow Hill до міста.",
    pa: "5000 ਤੋਂ ਵੱਧ ਆਦਮੀਆਂ ਦੀ ਚਾਰਟਿਸਟ ਫੋਰਸ 4 ਨਵੰਬਰ ਦੀ ਸਵੇਰ ਨੂੰ ਸਟੋ ਹਿੱਲ ਅਤੇ ਸ਼ਹਿਰ ਵਿੱਚ ਮਾਰਚ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ ਇੱਥੋਂ ਲੰਘੀ।",
    ur: "5000 سے زیادہ آدمیوں پر مشتمل چارٹسٹ فورس 4 نومبر کی صبح یہاں سے گزری اور سٹو ہل پر مارچ کرنے سے پہلے۔",
    hu: "A több mint 5000 fős chartista haderő november 4-én reggel haladt át itt, mielőtt levonult a Stow Hill-ről a városba."
  },
  17: {
    en: "After the Newport Rising in 1839, 18 year-old Susan Stephens gave testimony to Newport Magistrates, stating that she '...saw the prisoner Lovell passing her house the Six Bells on Stow Hill with a crowd with a gun in his hand.'",
    cy: "Ar ol Gwrthryfel Casnewydd yn 1839, rhoddodd Susan Stephens, 18 oed, dystiolaeth i Ynadon Casnewydd.",
    pl: "Po Powstaniu w Newport w 1839 roku, 18-letnia Susan Stephens złożyła zeznanie przed sędziami Newport, mówiąc, że widziała więźnia Lovella przechodzącego obok jej domu Six Bells na Stow Hill z tłumem, z bronią w ręku.",
    uk: "Після ньюпортського повстання 1839 року, 18-річна Сьюзен Стівенс дала свідчення ньюпортському магістрату.",
    pa: "1839 ਦੇ ਨਿਊਪੋਰਟ ਰਾਈਜ਼ਿੰਗ ਤੋਂ ਬਾਅਦ, 18 ਸਾਲ ਦੀ ਸੂਜ਼ਨ ਸਟੀਫਨਜ਼ ਨੇ ਨਿਊਪੋਰਟ ਮੈਜਿਸਟ੍ਰੇਟ ਨੂੰ ਗਵਾਹੀ ਦਿੱਤੀ।",
    ur: "1839 کے نیوپورٹ رائزنگ کے بعد، 18 سالہ سوسن سٹیفنز نے نیوپورٹ مجسٹریٹس کے سامنے گواہی دی۔",
    hu: "Az 1839-es Newport-felkelés után a 18 éves Susan Stephens tanúvallomást tett Newport Magistratesnek."
  },
  18: {
    en: "On 11 August 1839, a large group of Chartists attended a service at St. Woolos. During the night of Thursday 7 November 1839, the authorities moved the bodies of ten Chartists from the stables of the Westgate Inn. They buried them in four unmarked graves in St Woolos Churchyard, on the north side of St. Mary's Chapel.",
    cy: "Ar 11 Awst 1839, mynychodd grŵp mawr o Siartwyr wasanaeth yn Sant Gwynllyw. Yn ystod nos Iau 7 Tachwedd 1839, symudodd yr awdurdodau gyrff deg Siartwraig o stablau'r Westgate Inn.",
    pl: "11 sierpnia 1839 roku duża grupa czartystów uczestniczyła w nabożeństwie w St. Woolos. W nocy z czwartku 7 listopada 1839 roku władze przeniosły ciała dziesięciu czartystów ze stajni Westgate Inn.",
    uk: "11 серпня 1839 року, велика група чартистів відвідала службу в церкві Святого Вулоса. У ніч на четвер, 7 листопада 1839 року, влада перенесла тіла десяти чартистів з конюшні готелю Вестгейт.",
    pa: "11 ਅਗਸਤ 1839 ਨੂੰ, ਚਾਰਟਿਸਟਾਂ ਦਾ ਇੱਕ ਵੱਡਾ ਸਮੂਹ ਸੇਂਟ ਵੂਲੋਸ ਵਿਖੇ ਇੱਕ ਸੇਵਾ ਵਿੱਚ ਸ਼ਾਮਲ ਹੋਇਆ।",
    ur: "11 اگست 1839 کو، چارٹسٹوں کے ایک بڑے گروپ نے سینٹ وولوس میں ایک سروس میں شرکت کی۔",
    hu: "1839. augusztus 11-én chartisták nagy csoportja vett részt egy istentiszteleten St. Woolosban."
  },
  19: {
    en: "In 1839, Edward Hopkins, the Superintendent of the Newport Police who arrested Frost after the Rising, lived in a house at this site. It also served as a police station. After the battle at the Westgate, more than 150 weapons abandoned by the Chartists were collected and brought to Hopkins' home.",
    cy: "Ym 1839 roedd Edward Hopkins, Uwcharolygydd Heddlu Casnewydd a arestiodd Frost ar ol y Gwrthryfel, yn byw mewn ty ar y safle hwn.",
    pl: "W 1839 roku Edward Hopkins, nadinspektor policji w Newport, który aresztował Frosta po powstaniu, mieszkał w domu na tym miejscu. Służył on również jako komisariat policji.",
    uk: "У 1839 році, Едвард Гопкінс, керівник поліції Ньюпорта, який заарештував Фроста після повстання, жив у будинку на цій ділянці.",
    pa: "1839 ਵਿੱਚ, ਨਿਊਪੋਰਟ ਪੁਲਿਸ ਦਾ ਸੁਪਰਡੈਂਟ ਐਡਵਰਡ ਹੌਪਕਿਨਜ਼, ਜਿਸਨੇ ਰਾਈਜ਼ਿੰਗ ਤੋਂ ਬਾਅਦ ਫਰੌਸਟ ਨੂੰ ਗ੍ਰਿਫਤਾਰ ਕੀਤਾ ਸੀ, ਇਸ ਸਾਈਟ 'ਤੇ ਇੱਕ ਘਰ ਵਿੱਚ ਰਹਿੰਦਾ ਸੀ।",
    ur: "1839 میں نیوپورٹ پولیس کا سپرنٹنڈنٹ ایڈورڈ ہاپکنز جس نے فراسٹ کو رائزنگ کے بعد گرفتار کیا تھا، اس جگہ پر ایک مکان میں رہتے تھے۔",
    hu: "1839-ben Edward Hopkins, a Newport-i rendőrség felügyelője, aki a felkelés után letartóztatta Frostot, egy házban lakott ezen a helyen."
  },
  20: {
    en: "The church was under construction at the time and the marchers called on the workmen to join them. A carpenter slammed the church doors shut to prevent the Chartists from entering and it is rumoured that some Chartists hid behind the altar after the battle at the Westgate to avoid detection by the soldiers and special constables.",
    cy: "Roedd yr eglwys yn cael ei hadeiladu ar y pryd a galwodd y gorymdeithwyr ar y gweithwyr i ymuno a nhw.",
    pl: "Kościół był wówczas w budowie, a maszerujący wzywali robotników, by się do nich przyłączyli. Stolarz zatrzasnął drzwi kościoła, by uniemożliwić wejście czartystom.",
    uk: "У той час, церква перебувала на стадії будівництва, і учасники маршу закликали робітників приєднатися до них.",
    pa: "ਉਸ ਸਮੇਂ ਚਰਚ ਉਸਾਰੀ ਅਧੀਨ ਸੀ ਅਤੇ ਮਾਰਚ ਕਰਨ ਵਾਲਿਆਂ ਨੇ ਮਜ਼ਦੂਰਾਂ ਨੂੰ ਉਨ੍ਹਾਂ ਨਾਲ ਜੁੜਨ ਲਈ ਕਿਹਾ।",
    ur: "چرچ اس وقت زیر تعمیر تھا اور مارچ کرنے والوں نے مزدوروں کو ان کے ساتھ شامل ہونے کی دعوت دی۔",
    hu: "Az egyház akkoriban még építés alatt állt, és a felvonulók felszólították a munkásokat, hogy csatlakozzanak hozzájuk."
  },
  21: {
    en: "Mayor Thomas Phillips' house was at the bottom of Stow Hill facing the Westgate Hotel. Wounded during the attack on the Westgate Hotel, Phillips received a knighthood for defending the authority of Her Majesty.",
    cy: "Roedd ty'r Maer Thomas Phillips ar waelod Stow Hill yn wynebu Gwesty'r Westgate. Wedi'i anafu yn ystod yr ymosodiad ar Westy'r Westgate, derbyniodd Phillips farchogaeth am amddiffyn awdurdod Ei Mawrhydi.",
    pl: "Dom burmistrza Thomasa Phillipsa znajdował się u podnóża Stow Hill, naprzeciwko Westgate Hotel. Ranny podczas ataku na Westgate Hotel, Phillips otrzymał tytuł szlachecki za obronę autorytetu Jej Królewskiej Mości.",
    uk: "Будинок мера Томаса Філліпса знаходився внизу Stow Hill, навпроти готелю Вестгейт. Поранений під час нападу на готель Вестгейт, Філліпс отримав лицарський титул за захист влади Її Величності.",
    pa: "ਮੇਅਰ ਥਾਮਸ ਫਿਲਿਪਸ ਦਾ ਘਰ ਸਟੋ ਹਿੱਲ ਦੇ ਹੇਠਾਂ ਵੈਸਟਗੇਟ ਹੋਟਲ ਦੇ ਸਾਹਮਣੇ ਸੀ।",
    ur: "میئر تھامس فلپس کا گھر سٹو ہل کے نیچے ویسٹ گیٹ ہوٹل کی طرف تھا۔",
    hu: "Thomas Phillips polgármester háza a Stow Hill alján volt, szemben a Westgate szállodával."
  }
};

function getStopTitle(stop: any, lang: Lang): string {
  if (lang === "en") return stop.title;
  const key = "title_" + lang;
  return stop[key] || stop.title;
}

function getDescription(num: number, lang: Lang): string {
  const desc = descriptions[num];
  if (!desc) return "Historic Chartist location";
  return desc[lang] || desc.en;
}

export default function StopPage({ lang }: { lang: Lang }) {
  const { number } = useParams();
  const n = Number(number);
  const { data, err, loading } = useTrail();

  if (loading) {
    return (
      <div style={{ padding: 24, background: "#ede532", minHeight: "100vh" }}>
        <p style={{ fontSize: 18, color: "#000000" }}>Loading...</p>
      </div>
    );
  }

  if (err || !data) {
    return (
      <div style={{ padding: 24, background: "#ede532", minHeight: "100vh" }}>
        <p style={{ color: "#000000" }}>Could not load trail data.</p>
        <Link to="/trail" style={{ color: "#000000", fontWeight: "bold" }}>{t(lang, "backToTrail")}</Link>
      </div>
    );
  }

  const trail = data.trails[0];
  const stop = trail.stops.find((s) => s.number === n);

  if (!stop) {
    return (
      <div style={{ padding: 24, background: "#ede532", minHeight: "100vh" }}>
        <p style={{ color: "#000000" }}>Stop not found.</p>
        <Link to="/trail" style={{ color: "#000000", fontWeight: "bold" }}>{t(lang, "backToTrail")}</Link>
      </div>
    );
  }

  const title = getStopTitle(stop, lang);
  const description = getDescription(n, lang);
  const wix = lang === "cy" && stop.wixUrl_cy ? stop.wixUrl_cy : stop.wixUrl;
  const mapsUrl = "https://www.google.com/maps/dir/?api=1&destination=" + stop.lat + "," + stop.lng;
  const totalStops = trail.stops.length;

  const hasAudioFiles = stop.audioFiles && stop.audioFiles.length > 0;
  const hasLegacyAudio = stop.audioUrl && stop.audioUrl.length > 0;

  return (
    <div style={{ background: "#ede532", minHeight: "100vh", padding: 16 }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        
        <Link to="/trail" style={{ display: "inline-block", color: "#000000", fontWeight: "bold", fontSize: 16, textDecoration: "none", marginBottom: 16 }}>
          ← {t(lang, "backToTrail")}
        </Link>

        <div style={{ background: "#ffffff", border: "3px solid #000000", borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <div style={{ display: "flex", gap: 16, alignItems: "flex-start", marginBottom: 16 }}>
            <div style={{ background: "#000000", color: "#ede532", width: 60, height: 60, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: "bold", flexShrink: 0 }}>
              {stop.number}
            </div>
            <h1 style={{ margin: 0, fontSize: 24, fontWeight: "bold", color: "#000000", lineHeight: 1.2 }}>
              {title}
            </h1>
          </div>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: "#333333", margin: 0 }}>
            {description}
          </p>
        </div>

        {/* Images section */}
        <div style={{ background: "#ffffff", border: "3px solid #000000", borderRadius: 12, padding: 20, marginBottom: 16 }}>
          <h2 style={{ margin: "0 0 12px 0", fontSize: 18, color: "#000000" }}>{t(lang, "images")}</h2>
          {stop.imageUrls && stop.imageUrls.length > 0 ? (
            <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 8 }}>
              {stop.imageUrls.map((u, idx) => (
                <img key={idx} src={u} alt="" style={{ height: 180, borderRadius: 8, border: "2px solid #000000", objectFit: "cover" }} />
              ))}
            </div>
          ) : (
            <p style={{ margin: 0, color: "#666666", fontSize: 15 }}>{t(lang, "imagesComingSoon")}</p>
          )}
        </div>

        {/* Audio section */}
        <div style={{ background: "#ffffff", border: "3px solid #000000", borderRadius: 12, padding: 20, marginBottom: 16 }}>
          <h2 style={{ margin: "0 0 12px 0", fontSize: 18, color: "#000000" }}>{t(lang, "audio")}</h2>
          {hasAudioFiles ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {stop.audioFiles!.map((audio, idx) => (
                <div key={idx} style={{ background: "#f5f5f5", borderRadius: 8, padding: 12 }}>
                  <h3 style={{ margin: "0 0 4px 0", fontSize: 15, color: "#000000", fontWeight: "bold" }}>
                    {lang === "cy" && audio.title_cy ? audio.title_cy : audio.title}
                  </h3>
                  {(audio.description || audio.description_cy) && (
                    <p style={{ margin: "0 0 8px 0", fontSize: 13, color: "#666666" }}>
                      {lang === "cy" && audio.description_cy ? audio.description_cy : audio.description}
                    </p>
                  )}
                  <audio controls src={audio.url} style={{ width: "100%" }} />
                </div>
              ))}
            </div>
          ) : hasLegacyAudio ? (
            <audio controls src={stop.audioUrl} style={{ width: "100%" }} />
          ) : (
            <p style={{ margin: 0, color: "#666666", fontSize: 15 }}>{t(lang, "audioComingSoon")}</p>
          )}
        </div>

        {/* Video section */}
        <div style={{ background: "#ffffff", border: "3px solid #000000", borderRadius: 12, padding: 20, marginBottom: 16 }}>
          <h2 style={{ margin: "0 0 12px 0", fontSize: 18, color: "#000000" }}>{t(lang, "video")}</h2>
          {stop.videoUrl ? (
            <a href={stop.videoUrl} target="_blank" rel="noreferrer" style={{ display: "inline-block", background: "#000000", color: "#ede532", padding: "12px 20px", borderRadius: 8, textDecoration: "none", fontSize: 15, fontWeight: "bold" }}>
              {t(lang, "watchVideo")}
            </a>
          ) : (
            <p style={{ margin: 0, color: "#666666", fontSize: 15 }}>{t(lang, "videoComingSoon")}</p>
          )}
        </div>

        {/* Action buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
          <a href={mapsUrl} target="_blank" rel="noreferrer" style={{ display: "block", background: "#000000", color: "#ede532", padding: "14px 20px", borderRadius: 8, textDecoration: "none", fontSize: 17, fontWeight: "bold", textAlign: "center" }}>
            {t(lang, "getDirections")}
          </a>
          {wix && (
            <a href={wix} target="_blank" rel="noreferrer" style={{ display: "block", background: "#ffffff", color: "#000000", border: "3px solid #000000", padding: "12px 20px", borderRadius: 8, textDecoration: "none", fontSize: 17, fontWeight: "bold", textAlign: "center" }}>
              {t(lang, "readMoreOnWebsite")}
            </a>
          )}
        </div>

        {/* Community Content section */}
        <div style={{ background: "#ffffff", border: "3px solid #000000", borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ margin: "0 0 8px 0", fontSize: 18, color: "#000000" }}>{t(lang, "communityContent")}</h2>
          <p style={{ fontSize: 13, color: "#666666", marginBottom: 16 }}>{t(lang, "communityContentDesc")}</p>
          
          {stop.communityContent && stop.communityContent.length > 0 ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 12 }}>
              {stop.communityContent.map((item: { imageUrl?: string; text?: string; author?: string }, idx: number) => (
                <div key={idx} style={{ background: "#f5f5f5", borderRadius: 8, overflow: "hidden" }}>
                  {item.imageUrl && <img src={item.imageUrl} alt="" style={{ width: "100%", height: 140, objectFit: "cover" }} />}
                  {item.text && <p style={{ margin: 0, padding: 8, fontSize: 13, color: "#333333" }}>{item.text}</p>}
                  {item.author && <p style={{ margin: 0, padding: "0 8px 8px 8px", fontSize: 11, color: "#666666" }}>- {item.author}</p>}
                </div>
              ))}
            </div>
          ) : (
            <p style={{ margin: 0, color: "#666666", fontSize: 14, fontStyle: "italic" }}>{t(lang, "beFirstToShare")}</p>
          )}
          
          <a 
            href={"mailto:community@newportrising.co.uk?subject=Community Content - Stop " + n + " - " + stop.title}
            style={{ display: "inline-block", marginTop: 16, background: "#ede532", color: "#000000", border: "2px solid #000000", padding: "10px 18px", borderRadius: 8, textDecoration: "none", fontSize: 14, fontWeight: "bold" }}
          >
            {t(lang, "submitYourContent")}
          </a>
        </div>

        {/* Navigation */}
        <div style={{ display: "flex", gap: 12, justifyContent: "space-between" }}>
          {n > 1 ? (
            <Link to={"/stop/" + (n - 1)} style={{ display: "block", background: "#ffffff", color: "#000000", border: "3px solid #000000", padding: "12px 18px", borderRadius: 8, textDecoration: "none", fontSize: 15, fontWeight: "bold", textAlign: "center", flex: 1 }}>
              ← {t(lang, "previous")}
            </Link>
          ) : <div style={{ flex: 1 }} />}

          {n < totalStops ? (
            <Link to={"/stop/" + (n + 1)} style={{ display: "block", background: "#ffffff", color: "#000000", border: "3px solid #000000", padding: "12px 18px", borderRadius: 8, textDecoration: "none", fontSize: 15, fontWeight: "bold", textAlign: "center", flex: 1 }}>
              {t(lang, "next")} →
            </Link>
          ) : <div style={{ flex: 1 }} />}
        </div>

        <p style={{ textAlign: "center", marginTop: 16, fontSize: 14, color: "#000000" }}>
          {t(lang, "stop")} {n} {t(lang, "of")} {totalStops}
        </p>
      </div>
    </div>
  );
}
