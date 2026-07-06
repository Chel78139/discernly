import type {
  Alternative,
  Association,
  Product,
  ProductAlternativeMapEntry,
} from "@/types/data";

// Seed data hand-mapped from starter-product-data.csv and the follow-up
// starter-product-data_1.csv update, applying the sourcing standard in the
// project brief: only tier-1 (documented fact) and tier-2 (contested/
// opinion) claims are published. Tier-3 rows (Method everyday cleaners,
// Earth Mama Organics, Hello Bello) and superseded rows (the original
// Pacifica Aromapower / Boll Weevil pairing) are intentionally left out —
// "a wrong answer is 10x worse than a blank."
//
// Row 21 (Earth & Eden) is not a flagged product; it appears only as an
// alternative for The Honest Company.
//
// Amazon links: only alternatives with a confirmed ASIN get a working
// amazon.com/dp/<asin> link (see src/lib/affiliate.ts). Everything else
// has asin: null and shows a clearly marked "Amazon link coming soon"
// state in the UI rather than a guessed link.

const img = (label: string) =>
  `https://via.placeholder.com/400x600/CCCCCC/6B6B6B?text=${encodeURIComponent(
    label,
  )}`;

const DATE_CHECKED = "2026-07-01";
const DATE_CHECKED_UPDATE = "2026-07-03";

export const products: Product[] = [
  {
    id: "arm-hammer-baking-soda",
    slug: "arm-hammer-baking-soda",
    name: "Baking Soda",
    brand: "Arm & Hammer",
    category: "Household & Cleaning",
    imageUrl: img("Arm & Hammer Baking Soda"),
  },
  {
    id: "dr-bronners-castile-soap",
    slug: "dr-bronners-castile-soap",
    name: "Pure-Castile Soap",
    brand: "Dr. Bronner's",
    category: "Soap & Body",
    imageUrl: img("Dr. Bronner's Castile Soap"),
  },
  {
    id: "method-shower-readings",
    slug: "method-shower-readings",
    name: "Shower Readings Collection Body Wash",
    brand: "Method",
    category: "Soap & Body",
    imageUrl: img("Method Shower Readings"),
  },
  {
    id: "mr-clean-all-purpose-cleaner",
    slug: "mr-clean-all-purpose-cleaner",
    name: "All-Purpose Cleaner",
    brand: "Mr. Clean",
    category: "Household & Cleaning",
    imageUrl: img("Mr. Clean All-Purpose"),
  },
  {
    id: "ajax-powder-cleanser",
    slug: "ajax-powder-cleanser",
    name: "Powder Cleanser / Dish Detergent",
    brand: "Ajax",
    category: "Household & Cleaning",
    imageUrl: img("Ajax Powder Cleanser"),
  },
  {
    id: "oatey-hercules-drain-opener",
    slug: "oatey-hercules-drain-opener",
    name: "Drain Opener / Pipe Cleaner",
    brand: "Hercules (Oatey)",
    category: "Household & Cleaning",
    imageUrl: img("Hercules Drain Opener"),
  },
  {
    id: "pacifica-aromapower",
    slug: "pacifica-aromapower",
    name: "Aromapower Perfume/Fragrance Line",
    brand: "Pacifica Beauty",
    category: "Beauty & Fragrance",
    imageUrl: img("Pacifica Aromapower"),
    aliases: [
      "pacifica perfume",
      "pacifica aromapower",
      "pacifica fragrance",
      "pacifica crystal perfume",
    ],
  },
  {
    id: "yogi-tea-herbal-blend",
    slug: "yogi-tea-herbal-blend",
    name: "Herbal Tea Blend",
    brand: "Yogi Tea",
    category: "Food & Beverage",
    imageUrl: img("Yogi Herbal Tea"),
  },
  {
    id: "liquid-death-water",
    slug: "liquid-death-water",
    name: "Canned/Bottled Water",
    brand: "Liquid Death",
    category: "Food & Beverage",
    imageUrl: img("Liquid Death Water"),
  },
  {
    id: "gaia-herbs-supplements",
    slug: "gaia-herbs-supplements",
    name: "Herbal Supplements",
    brand: "Gaia Herbs",
    category: "Supplements",
    imageUrl: img("Gaia Herbs Supplements"),
  },
  {
    id: "mr-clean-magic-eraser",
    slug: "mr-clean-magic-eraser",
    name: "Magic Eraser",
    brand: "Mr. Clean",
    category: "Household & Cleaning",
    imageUrl: img("Mr. Clean Magic Eraser"),
  },
  {
    id: "mr-clean-clean-freak-spray",
    slug: "mr-clean-clean-freak-spray",
    name: "Multi-Surface / Clean Freak Spray",
    brand: "Mr. Clean",
    category: "Household & Cleaning",
    imageUrl: img("Mr. Clean Clean Freak"),
  },
  {
    id: "seventh-generation-laundry",
    slug: "seventh-generation-laundry",
    name: "Laundry Detergent (all SKUs)",
    brand: "Seventh Generation",
    category: "Household & Cleaning",
    imageUrl: img("Seventh Generation Laundry"),
    aliases: [
      "7th generation",
      "seventh generation",
      "7th gen",
      "7th generation laundry",
      "seventh generation laundry detergent",
    ],
  },
  {
    id: "starbucks-coffee",
    slug: "starbucks-coffee",
    name: "Coffee (all SKUs)",
    brand: "Starbucks",
    category: "Food & Beverage",
    imageUrl: img("Starbucks Coffee"),
  },
  {
    id: "death-wish-coffee",
    slug: "death-wish-coffee",
    name: "Death Wish Coffee (all SKUs)",
    brand: "Death Wish Coffee",
    category: "Food & Beverage",
    imageUrl: img("Death Wish Coffee"),
  },
  {
    id: "honest-company-baby",
    slug: "honest-company-baby",
    name: "Diapers, Wipes, Baby Lotion, Baby Wash",
    brand: "The Honest Company",
    category: "Baby Products",
    imageUrl: img("The Honest Company"),
  },
  {
    id: "arm-hammer-laundry-detergent",
    slug: "arm-hammer-laundry-detergent",
    name: "Laundry Detergent",
    brand: "Arm & Hammer",
    category: "Household & Cleaning",
    imageUrl: img("Arm & Hammer Laundry Detergent"),
    aliases: [
      "arm and hammer laundry",
      "arm & hammer laundry",
      "arm and hammer laundry detergent",
    ],
  },
  {
    id: "ajax-dishwasher-pods",
    slug: "ajax-dishwasher-pods",
    name: "Dish Detergent / Dishwasher Pods",
    brand: "Ajax",
    category: "Household & Cleaning",
    imageUrl: img("Ajax Dishwasher Pods"),
    aliases: [
      "ajax dish soap",
      "ajax dishwasher",
      "ajax dishwasher pods",
      "ajax dish detergent",
    ],
  },
  {
    id: "seventh-generation-dishwasher-pods",
    slug: "seventh-generation-dishwasher-pods",
    name: "Dish Detergent / Dishwasher Pods",
    brand: "Seventh Generation",
    category: "Household & Cleaning",
    imageUrl: img("Seventh Generation Dishwasher Pods"),
    aliases: [
      "7th generation",
      "seventh generation",
      "7th gen",
      "7th generation dish soap",
      "7th generation dishwasher pods",
      "seventh generation dish detergent",
      "seventh generation dishwasher",
    ],
  },
  {
    id: "nyx-makeup",
    slug: "nyx-makeup",
    name: "Makeup (all SKUs — lip, eye, face)",
    brand: "NYX Professional Makeup",
    category: "Beauty & Makeup",
    imageUrl: img("NYX Makeup"),
    aliases: ["nyx", "nyx makeup", "nyx lipstick", "nyx foundation"],
  },
  {
    id: "urban-decay-makeup",
    slug: "urban-decay-makeup",
    name: "Makeup (Vice palettes, Perversion mascara, Naked palettes)",
    brand: "Urban Decay",
    category: "Beauty & Makeup",
    imageUrl: img("Urban Decay Makeup"),
    aliases: [
      "urban decay",
      "urban decay palette",
      "naked palette",
      "urban decay mascara",
      "vice palette",
    ],
  },
  {
    id: "moon-juice-supplements",
    slug: "moon-juice-supplements",
    name: "Supplements / Adaptogens / Beauty Powders (all SKUs)",
    brand: "Moon Juice",
    category: "Supplements",
    imageUrl: img("Moon Juice"),
    aliases: [
      "moon juice",
      "moon juice powder",
      "moon juice adaptogen",
      "moon juice beauty dust",
    ],
  },
  {
    id: "mugler-angel",
    slug: "mugler-angel",
    name: "Angel Eau de Parfum (all sizes)",
    brand: "Mugler",
    category: "Beauty & Fragrance",
    imageUrl: img("Mugler Angel"),
    aliases: [
      "mugler angel",
      "angel perfume",
      "thierry mugler angel",
      "angel eau de parfum",
    ],
  },
  {
    id: "gillette-venus",
    slug: "gillette-venus",
    name: "Venus Razors (all SKUs)",
    brand: "Gillette Venus",
    category: "Beauty & Personal Care",
    imageUrl: img("Gillette Venus"),
    aliases: ["gillette venus", "venus razor", "venus shaver"],
  },
];

export const associations: Association[] = [
  {
    id: "assoc-arm-hammer",
    productId: "arm-hammer-baking-soda",
    claimText:
      "Logo depicts Vulcan, the Roman god of fire and metalworking — confirmed by the company's own brand history.",
    sourceUrls: [
      "https://www.armandhammer.com/en/about-us",
      "https://en.wikipedia.org/wiki/Arm_%26_Hammer",
      "https://en.wikipedia.org/wiki/Vulcan_(mythology)",
    ],
    confidenceTier: 1,
    themeTag: "roman-mythology",
    dateChecked: DATE_CHECKED,
  },
  {
    id: "assoc-dr-bronners",
    productId: "dr-bronners-castile-soap",
    claimText:
      "Founder Emanuel Bronner built the brand around a universalist \"All-One-God-Faith\" philosophy explicitly blending Judaism, Islam, and Christianity, not centered on Christianity specifically.",
    sourceUrls: [
      "https://www.ucpress.edu/blog-posts/how-californias-dr-bronners-spiritual-messaging-became-a-global-brand",
      "https://en.wikipedia.org/wiki/Emanuel_Bronner",
      "https://info.drbronner.com/all-one-blog/2016/11/whole-crazy-trip-started/",
    ],
    confidenceTier: 1,
    themeTag: "universalist-syncretism",
    dateChecked: DATE_CHECKED,
  },
  {
    id: "assoc-method-shower-readings",
    productId: "method-shower-readings",
    claimText:
      "Entire collection is structured as a tarot-style \"deck\" of named fortune cards (The Illusionist, The Sovereign, The Sage, and more). Each bottle includes a QR code for a \"shower reading\" and a daily \"manifestation.\" Method's own product copy reads: \"Are you ready to hear your fortune? Shoot for the stars today with a body wash that offers a glimpse into your future.\" This is scoped to the limited-edition Shower Readings line only — Method's everyday cleaners carry no such theme and are not flagged.",
    sourceUrls: [
      "https://methodproducts.com/pages/shower-readings",
      "https://www.ulta.com/p/limited-edition-shower-readings-body-wash-pimprod2052565",
    ],
    confidenceTier: 1,
    themeTag: "fortune-telling",
    dateChecked: DATE_CHECKED,
  },
  {
    id: "assoc-mr-clean-apc",
    productId: "mr-clean-all-purpose-cleaner",
    claimText:
      "The mascot was deliberately designed as a genie at P&G's own direction. A 2014 NYT obituary for original illustrator Richard Black quotes P&G's communications manager: the company wanted \"magic from a bottle\" represented by a genie, and the artist was directed to draw one. Genies/jinn originate in Arabic and Islamic folklore.",
    sourceUrls: [
      "https://en.wikipedia.org/wiki/Mr._Clean",
    ],
    confidenceTier: 1,
    themeTag: "islamic-folklore",
    dateChecked: DATE_CHECKED,
  },
  {
    id: "assoc-ajax",
    productId: "ajax-powder-cleanser",
    claimText:
      "Named after Ajax (Telamonian Ajax), Greek mythological hero of the Trojan War, second in strength only to Achilles. Current marketing leans into it directly: \"Stronger than dirt,\" with copy describing customers as \"everyday heroes.\"",
    sourceUrls: [
      "https://en.wikipedia.org/wiki/Ajax_the_Great",
      "https://greekcitytimes.com/2022/06/03/hidden-ancient-greek-meaning-behind-ajax-brand-name/",
    ],
    confidenceTier: 1,
    themeTag: "greek-mythology",
    dateChecked: DATE_CHECKED,
  },
  {
    id: "assoc-hercules",
    productId: "oatey-hercules-drain-opener",
    claimText:
      "Directly named after the Greek/Roman hero Hercules. The company's own current product pages use the line \"Behold the power of Hercules, products built to last and trusted by plumbers.\"",
    sourceUrls: [
      "https://www.oatey.com/products/hercules-glug-kitchen-liquid-drain-opener--782826565",
    ],
    confidenceTier: 1,
    themeTag: "greek-mythology",
    dateChecked: DATE_CHECKED,
  },
  {
    id: "assoc-pacifica-aromapower",
    productId: "pacifica-aromapower",
    claimText:
      "Entire product line is built around named crystals with stated metaphysical properties (rose quartz for \"joy,\" amethyst for \"dream state,\" peridot for \"balance and control your thoughts\"). Marketing copy: \"Call in your crystal super power. Crystal-infused and plant-powered.\"",
    sourceUrls: [
      "https://www.pacificabeauty.com/collections/aromapower",
      "https://www.ulta.com/brand/pacifica?category=fragrance",
    ],
    confidenceTier: 1,
    themeTag: "crystal-metaphysics",
    dateChecked: DATE_CHECKED,
  },
  {
    id: "assoc-yogi-tea",
    productId: "yogi-tea-herbal-blend",
    claimText:
      "Founded by Yogi Bhajan, who introduced Kundalini Yoga to the US; the tea recipe and brand are explicitly built on Ayurvedic philosophy. The company's own \"our story\" copy still cites Ayurveda as the foundation.",
    sourceUrls: ["https://en.wikipedia.org/wiki/Yogi_Tea"],
    confidenceTier: 1,
    themeTag: "ayurvedic",
    dateChecked: DATE_CHECKED,
  },
  {
    id: "assoc-liquid-death",
    productId: "liquid-death-water",
    claimText:
      "Documented marketing campaigns built on witchcraft/occult themes: the company hired a self-described witch doctor in 2019 to publicly \"hex\" inventory as a Halloween stunt, and sold \"sell your soul\" branded merchandise with a mock contract for the buyer's \"Eternal Soul.\" These campaigns themselves are documented fact; describing the brand as \"satanic\" is contested commentary, not a company statement.",
    sourceUrls: [
      "https://www.adweek.com/creativity/drink-at-your-own-risk-liquid-death-hires-witch-doctor-to-hex-its-water/",
      "https://www.westernjournal.com/liquid-death-water-brand-offered-buy-customers-souls-even-offers-contract-put-satanic-deal-writing/",
    ],
    confidenceTier: 2,
    themeTag: "occult-marketing",
    dateChecked: DATE_CHECKED,
  },
  {
    id: "assoc-gaia-herbs",
    productId: "gaia-herbs-supplements",
    claimText:
      "Named directly after Gaia, the Greek primordial Earth goddess and mother of all life in Greek mythology. Confirmed by the founder's own company history (founded 1986/1987 by herbalist Ric Scalzo).",
    sourceUrls: [
      "https://www.peoplespharmacy.com/articles/introducing-gaia-herbs",
    ],
    confidenceTier: 1,
    themeTag: "greek-mythology",
    dateChecked: DATE_CHECKED,
  },
  {
    id: "assoc-mr-clean-magic-eraser",
    productId: "mr-clean-magic-eraser",
    claimText:
      "Same brand-wide genie mascot association as Mr. Clean's All-Purpose Cleaner — P&G's own communications manager confirmed to the NYT that the mascot was deliberately designed as a genie.",
    sourceUrls: ["https://en.wikipedia.org/wiki/Mr._Clean"],
    confidenceTier: 1,
    themeTag: "islamic-folklore",
    dateChecked: DATE_CHECKED,
  },
  {
    id: "assoc-mr-clean-freak-spray",
    productId: "mr-clean-clean-freak-spray",
    claimText:
      "Same brand-wide genie mascot association as Mr. Clean's All-Purpose Cleaner.",
    sourceUrls: ["https://en.wikipedia.org/wiki/Mr._Clean"],
    confidenceTier: 1,
    themeTag: "islamic-folklore",
    dateChecked: DATE_CHECKED,
  },
  {
    id: "assoc-seventh-generation",
    productId: "seventh-generation-laundry",
    claimText:
      "Brand name is explicitly drawn from an ancient Iroquois Great Law of Peace philosophy. The company's own website states: \"Our name is inspired by an ancient Iroquois philosophy which instructs that in our every deliberation, we must consider the impact of our decisions on the next seven generations.\"",
    sourceUrls: [
      "https://www.seventhgeneration.com/blog/origin-our-name-seventh-generation",
      "https://www.fastcompany.com/665006/great-law-iroquois-confederacy",
    ],
    confidenceTier: 1,
    themeTag: "indigenous-philosophy",
    dateChecked: DATE_CHECKED,
  },
  {
    id: "assoc-starbucks",
    productId: "starbucks-coffee",
    claimText:
      "Logo is a twin-tailed siren from Greek mythology, confirmed on the company's own \"Story of the Siren\" page: \"it depicted a siren, a seductive twin-tailed mermaid from Greek mythology who enticed passing sailors to their doom with her enchanting song.\"",
    sourceUrls: [
      "https://about.starbucks.com/history/the-story-of-the-siren/",
    ],
    confidenceTier: 1,
    themeTag: "greek-mythology",
    dateChecked: DATE_CHECKED,
  },
  {
    id: "assoc-death-wish",
    productId: "death-wish-coffee",
    claimText:
      "Name and branding deliberately center on death-themed imagery. The company's own website states: \"To some, a death wish may sound irresponsible, morbid, a step too far — but we believe it is the boldest sign of living life to the fullest.\" This is secular dark/death-themed branding, not tied to a specific mythology or occult practice.",
    sourceUrls: [
      "https://www.forbes.com/sites/forbestreptalks/2016/02/09/meet-the-entrepreneur-behind-the-super-bowl-coffee-ad/",
      "https://en.wikipedia.org/wiki/Death_Wish_Coffee",
    ],
    confidenceTier: 1,
    themeTag: "secular-death-themed",
    dateChecked: DATE_CHECKED,
  },
  {
    id: "assoc-honest-company",
    productId: "honest-company-baby",
    claimText:
      "Founder Jessica Alba publicly shared Instagram content in August 2024 involving occult/spiritual practices (numerology, astrology, crystals, and sage burning). Alba had stepped down as Chief Creative Officer in April 2024, before the posts, so she was no longer a company officer at the time, and the brand's own products carry no occult imagery or branding. This is the founder's personal social media activity, not a company branding decision.",
    sourceUrls: ["https://www.instagram.com/p/C_bp7Qpu-hr/"],
    confidenceTier: 2,
    themeTag: "founder-personal-conduct",
    dateChecked: DATE_CHECKED,
  },
  {
    id: "assoc-arm-hammer-laundry",
    productId: "arm-hammer-laundry-detergent",
    claimText:
      "Logo depicts Vulcan, the Roman god of fire and metalworking — confirmed by the company's own brand history. Same brand-wide association as the Arm & Hammer baking soda entry.",
    sourceUrls: [
      "https://www.armandhammer.com/en/about-us",
      "https://en.wikipedia.org/wiki/Arm_%26_Hammer",
      "https://en.wikipedia.org/wiki/Vulcan_(mythology)",
    ],
    confidenceTier: 1,
    themeTag: "roman-mythology",
    dateChecked: DATE_CHECKED_UPDATE,
  },
  {
    id: "assoc-ajax-dishwasher",
    productId: "ajax-dishwasher-pods",
    claimText:
      "Named after Ajax (Telamonian Ajax), the Greek mythological hero of the Trojan War. Same brand-wide association as the Ajax Powder Cleanser entry.",
    sourceUrls: [
      "https://en.wikipedia.org/wiki/Ajax_the_Great",
      "https://greekcitytimes.com/2022/06/03/hidden-ancient-greek-meaning-behind-ajax-brand-name/",
    ],
    confidenceTier: 1,
    themeTag: "greek-mythology",
    dateChecked: DATE_CHECKED_UPDATE,
  },
  {
    id: "assoc-seventh-gen-dishwasher",
    productId: "seventh-generation-dishwasher-pods",
    claimText:
      "Brand name is explicitly drawn from an ancient Iroquois Great Law of Peace philosophy. Same brand-wide association as the Seventh Generation Laundry Detergent entry.",
    sourceUrls: [
      "https://www.seventhgeneration.com/blog/more-than-a-name",
      "https://en.wikipedia.org/wiki/Seventh_Generation_Inc.",
    ],
    confidenceTier: 1,
    themeTag: "indigenous-philosophy",
    dateChecked: DATE_CHECKED_UPDATE,
  },
  {
    id: "assoc-nyx",
    productId: "nyx-makeup",
    claimText:
      "Named after Nyx, the Greek goddess of the night. Confirmed by founder Toni Ko's own statements at the brand's 1999 launch.",
    sourceUrls: [
      "https://en.wikipedia.org/wiki/NYX_Cosmetics",
      "https://www.allure.com/story/nyx-professional-makeup-founder-toni-ko",
    ],
    confidenceTier: 1,
    themeTag: "greek-mythology",
    dateChecked: DATE_CHECKED_UPDATE,
  },
  {
    id: "assoc-urban-decay",
    productId: "urban-decay-makeup",
    claimText:
      "Founders deliberately built the brand around dark/rebellious aesthetic choices confirmed in their own words. Product lines include \"Perversion\" mascara, \"Vice\" palettes, \"Naked\" palettes, and \"Sin\" eyeshadow. Co-founders described themselves as \"co-conspirators\" in published interviews. This is dark aesthetic branding by the founders' own choice, not a specific mythology or belief-system tie.",
    sourceUrls: [
      "https://en.wikipedia.org/wiki/Urban_Decay_(cosmetics)",
      "https://www.allure.com/story/urban-decay-history",
    ],
    confidenceTier: 1,
    themeTag: "secular-dark-aesthetic",
    dateChecked: DATE_CHECKED_UPDATE,
  },
  {
    id: "assoc-moon-juice",
    productId: "moon-juice-supplements",
    claimText:
      "Founder Amanda Chantal Bacon describes the company as \"a cosmic beacon\" in her own interviews, references astrology and crystal energy throughout the brand's marketing, and publicly stated of a stolen store crystal, \"You do not want the energy of a stolen crystal.\" Company's own marketing describes Moon Juice as \"a healing force, an etheric potion, a cosmic beacon.\"",
    sourceUrls: [
      "https://www.theguardian.com/lifeandstyle/2015/jan/16/moon-juice-food-for-beautiful-people",
      "https://moonjuice.com/pages/about",
    ],
    confidenceTier: 1,
    themeTag: "astrology-crystal-energy",
    dateChecked: DATE_CHECKED_UPDATE,
  },
  {
    id: "assoc-mugler-angel",
    productId: "mugler-angel",
    claimText:
      "Bottle is a five-pointed star, described in the company's own marketing as \"a celestial bottle: a five-pointed star evoking womanhood, protection and destiny.\" Company's own copy calls it \"a cosmic object that appears supernaturally out of space\" and \"the embodiment of dreams.\"",
    sourceUrls: [
      "https://www.mugler.com/en-us/angel",
      "https://en.wikipedia.org/wiki/Angel_(fragrance)",
    ],
    confidenceTier: 1,
    themeTag: "celestial-supernatural",
    dateChecked: DATE_CHECKED_UPDATE,
  },
  {
    id: "assoc-gillette-venus",
    productId: "gillette-venus",
    claimText:
      "Named after Venus, the Roman goddess of love and beauty. Company's own brand platform and tagline: \"Reveal the goddess in you.\" The company's own brand team confirmed the internal creative platform as \"every woman can feel like a goddess.\"",
    sourceUrls: [
      "https://gillette.com/en-us/venus",
      "https://en.wikipedia.org/wiki/Gillette_Venus",
    ],
    confidenceTier: 1,
    themeTag: "roman-mythology",
    dateChecked: DATE_CHECKED_UPDATE,
  },
];

export const alternatives: Alternative[] = [
  {
    id: "alt-bobs-red-mill",
    slug: "bobs-red-mill-baking-soda",
    name: "Baking Soda",
    brand: "Bob's Red Mill",
    basisText:
      "Founder Bob Moore was a committed Christian; multiple sources document his faith as the explicit motivation for company policy, including giving the company to employees via an ESOP.",
    basisConfidence: 1,
    basisSources: [
      "https://en.wikipedia.org/wiki/Bob_Moore_(executive)",
      "https://www.klove.com/news/faith/founder-of-bob-s-red-mill-committed-christian-generous-boss-9757",
    ],
    affiliateUrl: null,
    affiliateType: "amazon",
    asin: null,
    swapType: "christian",
    category: "Household & Cleaning",
    imageUrl: img("Bob's Red Mill Baking Soda"),
  },
  {
    id: "alt-boll-weevil-hand-wash",
    slug: "boll-weevil-foaming-hand-wash",
    name: "Foaming Hand Wash",
    brand: "Boll Weevil Soap Company",
    basisText:
      "Explicitly self-identifies as a Christian-owned family soap business, citing Colossians 3:17 on its own About page. Note: only the Foaming Hand Wash is confirmed available on Amazon — Boll Weevil's bar soap and body wash are not, and require a direct affiliate relationship instead.",
    basisConfidence: 2,
    basisSources: [
      "https://bollweevilsoapcompany.com/pages/about-us",
      "https://www.amazon.com/Foaming-Boll-Weevil-Soap-Company/dp/B08RF27781",
    ],
    affiliateUrl: null,
    affiliateType: "amazon",
    asin: "B08RF27781",
    swapType: "christian",
    category: "Soap & Body",
    imageUrl: img("Boll Weevil Foaming Hand Wash"),
  },
  {
    id: "alt-faithfully-natural",
    slug: "faithfully-natural-soap-co",
    name: "Soap / Body Wash",
    brand: "Faithfully Natural Soap Co.",
    basisText:
      "Explicitly self-identifies as a Christian-owned family soap business on its own site.",
    basisConfidence: 2,
    basisSources: ["https://faithfullynaturalsoapco.com/pages/about-us"],
    affiliateUrl: "https://faithfullynaturalsoapco.com",
    affiliateType: "direct",
    asin: null,
    swapType: "christian",
    category: "Soap & Body",
    imageUrl: img("Faithfully Natural Soap Co."),
  },
  {
    id: "alt-pure-hearts",
    slug: "pure-hearts-clean-hands-soap-co",
    name: "Soap / Body Wash",
    brand: "Pure Hearts & Clean Hands Soap Co.",
    basisText:
      "Explicitly self-identifies as a Christian-owned family soap business on its own site.",
    basisConfidence: 2,
    basisSources: ["https://phchnaturalsoap.net/about-us/"],
    affiliateUrl: "https://phchnaturalsoap.net",
    affiliateType: "direct",
    asin: null,
    swapType: "christian",
    category: "Soap & Body",
    imageUrl: img("Pure Hearts & Clean Hands"),
  },
  {
    id: "alt-branch-basics-apc",
    slug: "branch-basics-all-purpose-concentrate",
    name: "All-Purpose Cleaner Concentrate",
    brand: "Branch Basics",
    basisText:
      "Co-founder Allison Evans states in a published interview, \"we share a common faith, which we all fall back on,\" and founders discuss their Christian faith on the Thriving Beyond Belief podcast.",
    basisConfidence: 1,
    basisSources: [
      "https://lexiscleankitchen.com/branch-basics-inteview/",
      "https://thrivingbeyondbelief.com/046-branch-basics-with-allison-evans-marilee-nelson/",
    ],
    affiliateUrl: null,
    affiliateType: "amazon",
    asin: null,
    swapType: "christian",
    category: "Household & Cleaning",
    imageUrl: img("Branch Basics All-Purpose"),
  },
  {
    id: "alt-branch-basics-oxygen-boost",
    slug: "branch-basics-oxygen-boost",
    name: "Oxygen Boost Stain Remover",
    brand: "Branch Basics",
    basisText:
      "Same founder faith basis as Branch Basics' All-Purpose Concentrate.",
    basisConfidence: 1,
    basisSources: ["https://lexiscleankitchen.com/branch-basics-inteview/"],
    affiliateUrl: null,
    affiliateType: "amazon",
    asin: null,
    swapType: "christian",
    category: "Household & Cleaning",
    imageUrl: img("Branch Basics Oxygen Boost"),
  },
  {
    id: "alt-provherbs",
    slug: "provherbs-herbal-supplements",
    name: "Herbal Supplements / Tinctures",
    brand: "Provherbs",
    basisText:
      "Company's own \"Our Story\" page: \"we look first to Christ. He is the center in all that we do.\"",
    basisConfidence: 1,
    basisSources: ["https://provherbs.com/pages/our-story"],
    affiliateUrl: "https://provherbs.com",
    affiliateType: "direct",
    asin: null,
    swapType: "christian",
    category: "Supplements",
    imageUrl: img("Provherbs Supplements"),
  },
  {
    id: "alt-eleven86",
    slug: "eleven86-artesian-water",
    name: "Real Artesian Water",
    brand: "Eleven86",
    basisText: "Company's own tagline: \"Faith in every drop. Purpose in every bottle.\"",
    basisConfidence: 1,
    basisSources: ["https://www.eleven86water.com/our-story"],
    affiliateUrl: "https://www.eleven86water.com",
    affiliateType: "unconfirmed",
    asin: null,
    swapType: "christian",
    category: "Food & Beverage",
    imageUrl: img("Eleven86 Water"),
  },
  {
    id: "alt-bold3",
    slug: "bold3-coffee",
    name: "Coffee (whole bean & ground)",
    brand: "BOLD3 Coffee",
    basisText:
      "501(c)(3) Christian nonprofit ministry. Own listing states: \"BOLD3 Coffee is a Christian Non-profit Ministry on a mission to empower others to be BOLD and spread the Hope of Christ worldwide.\" Every bag purchased delivers God's Word into the hands of 3 children.",
    basisConfidence: 1,
    basisSources: [
      "https://www.amazon.com/BOLD3-coffee-Colombian-Ethiopian-Nicaragua/dp/B07F2J6MHV",
      "https://www.bold3.org/",
    ],
    affiliateUrl: null,
    affiliateType: "amazon",
    asin: "B07F2J6MHV",
    swapType: "christian",
    category: "Food & Beverage",
    imageUrl: img("BOLD3 Coffee"),
  },
  {
    id: "alt-palm-beach-tea",
    slug: "palm-beach-herbal-tea",
    name: "Herbal Tea",
    brand: "Palm Beach Herbal Tea Company",
    basisText:
      "Explicitly self-identifies as a \"Christian based, family-owned herbal tea company\" on its own site.",
    basisConfidence: 1,
    basisSources: ["https://palmbeachherbalteas.com/pages/our-story"],
    affiliateUrl: null,
    affiliateType: "amazon",
    asin: null,
    swapType: "christian",
    category: "Food & Beverage",
    imageUrl: img("Palm Beach Herbal Tea"),
  },
  {
    id: "alt-everylife",
    slug: "everylife-diapers-wipes",
    name: "Diapers + Wipes",
    brand: "EveryLife",
    basisText:
      "Co-founders explicitly state \"every child is a miracle from God\"; company's own mission page: \"We unapologetically choose to celebrate life. Every child is a gift from above.\"",
    basisConfidence: 1,
    basisSources: [
      "https://everylife.com/pages/our-mission",
      "https://www.oursundayvisitor.com/meet-the-founders-of-everylife-a-new-pro-life-diaper-company/",
    ],
    affiliateUrl: "https://everylife.com",
    affiliateType: "unconfirmed",
    asin: null,
    swapType: "christian",
    category: "Baby Products",
    imageUrl: img("EveryLife Diapers"),
  },
  {
    id: "alt-earth-eden",
    slug: "earth-eden-diapers",
    name: "Diapers",
    brand: "Earth & Eden",
    basisText:
      "Not a confirmed Christian-founded brand, but the closest Amazon-available, non-toxic, plant-based diaper option — offered as a secondary pick alongside EveryLife.",
    basisConfidence: 2,
    basisSources: [
      "https://www.earthandedenbrand.com/",
      "https://www.amazon.com/Earth-Eden-Baby-Diapers-Count/dp/B07DYLJHLB",
    ],
    affiliateUrl: null,
    affiliateType: "amazon",
    asin: "B07DYLJHLB",
    swapType: "christian",
    category: "Baby Products",
    imageUrl: img("Earth & Eden Diapers"),
  },
  {
    id: "alt-branch-basics-dishwasher-tablets",
    slug: "branch-basics-dishwasher-tablets",
    name: "Dishwasher Tablets",
    brand: "Branch Basics",
    basisText: "Same founder faith basis as Branch Basics' All-Purpose Concentrate.",
    basisConfidence: 1,
    basisSources: [
      "https://lexiscleankitchen.com/branch-basics-inteview/",
      "https://www.amazon.com/Branch-Basics-Dishwasher-Tablets-Fragrance-Free/dp/B0GNT5N4SP",
    ],
    affiliateUrl: null,
    affiliateType: "amazon",
    asin: "B0GNT5N4SP",
    swapType: "christian",
    category: "Household & Cleaning",
    imageUrl: img("Branch Basics Dishwasher Tablets"),
  },
  {
    id: "alt-branch-basics-laundry-powder",
    slug: "branch-basics-laundry-detergent-powder",
    name: "Laundry Detergent – 4lbs (120 loads), Powder",
    brand: "Branch Basics",
    basisText:
      "Same founder faith basis as Branch Basics' All-Purpose Concentrate. Plant & mineral-based powder formula, plastic-free and fragrance-free.",
    basisConfidence: 1,
    basisSources: ["https://lexiscleankitchen.com/branch-basics-inteview/"],
    affiliateUrl: null,
    affiliateType: "amazon",
    asin: "B0GQ665H45",
    swapType: "christian",
    category: "Household & Cleaning",
    imageUrl: img("Branch Basics Laundry Powder"),
  },
  {
    id: "alt-branch-basics-bundle",
    slug: "branch-basics-concentrate-oxygen-boost-bundle",
    name: "Concentrate (33.8 oz) + Oxygen Boost (4 lbs) Bundle",
    brand: "Branch Basics",
    basisText:
      "Concentrate replaces all-purpose cleaners and can be diluted for surface scrubbing; Oxygen Boost acts as a natural scouring powder and grout cleaner. Sold as a confirmed bundle listing on Amazon. Same founder faith basis as other Branch Basics entries.",
    basisConfidence: 1,
    basisSources: ["https://lexiscleankitchen.com/branch-basics-inteview/"],
    affiliateUrl: null,
    affiliateType: "amazon",
    asin: null,
    swapType: "christian",
    category: "Household & Cleaning",
    imageUrl: img("Branch Basics Bundle"),
  },
  {
    id: "alt-toups-co",
    slug: "toups-and-co-organics",
    name: "Makeup & Skincare",
    brand: "Toups & Co. Organics",
    basisText: "Christian family-owned, confirmed on the company's own About page.",
    basisConfidence: 1,
    basisSources: ["https://toupsandco.com/pages/about-us"],
    affiliateUrl: null,
    affiliateType: "amazon",
    asin: null,
    swapType: "christian",
    category: "Beauty & Makeup",
    imageUrl: img("Toups & Co. Organics"),
  },
  {
    id: "alt-jes-organics",
    slug: "jes-organics",
    name: "Makeup, Skincare & Supplements",
    brand: "JES Organics",
    basisText:
      "Own Amazon storefront states \"Christian-based company founded in 2006.\"",
    basisConfidence: 1,
    basisSources: [
      "https://www.amazon.com/stores/JESOrganics/Homepage/page/34BCD59B-5770-4397-84F6-721513DA72D3",
    ],
    affiliateUrl: null,
    affiliateType: "amazon",
    asin: null,
    swapType: "christian",
    category: "Beauty & Makeup",
    imageUrl: img("JES Organics"),
  },
  {
    id: "alt-hosanna-aroma",
    slug: "hosanna-aroma",
    name: "Christian Fragrance",
    brand: "Hosanna Aroma",
    basisText:
      "Own website states \"unapologetically Christian,\" Scripture-inspired, husband-and-wife team in Colorado, launched April 2024.",
    basisConfidence: 1,
    basisSources: ["https://hosanna-aroma.com/"],
    affiliateUrl: "https://hosanna-aroma.com",
    affiliateType: "direct",
    asin: null,
    swapType: "christian",
    category: "Beauty & Fragrance",
    imageUrl: img("Hosanna Aroma"),
  },
  {
    id: "alt-risen-fragrances",
    slug: "risen-fragrances",
    name: "Christian Fragrance",
    brand: "Risen Fragrances",
    basisText:
      "\"Exists to glorify God\"; each scent is paired with Scripture, and $1 per bottle funds Bible distribution.",
    basisConfidence: 1,
    basisSources: ["https://risenfragrances.com/"],
    affiliateUrl: "https://risenfragrances.com",
    affiliateType: "direct",
    asin: null,
    swapType: "christian",
    category: "Beauty & Fragrance",
    imageUrl: img("Risen Fragrances"),
  },
  {
    id: "alt-leaf-razor",
    slug: "leaf-razor-chrome",
    name: "Leaf Razor (All-Metal Safety Razor, Chrome)",
    brand: "Leaf Shave",
    basisText:
      "Clean/non-toxic alternative: all-metal, plastic-free razor with a pivoting head and no toxic shaving-strip chemicals. No Christian-founded claim has been found for Leaf Shave — this is offered as a clean swap, not a faith-based one.",
    basisConfidence: 1,
    basisSources: [
      "https://www.amazon.com/dp/B09QB2Y263",
      "https://leafshave.com/",
    ],
    affiliateUrl: null,
    affiliateType: "amazon",
    asin: "B09QB2Y263",
    swapType: "clean",
    category: "Beauty & Personal Care",
    imageUrl: img("Leaf Razor"),
  },
  {
    id: "alt-cbc-divine-shine-lip-gloss",
    slug: "divine-shine-lip-gloss",
    name: "Divine Shine Lip Gloss",
    brand: "Christian Beauty Co.",
    basisText:
      "Christian Beauty Co. is an explicitly faith-based clean beauty brand. Their own mission statement states faith calls them to a higher standard where skincare is rooted in values that honor both body and spirit.",
    basisConfidence: 1,
    basisSources: ["https://www.christianbeautyco.com/discernly"],
    affiliateUrl:
      "https://www.christianbeautyco.com/products/divine-shine-lip-gloss-1?sca_ref=11765311.nBjYCINV1gor",
    affiliateType: "direct",
    asin: null,
    swapType: "christian",
    category: "Beauty & Makeup",
    imageUrl:
      "https://www.christianbeautyco.com/cdn/shop/files/Divine_Shine_Lipgloss.png?v=1773108400&width=980",
  },
  {
    id: "alt-cbc-velvet-lips-lipstick",
    slug: "velvet-lips-matte-lipstick",
    name: "Velvet Lips Matte Lipstick",
    brand: "Christian Beauty Co.",
    basisText:
      "Christian Beauty Co. is an explicitly faith-based clean beauty brand. Their own mission statement states faith calls them to a higher standard where skincare is rooted in values that honor both body and spirit.",
    basisConfidence: 1,
    basisSources: ["https://www.christianbeautyco.com/discernly"],
    affiliateUrl:
      "https://www.christianbeautyco.com/products/velvet-lips-matte-lipstick?sca_ref=11765311.nBjYCINV1gor",
    affiliateType: "direct",
    asin: null,
    swapType: "christian",
    category: "Beauty & Makeup",
    imageUrl:
      "https://www.christianbeautyco.com/cdn/shop/files/VelvetLipstickColors.png?v=1774359692&width=1946",
  },
  {
    id: "alt-cbc-tallow-cream-foundation",
    slug: "tallow-cream-foundation",
    name: "Tallow Cream Foundation",
    brand: "Christian Beauty Co.",
    basisText:
      "Christian Beauty Co. is an explicitly faith-based clean beauty brand. Their own mission statement states faith calls them to a higher standard where skincare is rooted in values that honor both body and spirit.",
    basisConfidence: 1,
    basisSources: ["https://www.christianbeautyco.com/discernly"],
    affiliateUrl:
      "https://www.christianbeautyco.com/products/tallow-cream-foundation?sca_ref=11765311.nBjYCINV1gor",
    affiliateType: "direct",
    asin: null,
    swapType: "christian",
    category: "Beauty & Makeup",
    imageUrl:
      "https://www.christianbeautyco.com/cdn/shop/files/TALLOW_CREAM_FOUNDATION.png?v=1765925591&width=1240",
  },
  {
    id: "alt-cbc-lash-stop-mascara",
    slug: "the-lash-stop-clean-mascara",
    name: "The Lash Stop Clean Mascara",
    brand: "Christian Beauty Co.",
    basisText:
      "Christian Beauty Co. is an explicitly faith-based clean beauty brand. Their own mission statement states faith calls them to a higher standard where skincare is rooted in values that honor both body and spirit.",
    basisConfidence: 1,
    basisSources: ["https://www.christianbeautyco.com/discernly"],
    affiliateUrl:
      "https://www.christianbeautyco.com/products/the-lash-stop-clean-mascara-1?sca_ref=11765311.nBjYCINV1gor",
    affiliateType: "direct",
    asin: null,
    swapType: "christian",
    category: "Beauty & Makeup",
    imageUrl:
      "https://www.christianbeautyco.com/cdn/shop/files/TheLashStopMascaraSquare.png?v=1775084184&width=980",
  },
  {
    id: "alt-cbc-tallow-skin-first-foundation",
    slug: "tallow-skin-first-foundation",
    name: "Tallow Skin-First Foundation",
    brand: "Christian Beauty Co.",
    basisText:
      "Christian Beauty Co. is an explicitly faith-based clean beauty brand. Their own mission statement states faith calls them to a higher standard where skincare is rooted in values that honor both body and spirit.",
    basisConfidence: 1,
    basisSources: ["https://www.christianbeautyco.com/discernly"],
    affiliateUrl:
      "https://www.christianbeautyco.com/products/tallow-skin-first-foundation?sca_ref=11765311.nBjYCINV1gor",
    affiliateType: "direct",
    asin: null,
    swapType: "christian",
    category: "Beauty & Makeup",
    imageUrl:
      "https://www.christianbeautyco.com/cdn/shop/files/TallowSkin-FirstFoundation.png?v=1772142676&width=980",
  },
  {
    id: "alt-cbc-wisdom-eau-de-parfum",
    slug: "wisdom-eau-de-parfum",
    name: "Wisdom Eau de Parfum",
    brand: "Christian Beauty Co.",
    basisText:
      "Christian Beauty Co. is an explicitly faith-based clean beauty brand. Their own mission statement states faith calls them to a higher standard where skincare is rooted in values that honor both body and spirit.",
    basisConfidence: 1,
    basisSources: ["https://www.christianbeautyco.com/discernly"],
    affiliateUrl:
      "https://www.christianbeautyco.com/products/wisdom-eau-de-parfum-30ml-1-0-fl-oz?sca_ref=11765311.nBjYCINV1gor",
    affiliateType: "direct",
    asin: null,
    swapType: "christian",
    category: "Beauty & Fragrance",
    imageUrl:
      "https://www.christianbeautyco.com/cdn/shop/files/wisdom1x1.png?v=1780080075&width=1240",
  },
  {
    id: "alt-cbc-divine-healing-moisturizer",
    slug: "divine-healing-desert-stem-cell-moisturizer",
    name: "Divine Healing Desert Stem Cell Moisturizer",
    brand: "Christian Beauty Co.",
    basisText:
      "Christian Beauty Co. is an explicitly faith-based clean beauty brand. Their own mission statement states faith calls them to a higher standard where skincare is rooted in values that honor both body and spirit.",
    basisConfidence: 1,
    basisSources: ["https://www.christianbeautyco.com/discernly"],
    affiliateUrl:
      "https://www.christianbeautyco.com/products/divine-healing-desert-stem-cell-moisturizer?sca_ref=11765311.nBjYCINV1gor",
    affiliateType: "direct",
    asin: null,
    swapType: "christian",
    category: "Beauty & Makeup",
    imageUrl:
      "https://www.christianbeautyco.com/cdn/shop/files/DivineHealing_129371b6-1ec2-4101-a22f-4c1d4b858383.jpg?v=1752242318&width=1946",
  },
];

export const productAlternativeMap: ProductAlternativeMapEntry[] = [
  { productId: "arm-hammer-baking-soda", alternativeId: "alt-bobs-red-mill", rank: "primary" },

  { productId: "dr-bronners-castile-soap", alternativeId: "alt-boll-weevil-hand-wash", rank: "primary" },
  { productId: "dr-bronners-castile-soap", alternativeId: "alt-faithfully-natural", rank: "secondary" },
  { productId: "dr-bronners-castile-soap", alternativeId: "alt-pure-hearts", rank: "secondary" },

  { productId: "method-shower-readings", alternativeId: "alt-boll-weevil-hand-wash", rank: "primary" },
  { productId: "method-shower-readings", alternativeId: "alt-faithfully-natural", rank: "secondary" },
  { productId: "method-shower-readings", alternativeId: "alt-pure-hearts", rank: "secondary" },

  { productId: "mr-clean-all-purpose-cleaner", alternativeId: "alt-branch-basics-apc", rank: "primary" },
  { productId: "ajax-powder-cleanser", alternativeId: "alt-branch-basics-bundle", rank: "primary" },
  { productId: "mr-clean-clean-freak-spray", alternativeId: "alt-branch-basics-apc", rank: "primary" },
  { productId: "mr-clean-magic-eraser", alternativeId: "alt-branch-basics-oxygen-boost", rank: "primary" },
  { productId: "seventh-generation-laundry", alternativeId: "alt-branch-basics-laundry-powder", rank: "primary" },

  { productId: "pacifica-aromapower", alternativeId: "alt-hosanna-aroma", rank: "primary" },
  { productId: "pacifica-aromapower", alternativeId: "alt-risen-fragrances", rank: "secondary" },
  { productId: "pacifica-aromapower", alternativeId: "alt-cbc-wisdom-eau-de-parfum", rank: "secondary" },

  { productId: "yogi-tea-herbal-blend", alternativeId: "alt-palm-beach-tea", rank: "primary" },

  { productId: "liquid-death-water", alternativeId: "alt-eleven86", rank: "primary" },

  { productId: "gaia-herbs-supplements", alternativeId: "alt-provherbs", rank: "primary" },

  { productId: "starbucks-coffee", alternativeId: "alt-bold3", rank: "primary" },
  { productId: "death-wish-coffee", alternativeId: "alt-bold3", rank: "primary" },

  { productId: "honest-company-baby", alternativeId: "alt-everylife", rank: "primary" },
  { productId: "honest-company-baby", alternativeId: "alt-earth-eden", rank: "secondary" },

  { productId: "arm-hammer-laundry-detergent", alternativeId: "alt-branch-basics-laundry-powder", rank: "primary" },

  { productId: "ajax-dishwasher-pods", alternativeId: "alt-branch-basics-dishwasher-tablets", rank: "primary" },
  { productId: "seventh-generation-dishwasher-pods", alternativeId: "alt-branch-basics-dishwasher-tablets", rank: "primary" },

  { productId: "nyx-makeup", alternativeId: "alt-toups-co", rank: "primary" },
  { productId: "nyx-makeup", alternativeId: "alt-jes-organics", rank: "secondary" },
  { productId: "nyx-makeup", alternativeId: "alt-cbc-divine-shine-lip-gloss", rank: "secondary" },
  { productId: "nyx-makeup", alternativeId: "alt-cbc-velvet-lips-lipstick", rank: "secondary" },
  { productId: "nyx-makeup", alternativeId: "alt-cbc-tallow-cream-foundation", rank: "secondary" },

  { productId: "urban-decay-makeup", alternativeId: "alt-toups-co", rank: "primary" },
  { productId: "urban-decay-makeup", alternativeId: "alt-jes-organics", rank: "secondary" },
  { productId: "urban-decay-makeup", alternativeId: "alt-cbc-lash-stop-mascara", rank: "secondary" },
  { productId: "urban-decay-makeup", alternativeId: "alt-cbc-velvet-lips-lipstick", rank: "secondary" },
  { productId: "urban-decay-makeup", alternativeId: "alt-cbc-tallow-skin-first-foundation", rank: "secondary" },

  { productId: "moon-juice-supplements", alternativeId: "alt-jes-organics", rank: "primary" },
  { productId: "moon-juice-supplements", alternativeId: "alt-toups-co", rank: "secondary" },
  { productId: "moon-juice-supplements", alternativeId: "alt-cbc-divine-healing-moisturizer", rank: "secondary" },

  { productId: "mugler-angel", alternativeId: "alt-hosanna-aroma", rank: "primary" },
  { productId: "mugler-angel", alternativeId: "alt-risen-fragrances", rank: "secondary" },

  { productId: "gillette-venus", alternativeId: "alt-leaf-razor", rank: "primary" },

  // oatey-hercules-drain-opener intentionally has no alternative yet (per brief notes).
];
