import type {
  Alternative,
  Association,
  Product,
  ProductAlternativeMapEntry,
} from "@/types/data";

// Seed data hand-mapped from starter-product-data.csv, applying the
// sourcing standard in the project brief: only tier-1 (documented fact)
// and tier-2 (contested/opinion) claims are published. Tier-3 rows
// (Method everyday cleaners, Earth Mama Organics, Hello Bello) are
// intentionally left out — "a wrong answer is 10x worse than a blank."
//
// Row 21 (Earth & Eden) is not a flagged product; it appears only as an
// alternative for The Honest Company.

const img = (label: string) =>
  `https://placehold.co/400x300/F2E8D8/241A12?font=roboto&text=${encodeURIComponent(
    label,
  )}`;

const DATE_CHECKED = "2026-07-01";

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
    category: "Household & Cleaning",
    imageUrl: img("Bob's Red Mill Baking Soda"),
  },
  {
    id: "alt-boll-weevil",
    slug: "boll-weevil-soap-co",
    name: "Soap / Body Wash",
    brand: "Boll Weevil Soap Company",
    basisText:
      "Explicitly self-identifies as a Christian-owned family soap business, citing Colossians 3:17 on its own About page.",
    basisConfidence: 2,
    basisSources: ["https://bollweevilsoapcompany.com/pages/about-us"],
    affiliateUrl: null,
    affiliateType: "amazon",
    category: "Soap & Body",
    imageUrl: img("Boll Weevil Soap Co."),
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
    category: "Household & Cleaning",
    imageUrl: img("Branch Basics Oxygen Boost"),
  },
  {
    id: "alt-branch-basics-laundry",
    slug: "branch-basics-laundry-concentrate",
    name: "Laundry Concentrate",
    brand: "Branch Basics",
    basisText:
      "Same founder faith basis as Branch Basics' All-Purpose Concentrate.",
    basisConfidence: 1,
    basisSources: ["https://lexiscleankitchen.com/branch-basics-inteview/"],
    affiliateUrl: null,
    affiliateType: "amazon",
    category: "Household & Cleaning",
    imageUrl: img("Branch Basics Laundry"),
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
    basisSources: ["https://www.earthandedenbrand.com/"],
    affiliateUrl: null,
    affiliateType: "amazon",
    category: "Baby Products",
    imageUrl: img("Earth & Eden Diapers"),
  },
];

export const productAlternativeMap: ProductAlternativeMapEntry[] = [
  { productId: "arm-hammer-baking-soda", alternativeId: "alt-bobs-red-mill", rank: "primary" },

  { productId: "dr-bronners-castile-soap", alternativeId: "alt-boll-weevil", rank: "primary" },
  { productId: "dr-bronners-castile-soap", alternativeId: "alt-faithfully-natural", rank: "secondary" },
  { productId: "dr-bronners-castile-soap", alternativeId: "alt-pure-hearts", rank: "secondary" },

  { productId: "method-shower-readings", alternativeId: "alt-boll-weevil", rank: "primary" },
  { productId: "method-shower-readings", alternativeId: "alt-faithfully-natural", rank: "secondary" },
  { productId: "method-shower-readings", alternativeId: "alt-pure-hearts", rank: "secondary" },

  { productId: "mr-clean-all-purpose-cleaner", alternativeId: "alt-branch-basics-apc", rank: "primary" },
  { productId: "ajax-powder-cleanser", alternativeId: "alt-branch-basics-apc", rank: "primary" },
  { productId: "mr-clean-clean-freak-spray", alternativeId: "alt-branch-basics-apc", rank: "primary" },
  { productId: "mr-clean-magic-eraser", alternativeId: "alt-branch-basics-oxygen-boost", rank: "primary" },
  { productId: "seventh-generation-laundry", alternativeId: "alt-branch-basics-laundry", rank: "primary" },

  { productId: "pacifica-aromapower", alternativeId: "alt-boll-weevil", rank: "primary" },

  { productId: "yogi-tea-herbal-blend", alternativeId: "alt-palm-beach-tea", rank: "primary" },

  { productId: "liquid-death-water", alternativeId: "alt-eleven86", rank: "primary" },

  { productId: "gaia-herbs-supplements", alternativeId: "alt-provherbs", rank: "primary" },

  { productId: "starbucks-coffee", alternativeId: "alt-bold3", rank: "primary" },
  { productId: "death-wish-coffee", alternativeId: "alt-bold3", rank: "primary" },

  { productId: "honest-company-baby", alternativeId: "alt-everylife", rank: "primary" },
  { productId: "honest-company-baby", alternativeId: "alt-earth-eden", rank: "secondary" },

  // oatey-hercules-drain-opener intentionally has no alternative yet (per brief notes).
];
