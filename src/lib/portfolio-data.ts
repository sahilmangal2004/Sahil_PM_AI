import sahilAsset from "@/assets/sahil.png.asset.json";
import gargiAsset from "@/assets/gargi.jpg.asset.json";
import aminAsset from "@/assets/amin.jpg.asset.json";
import ujjwalAsset from "@/assets/ujjwal.png.asset.json";
import bharteshAsset from "@/assets/bhartesh.jpg.asset.json";

export const portrait = sahilAsset.url;

export type Experience = {
  id: string;
  company: string;
  index: string;
  role: string;
  date: string;
  title: string;
  summary: string;
  work: string[];
  impact: string[];
  accent: string;
};

export const experiences: Experience[] = [
  {
    id: "goeddie",
    company: "GoEddie.ai",
    index: "01",
    role: "Product Operations Manager Intern",
    date: "Aug 2026 — Present",
    title: "Building a feedback loop between testers, product and engineering.",
    summary:
      "A closer look at how structured QA passes turn scattered feedback into release readiness.",
    work: [
      "Structured QA passes across releases",
      "Feature-level bug and feedback tracking",
      "Tester engagement and follow-up",
      "Product + engineering release readiness",
    ],
    impact: ["100+ active testers", "Feature-level bugs and feedback", "Tester engagement tracking"],
    accent: "var(--lime)",
  },
  {
    id: "quikygo",
    company: "QuikyGo",
    index: "02",
    role: "Operations & Data Intern",
    date: "Feb 2026 — Aug 2026",
    title: "From fragmented operations to a decision system.",
    summary:
      "Booking fulfilment, vendor validation, reporting and automation brought into one operating rhythm.",
    work: [
      "Booking fulfilment operations",
      "Vendor data validation",
      "Power BI reporting",
      "Bulk Email Automation",
    ],
    impact: [
      "~90% manual effort reduction",
      "~30% fewer vendor data inconsistencies",
      "Power BI reporting",
    ],
    accent: "var(--ember)",
  },
  {
    id: "forethought",
    company: "Forethought India",
    index: "03",
    role: "Business Research & Operations Intern",
    date: "May 2025 — Jun 2025",
    title: "Turning scattered research into structured intelligence.",
    summary:
      "A research workflow made more useful through structure, tracking and operational visibility.",
    work: [
      "B-school professor database",
      "Enrolment tracking",
      "International faculty onboarding",
      "Operational reporting",
    ],
    impact: ["B-school professor database", "Enrolment tracking", "International faculty onboarding"],
    accent: "var(--ice)",
  },
];

export const metrics = [
  { value: 90, suffix: "%", prefix: "~", label: "Manual effort reduction", source: "QuikyGo" },
  { value: 30, suffix: "%", prefix: "~", label: "Fewer vendor data inconsistencies", source: "QuikyGo" },
  { value: 1500, suffix: "+", prefix: "", label: "Stores processed", source: "Shopify Scraper" },
  { value: 95, suffix: "%+", prefix: "", label: "Documented data accuracy", source: "Shopify Scraper" },
  { value: 100, suffix: "+", prefix: "", label: "Active testers", source: "GoEddie.ai" },
];

export const projects = [
  {
    id: "shopify",
    number: "01",
    name: "Shopify Scraper",
    stack: ["Python", "BeautifulSoup4", "Requests", "Pandas"],
    description: "When repetitive research becomes a systems problem.",
    problem: "Manual store research didn't scale and produced inconsistent records.",
    built:
      "A documented pipeline across scraping, cleaning, deduplication and validation with reliability checks.",
    result: "1,500+ stores processed at 95%+ documented data accuracy, ~40% better extraction reliability.",
    link: "https://github.com/sahilmangal2004/shopify-scraper-adflipr",
  },
  {
    id: "streaming",
    number: "02",
    name: "Streaming Analytics",
    stack: ["Python", "Spotify API", "Power BI"],
    description: "Turning a data stream into something you can actually understand.",
    problem: "Raw listening data says a lot and explains nothing.",
    built: "An ingestion + modelling flow feeding a Power BI view of trends, artist popularity and engagement.",
    result: "A readable dashboard that turns a raw stream into decisions you can talk about.",
    link: "https://github.com/sahilmangal2004/Spotify-Tracker",
  },
  {
    id: "automation",
    number: "03",
    name: "Bulk Email Automation",
    stack: ["Automation", "Data validation", "Workflow design"],
    description: "I don't like doing the same thing twice.",
    problem: "Repetitive outreach work at QuikyGo consumed hours of manual effort.",
    built: "Records → validate → segment → generate → track, built as one trackable workflow.",
    result: "~90% manual effort reduction, with outcomes measurable instead of guessed.",
    link: "",
  },
];

export const skillGroups = [
  {
    category: "Product",
    skills: [
      { name: "Product Strategy", note: "Direction and trade-offs" },
      { name: "Product Analytics", note: "Behaviour into decisions" },
      { name: "User Research", note: "What people actually need" },
    ],
  },
  {
    category: "Data",
    skills: [
      { name: "SQL", note: "Analytics & decision making" },
      { name: "Power BI", note: "Business intelligence" },
      { name: "Excel", note: "Fast modelling and validation" },
    ],
  },
  {
    category: "AI",
    skills: [
      { name: "AI", note: "Building with models, not around them" },
      { name: "Automation", note: "Remove the repeated work" },
    ],
  },
  {
    category: "Engineering",
    skills: [
      { name: "Python", note: "Automation & data workflows" },
      { name: "React", note: "Prototyping real interfaces" },
      { name: "JavaScript", note: "Making ideas clickable" },
    ],
  },
  {
    category: "Design",
    skills: [
      { name: "Systems thinking", note: "Structure before surface" },
      { name: "Interface craft", note: "Clarity as a feature" },
    ],
  },
];

export const testimonials = [
  {
    name: "Bhartesh Bhaskar",
    role: "CEO",
    company: "QuikyGo",
    image: bharteshAsset.url,
    target: "quikygo",
    quote:
      "Sahil was quick to understand our business problems and use data to find practical solutions. He also had a good sense of how those insights could improve the product and operations.",
  },
  {
    name: "Gargi Deori",
    role: "CTO",
    company: "QuikyGo",
    image: gargiAsset.url,
    target: "quikygo",
    quote:
      "Sahil was always curious about how things worked and wasn't afraid to take ownership. His ability to work with data while keeping the bigger product picture in mind was impressive.",
  },
  {
    name: "Amin Siddiquie",
    role: "CEO",
    company: "Forethought India",
    image: aminAsset.url,
    target: "forethought",
    quote:
      "Sahil picked things up quickly and was good at making sense of data. What I liked most was that he didn't just report numbers—he tried to understand what they actually meant for the business.",
  },
  {
    name: "Ujjwal",
    role: "Founder & CEO",
    company: "GoEddie.ai",
    image: ujjwalAsset.url,
    target: "goeddie",
    quote:
      "Sahil has a natural curiosity for product, data, and AI. He's the kind of person who will learn something on his own and then actually try to build with it.",
  },
];

export const leadership = [
  {
    role: "Vice-President",
    org: "ChESA",
    detail: "Led 40+ members and managed ₹50K+ departmental budgets.",
  },
  {
    role: "Management Head",
    org: "Student Council",
    detail: "Connected to events with 1,000+ attendees.",
  },
  {
    role: "Class Representative",
    org: "NSS",
    detail: "Coordinated participation and on-ground volunteering.",
  },
];

export const principles = [
  { n: "01", t: "Ask why", d: "Don't solve the first version of the problem." },
  { n: "02", t: "Follow the signal", d: "Use users, feedback and data as a conversation starter." },
  { n: "03", t: "Make it simple", d: "Reduce friction until the system is easier to use." },
  { n: "04", t: "Measure it", d: "If nothing changed, it wasn't really a solution." },
];

const answers = {
  who: "Sahil is a 2026 MANIT Bhopal graduate building toward Product Management through hands-on work across Product Operations, Data, Automation, QA and Business Operations.",
  why: "The short version: Sahil kept moving closer to the part of work where messy systems become clearer products. Chemical Engineering led to research and operations, then data, automation and Product Operations.",
  goeddie:
    "At GoEddie.ai, Sahil worked across structured QA passes, feature-level bug and feedback tracking, tester engagement, and product + engineering release readiness. The documented scale: 100+ active testers.",
  quikygo:
    "At QuikyGo, Sahil worked on booking fulfilment, vendor data validation, Power BI reporting and automation. The strongest evidence is roughly 90% manual effort reduction through Bulk Email Automation and roughly 30% fewer vendor data inconsistencies.",
  automate:
    "The documented automation example is Bulk Email Automation at QuikyGo. It reduced manual effort by roughly 90%.",
  metrics:
    "The clearest documented metrics are 100+ active testers, roughly 90% manual effort reduction, roughly 30% reduction in vendor data inconsistencies, 1,500+ Shopify stores, 95%+ data accuracy, roughly 40% extraction reliability improvement, 40+ members led, ₹50K+ budgets managed and 1,000+ event attendees.",
  projects:
    "Sahil built a Shopify scraper using Python, BeautifulSoup4, Requests and Pandas, and a Streaming Analytics project using Python, Spotify API and Power BI.",
  leadership:
    "Sahil was Vice-President at ChESA, leading 40+ members and managing ₹50K+ departmental budgets. He was also Management Head in the Student Council, connected to events with 1,000+ attendees, and a Class Representative in NSS.",
  people:
    "AI summary of four testimonials: people describe business understanding, data-driven thinking, ownership, product thinking, curiosity and self-learning.",
  recruiter:
    "SHORT ANSWER: Sahil brings an unusual mix for an early-career PM: operations context, data fluency, automation instinct and experience closing feedback loops. STRONGEST EVIDENCE: QuikyGo and GoEddie.ai. RECOMMENDED START: the case studies, then the metrics.",
  joins:
    "A JOIN combines rows across tables. INNER JOIN keeps only matching rows, LEFT JOIN keeps every row from the left table and fills gaps with NULL, RIGHT JOIN does the mirror, and FULL OUTER JOIN keeps everything from both sides. In product analytics, LEFT JOIN is the workhorse: keep all users, attach the events they may or may not have.",
  pmf: "Product-market fit is the point where a specific group of users would be genuinely upset if your product disappeared. Signals: retention flattening instead of decaying, organic pull, and shortening sales/onboarding cycles — not raw signup counts.",
  interview:
    "For a PM interview, prepare four tracks: product sense (structure → user → problem → solution → metric), analytics (define the metric, decompose it, spot the confound), execution (prioritisation and trade-offs), and your own stories in problem → action → measurable outcome form.",
  improve:
    "To improve a product like QuikyGo, I'd start where the operating data already hurts: fulfilment reliability and vendor data quality. Tighten validation at the point of entry, instrument the fulfilment funnel, then automate the repeated manual steps that show up in the reporting.",
  unknown:
    "I can answer from Sahil's documented portfolio, and I can help with general product, data and AI questions. Try asking about QuikyGo, GoEddie.ai, metrics, SQL, or PM interview prep.",
} as const;

export function getAnswer(question: string): string {
  const n = question.toLowerCase();
  if (n.includes("join")) return answers.joins;
  if (n.includes("product-market") || n.includes("product market") || n.includes("pmf")) return answers.pmf;
  if (n.includes("improve")) return answers.improve;
  if (n.includes("interview") || n.includes("prepare")) return answers.interview;
  if (n.includes("goeddie") || n.includes("tester")) return answers.goeddie;
  if (n.includes("quikygo") || n.includes("vendor")) return answers.quikygo;
  if (n.includes("autom")) return answers.automate;
  if (n.includes("metric") || n.includes("achievement")) return answers.metrics;
  if (n.includes("project") || n.includes("built")) return answers.projects;
  if (n.includes("lead") || n.includes("council")) return answers.leadership;
  if (n.includes("people") || n.includes("say")) return answers.people;
  if (n.includes("recruit")) return answers.recruiter;
  if (n.includes("why") || n.includes("product management")) return answers.why;
  if (n.includes("who") || n.includes("sahil") || n.includes("story")) return answers.who;
  return answers.unknown;
}
