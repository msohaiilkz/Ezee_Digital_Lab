"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUp, ChevronDown, Search } from "lucide-react";
import { Blog, blogPath, CaseStudy, caseStudyPath, FAQ, PortfolioItem, services } from "@/content/site";
import { cn } from "@/lib/utils";

const visualByTheme: Record<string, string> = {
  ai: "/images/ai-automation-workflow-desk.png",
  automation: "/images/ai-automation-workflow-desk.png",
  crm: "/images/ai-workflow-automation.png",
  erp: "/images/erp-operations-floor.png",
  systems: "/images/erp-operations-floor.png",
  lms: "/images/lms-learning-lounge.png",
  training: "/images/lms-learning-lounge.png",
  brand: "/images/brand-communication-studio.png",
  social: "/images/brand-social-studio.png",
  seo: "/images/seo-aeo-search-intelligence.png",
  aeo: "/images/seo-aeo-search-intelligence.png",
  dashboard: "/images/bi-executive-analytics-room.png",
  dashboards: "/images/bi-executive-analytics-room.png",
  analytics: "/images/bi-executive-analytics-room.png",
  website: "/images/web-app-interface-studio.png",
  web: "/images/web-app-interface-studio.png",
  transformation: "/images/digital-transformation-ecosystem.png",
  consulting: "/images/digital-transformation-ecosystem.png"
};

const blogImages: Record<string, string> = {
  "why-businesses-need-a-connected-digital-ecosystem-not-just-a-website": "/images/digital-command-center.png",
  "how-ai-workflow-automation-can-save-hours-every-week": "/images/ai-automation-workflow-desk.png",
  "why-social-media-without-brand-positioning-does-not-convert": "/images/brand-social-studio.png",
  "custom-erp-vs-off-the-shelf-erp": "/images/erp-control-room.png",
  "how-lms-platforms-help-companies-train-teams-better": "/images/lms-learning-platform.png",
  "what-is-digital-transformation-as-a-service": "/images/digital-transformation-ecosystem.png",
  "why-a-brd-saves-money-before-software-development": "/images/hero-strategy-studio.png",
  "how-dashboards-improve-business-decision-making": "/images/bi-leadership-dashboard.png",
  "why-your-website-is-not-generating-leads": "/images/web-app-product-studio.png",
  "practical-ai-agents-for-smes-and-enterprises": "/images/service-systems-montage.png",
  "how-crm-automation-improves-sales-follow-up": "/images/web-app-interface-studio.png",
  "the-20-point-digital-growth-audit": "/images/brand-communication-studio.png"
};

const caseStudyImages: Record<string, string> = {
  "digital-operating-spine-insurance-business": "/images/erp-control-room.png",
  "employee-health-insurance-hr-experience": "/images/service-systems-montage.png",
  "premium-social-media-brand-positioning-engine": "/images/brand-social-studio.png",
  "lms-training-enablement-model": "/images/lms-learning-platform.png",
  "ai-lead-intake-proposal-workflow-automation": "/images/ai-workflow-automation.png",
  "business-intelligence-dashboard-leadership-visibility": "/images/bi-leadership-dashboard.png"
};

const portfolioImages: Record<string, string> = {
  "digital-operating-spine": "/images/erp-control-room.png",
  "premium-social-presence-engine": "/images/brand-social-studio.png",
  "custom-lms-enablement-model": "/images/lms-learning-platform.png",
  "ai-lead-intake-workflow": "/images/ai-automation-workflow-desk.png",
  "leadership-bi-dashboard": "/images/bi-leadership-dashboard.png",
  "health-benefits-service-narrative": "/images/service-systems-montage.png"
};

function imageFor(value: string) {
  const normalized = value.toLowerCase();
  const match = Object.entries(visualByTheme).find(([key]) => normalized.includes(key));
  return match?.[1] || "/images/digital-command-center.png";
}

function trackEvent(event: string, payload: Record<string, string> = {}) {
  if (typeof window === "undefined") return;
  const win = window as typeof window & { dataLayer?: Array<Record<string, unknown>> };
  win.dataLayer = win.dataLayer || [];
  win.dataLayer.push({ event, ...payload });
}

export function MotionSection({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.section
      className={className}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
}

export function TrackEvent({
  event,
  payload = {}
}: {
  event: string;
  payload?: Record<string, string>;
}) {
  useEffect(() => {
    trackEvent(event, payload);
  }, [event, payload]);

  return null;
}

export function FAQAccordion({ faqs }: { faqs: FAQ[] }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="divide-y divide-brand-blue/10 rounded-lg border border-brand-blue/10 bg-white">
      {faqs.map((faq, index) => (
        <div key={faq.question}>
          <button
            type="button"
            className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            onClick={() => setOpen(open === index ? -1 : index)}
            aria-expanded={open === index}
          >
            <span className="font-semibold text-brand-blue">{faq.question}</span>
            <ChevronDown
              className={cn("h-5 w-5 shrink-0 text-brand-teal transition", open === index && "rotate-180")}
              aria-hidden="true"
            />
          </button>
          <div
            className={cn(
              "grid transition-all duration-300",
              open === index ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            )}
          >
            <div className="overflow-hidden">
              <p className="px-5 pb-5 text-sm leading-7 text-brand-dark/100">{faq.answer}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function CardShell({
  children,
  href
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col justify-between rounded-lg border border-brand-blue/10 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-brand-teal/40 hover:shadow-glow"
    >
      {children}
    </Link>
  );
}

function CardImageVisual({ image, title }: { image: string; title: string }) {
  return (
    <div className="relative mb-5 h-40 overflow-hidden rounded-lg bg-brand-blue">
      <Image
        src={image}
        alt={`${title} visual`}
        fill
        className="object-cover transition duration-500 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 33vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/90 via-brand-blue/15 to-transparent" />
    </div>
  );
}

export function BlogFilterGrid({ items }: { items: Blog[] }) {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const categories = useMemo(() => ["All", ...Array.from(new Set(items.map((item) => item.category)))], [items]);
  const filtered = items.filter((item) => {
    const categoryMatch = category === "All" || item.category === category;
    const queryMatch = `${item.title} ${item.excerpt} ${item.category}`.toLowerCase().includes(query.toLowerCase());
    return categoryMatch && queryMatch;
  });

  return (
    <div className="space-y-8">
      <FilterControls
        categories={categories}
        selected={category}
        onSelect={setCategory}
        query={query}
        onQuery={setQuery}
        placeholder="Search insights"
      />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((blog, index) => (
          <CardShell key={blog.slug} href={blogPath(blog.slug)}>
            <div>
              <CardImageVisual image={blogImages[blog.slug] || imageFor(`${blog.category} ${blog.title}`)} title={blog.title} />
              <div className="mb-5 flex items-center justify-between gap-4 text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
                <span>{blog.category}</span>
                <span>Insight</span>
              </div>
              <h3 className="text-xl font-semibold text-brand-blue">{blog.title}</h3>
              <p className="mt-4 text-sm leading-7 text-brand-dark/75">{blog.excerpt}</p>
            </div>
            <span className="mt-6 text-sm font-semibold text-brand-orange">Read insight</span>
          </CardShell>
        ))}
      </div>
    </div>
  );
}

export function CaseStudyFilterGrid({ items }: { items: CaseStudy[] }) {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(items.flatMap((item) => [...item.servicesUsed.slice(0, 2), item.industry])))],
    [items]
  );
  const filtered = items.filter((item) => {
    const categoryMatch = category === "All" || item.servicesUsed.includes(category) || item.industry === category;
    const queryMatch = `${item.title} ${item.industry} ${item.challenge} ${item.servicesUsed.join(" ")}`
      .toLowerCase()
      .includes(query.toLowerCase());
    return categoryMatch && queryMatch;
  });

  return (
    <div className="space-y-8">
      <FilterControls
        categories={categories}
        selected={category}
        onSelect={setCategory}
        query={query}
        onQuery={setQuery}
        placeholder="Search case studies"
      />
      <div className="grid gap-5 lg:grid-cols-2">
        {filtered.map((study, index) => (
          <CardShell key={study.slug} href={caseStudyPath(study.slug)}>
            <div>
              <CardImageVisual image={caseStudyImages[study.slug] || imageFor(`${study.title} ${study.industry} ${study.servicesUsed.join(" ")}`)} title={study.title} />
              <div className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">{study.industry}</div>
              <h3 className="text-2xl font-semibold text-brand-blue">{study.title}</h3>
              <p className="mt-4 text-sm leading-7 text-brand-dark/75">{study.challenge}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {study.servicesUsed.slice(0, 4).map((service) => (
                  <span key={service} className="rounded-full bg-brand-light px-3 py-1 text-xs font-semibold text-brand-blue">
                    {service}
                  </span>
                ))}
              </div>
            </div>
            <span className="mt-6 text-sm font-semibold text-brand-orange">Read case study</span>
          </CardShell>
        ))}
      </div>
    </div>
  );
}

export function PortfolioFilterGrid({ items }: { items: PortfolioItem[] }) {
  const [category, setCategory] = useState("All");
  const categories = useMemo(() => ["All", ...Array.from(new Set(items.map((item) => item.category)))], [items]);
  const filtered = category === "All" ? items : items.filter((item) => item.category === category);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-2">
        {categories.map((item) => (
          <button
            key={item}
            type="button"
          onClick={() => {
            setCategory(item);
            trackEvent("portfolio_filter", { category: item });
          }}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-semibold transition",
              category === item
                ? "border-brand-orange bg-brand-orange text-white shadow-orange"
                : "border-brand-blue/10 bg-white text-brand-blue hover:border-brand-teal"
            )}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item, index) => (
          <CardShell key={item.slug} href={item.caseStudySlug ? caseStudyPath(item.caseStudySlug) : "/contact"}>
            <div>
              <CardImageVisual image={portfolioImages[item.slug] || imageFor(`${item.title} ${item.category} ${item.services.join(" ")}`)} title={item.title} />
              <div className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">{item.category}</div>
              <h3 className="text-xl font-semibold text-brand-blue">{item.title}</h3>
              <p className="mt-3 text-sm font-semibold text-brand-dark/70">{item.industry}</p>
              <p className="mt-4 text-sm leading-7 text-brand-dark/75">{item.solution}</p>
            </div>
            <span className="mt-6 text-sm font-semibold text-brand-orange">
              {item.caseStudySlug ? "View proof" : "Request similar work"}
            </span>
          </CardShell>
        ))}
      </div>
    </div>
  );
}

function FilterControls({
  categories,
  selected,
  onSelect,
  query,
  onQuery,
  placeholder
}: {
  categories: string[];
  selected: string;
  onSelect: (value: string) => void;
  query: string;
  onQuery: (value: string) => void;
  placeholder: string;
}) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-wrap gap-2">
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => {
              onSelect(item);
              trackEvent("content_filter", { category: item });
            }}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-semibold transition",
              selected === item
                ? "border-brand-orange bg-brand-orange text-white shadow-orange"
                : "border-brand-blue/10 bg-white text-brand-blue hover:border-brand-teal"
            )}
          >
            {item}
          </button>
        ))}
      </div>
      <label className="relative block w-full lg:w-80">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-teal" />
        <span className="sr-only">{placeholder}</span>
        <input
          value={query}
          onChange={(event) => onQuery(event.target.value)}
          placeholder={placeholder}
          className="w-full rounded-full border border-brand-blue/10 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-brand-teal focus:ring-4 focus:ring-brand-teal/15"
        />
      </label>
    </div>
  );
}

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={cn(
        "fixed bottom-24 right-4 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-brand-blue text-white shadow-glow transition md:bottom-6",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      )}
      aria-label="Back to top"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}

export function StickyMobileCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-brand-blue/95 p-3 backdrop-blur md:hidden">
      <Link
        href="/free-digital-audit"
        className="flex h-12 items-center justify-center rounded-full bg-brand-orange px-5 text-sm font-bold text-white shadow-orange"
      >
        Book Free Digital Audit
      </Link>
    </div>
  );
}

export function MiniServiceSelector({
  value,
  onChange,
  name = "service"
}: {
  value: string;
  onChange: (value: string) => void;
  name?: string;
}) {
  return (
    <select
      name={name}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="w-full rounded-lg border border-brand-blue/10 bg-white px-4 py-3 text-sm text-brand-dark outline-none transition focus:border-brand-teal focus:ring-4 focus:ring-brand-teal/15"
    >
      <option value="">Select a service</option>
      {services.map((service) => (
        <option key={service.slug} value={service.title}>
          {service.title}
        </option>
      ))}
    </select>
  );
}
