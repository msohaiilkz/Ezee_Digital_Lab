import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BarChart3, Bot, BrainCircuit, CheckCircle2, Layers3, LineChart, Network, Sparkles } from "lucide-react";
import { BlogFilterGrid, CaseStudyFilterGrid, FAQAccordion, MotionSection, PortfolioFilterGrid, TrackEvent } from "@/components/interactive";
import { LeadForm } from "@/components/forms";
import {
  blogPath,
  blogs,
  caseStudies,
  caseStudyPath,
  globalFaqs,
  industries,
  portfolio,
  processSteps,
  serviceGroups,
  servicePath,
  services,
  site,
  type Blog,
  type CaseStudy,
  type Service
} from "@/content/site";
import { cn } from "@/lib/utils";

const iconMap = [Sparkles, BrainCircuit, Bot, Layers3, Network, BarChart3, LineChart, CheckCircle2];

const serviceVisuals: Record<string, string> = {
  "social-media-management": "/images/brand-social-studio.png",
  "brand-management": "/images/brand-communication-studio.png",
  "brand-positioning": "/images/digital-command-center.png",
  "ai-consultation-workflow-automation": "/images/ai-automation-workflow-desk.png",
  "crm-customer-experience-automation": "/images/ai-workflow-automation.png",
  "custom-erp-development": "/images/erp-operations-floor.png",
  "lms-development": "/images/lms-learning-lounge.png",
  "digital-transformation-as-a-service": "/images/digital-transformation-ecosystem.png",
  "technology-consultation": "/images/service-systems-montage.png",
  "web-app-development": "/images/web-app-interface-studio.png",
  "seo-aeo-performance-marketing": "/images/seo-aeo-search-intelligence.png",
  "business-intelligence-analytics": "/images/bi-executive-analytics-room.png"
};

const serviceShowcaseVisuals: Record<string, string> = {
  "social-media-management": "/images/brand-communication-studio.png",
  "brand-management": "/images/brand-social-studio.png",
  "brand-positioning": "/images/brand-communication-studio.png",
  "ai-consultation-workflow-automation": "/images/ai-workflow-automation.png",
  "crm-customer-experience-automation": "/images/digital-command-center.png",
  "custom-erp-development": "/images/erp-control-room.png",
  "lms-development": "/images/lms-learning-platform.png",
  "digital-transformation-as-a-service": "/images/hero-strategy-studio.png",
  "technology-consultation": "/images/digital-transformation-ecosystem.png",
  "web-app-development": "/images/web-app-product-studio.png",
  "seo-aeo-performance-marketing": "/images/service-systems-montage.png",
  "business-intelligence-analytics": "/images/bi-leadership-dashboard.png"
};

const serviceSupportVisuals: Record<string, string> = {
  "social-media-management": "/images/web-app-product-studio.png",
  "brand-management": "/images/hero-strategy-studio.png",
  "brand-positioning": "/images/brand-social-studio.png",
  "ai-consultation-workflow-automation": "/images/digital-command-center.png",
  "crm-customer-experience-automation": "/images/service-systems-montage.png",
  "custom-erp-development": "/images/digital-transformation-ecosystem.png",
  "lms-development": "/images/web-app-interface-studio.png",
  "digital-transformation-as-a-service": "/images/erp-control-room.png",
  "technology-consultation": "/images/bi-leadership-dashboard.png",
  "web-app-development": "/images/hero-strategy-studio.png",
  "seo-aeo-performance-marketing": "/images/bi-executive-analytics-room.png",
  "business-intelligence-analytics": "/images/digital-command-center.png"
};

function visualForService(slug: string) {
  return serviceVisuals[slug] || "/images/service-systems-montage.png";
}

function showcaseVisualForService(slug: string) {
  return serviceShowcaseVisuals[slug] || "/images/digital-command-center.png";
}

function supportVisualForService(slug: string) {
  return serviceSupportVisuals[slug] || "/images/hero-strategy-studio.png";
}

function visualForTheme(value: string) {
  const normalized = value.toLowerCase();
  if (normalized.includes("seo") || normalized.includes("aeo") || normalized.includes("search")) return "/images/seo-aeo-search-intelligence.png";
  if (normalized.includes("ai") || normalized.includes("automation")) return "/images/ai-automation-workflow-desk.png";
  if (normalized.includes("crm") || normalized.includes("customer")) return "/images/ai-workflow-automation.png";
  if (normalized.includes("erp") || normalized.includes("operating spine") || normalized.includes("insurance")) return "/images/erp-operations-floor.png";
  if (normalized.includes("lms") || normalized.includes("training") || normalized.includes("learning")) return "/images/lms-learning-lounge.png";
  if (normalized.includes("brand") || normalized.includes("social")) return "/images/brand-communication-studio.png";
  if (normalized.includes("dashboard") || normalized.includes("analytics") || normalized.includes("bi")) return "/images/bi-executive-analytics-room.png";
  if (normalized.includes("website") || normalized.includes("web") || normalized.includes("app")) return "/images/web-app-interface-studio.png";
  if (normalized.includes("transformation") || normalized.includes("brd") || normalized.includes("consultation")) return "/images/digital-transformation-ecosystem.png";
  return "/images/service-systems-montage.png";
}

export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

function faqSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };
}

export function Breadcrumbs({ items }: { items: Array<{ label: string; href?: string }> }) {
  return (
    <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-4 pt-8 text-sm lg:px-8">
      <ol className="flex flex-wrap items-center gap-2 text-brand-dark/60">
        <li>
          <Link href="/" className="font-semibold text-brand-teal hover:text-brand-blue">
            Home
          </Link>
        </li>
        {items.map((item) => (
          <li key={`${item.label}-${item.href || "current"}`} className="flex items-center gap-2">
            <span>/</span>
            {item.href ? (
              <Link href={item.href} className="font-semibold text-brand-teal hover:text-brand-blue">
                {item.label}
              </Link>
            ) : (
              <span className="font-semibold text-brand-blue">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary"
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "light";
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-bold transition hover:-translate-y-0.5",
        variant === "primary" && "bg-brand-orange text-white shadow-orange",
        variant === "secondary" && "border border-brand-blue/15 bg-white text-brand-blue hover:border-brand-teal",
        variant === "light" && "border border-white/20 bg-white/10 text-white hover:bg-white hover:text-brand-blue"
      )}
    >
      {children}
      <ArrowRight className="h-4 w-4" />
    </Link>
  );
}

function SectionHeader({
  eyebrow,
  title,
  copy,
  light = false
}: {
  eyebrow?: string;
  title: string;
  copy?: string;
  light?: boolean;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow && (
        <p className={cn("text-xs font-bold uppercase tracking-[0.2em]", light ? "text-brand-aqua" : "text-brand-teal")}>
          {eyebrow}
        </p>
      )}
      <h2 className={cn("mt-3 text-balance text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl", light ? "text-white" : "text-brand-blue")}>
        {title}
      </h2>
      {copy && <p className={cn("mt-5 text-base leading-8", light ? "text-white/70" : "text-brand-dark/75")}>{copy}</p>}
    </div>
  );
}

function Hero({
  eyebrow,
  title,
  copy,
  primary,
  secondary,
  image
}: {
  eyebrow: string;
  title: string;
  copy: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  image: string;
}) {
  return (
    <section className="relative overflow-hidden bg-blue-radial text-white">
      <div className="absolute inset-0 bg-lab-grid lab-grid opacity-45" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:gap-12 sm:px-6 sm:py-16 lg:grid-cols-[1fr_0.95fr] lg:px-8 lg:py-28">
        <div className="flex flex-col justify-center">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-aqua">{eyebrow}</p>
          <h1 className="mt-5 text-balance text-3xl font-black tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">{title}</h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/75 sm:text-lg sm:leading-9">{copy}</p>
          {(primary || secondary) && (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {primary && <ButtonLink href={primary.href}>{primary.label}</ButtonLink>}
              {secondary && (
                <ButtonLink href={secondary.href} variant="light">
                  {secondary.label}
                </ButtonLink>
              )}
            </div>
          )}
          <div className="mt-10 grid gap-3 text-sm text-white/70 sm:grid-cols-3">
            {["Strategy-first execution", "AI-native thinking", "Brand and technology under one roof"].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-brand-aqua" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="premium-frame relative min-h-[280px] overflow-hidden rounded-lg border border-white/20 bg-white/10 shadow-glow sm:min-h-[360px] md:min-h-[420px] lg:min-h-[520px]">
          <Image src={image} alt={`${site.name} visual`} fill priority className="object-cover transition duration-700 hover:scale-[1.03]" sizes="(max-width: 1024px) 100vw, 48vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/90 via-brand-blue/25 to-transparent" />
          <div className="scan-line" />
          <div className="pulse-node absolute right-[14%] top-[18%] h-3 w-3 rounded-full bg-brand-orange shadow-orange" />
          <div className="pulse-node absolute left-[18%] top-[28%] h-2.5 w-2.5 rounded-full bg-brand-aqua shadow-glow" style={{ animationDelay: "0.7s" }} />
          <div className="pulse-node absolute bottom-[34%] right-[35%] h-2 w-2 rounded-full bg-brand-sky" style={{ animationDelay: "1.2s" }} />
          <DashboardFloat />
        </div>
      </div>
    </section>
  );
}

function DashboardFloat() {
  return (
    <div className="absolute bottom-5 left-5 right-5 grid gap-3 rounded-lg border border-white/15 bg-brand-blue/70 p-4 backdrop-blur">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-[0.18em] text-brand-aqua">Digital Growth Engine</span>
        <span className="rounded-full bg-brand-orange px-3 py-1 text-xs font-bold text-white">Audit Ready</span>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {["Brand", "Automation", "Systems"].map((item, index) => (
          <div key={item} className="rounded-md bg-white/10 p-3">
            <div className="h-1.5 rounded-full bg-brand-aqua" style={{ width: `${64 + index * 12}%` }} />
            <p className="mt-2 text-xs font-semibold text-white/100">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CtaBand({
  title = "Your business does not need another vendor. It needs a digital growth partner.",
  copy = "Whether you want to build a stronger brand, automate workflows, launch a custom ERP, develop an LMS, improve digital presence, or transform operations, Ezee Technologies Digital Labs helps you move from scattered execution to structured digital growth.",
  primary = { label: "Book a Free Digital Audit", href: "/free-digital-audit" },
  secondary = { label: "Talk to Ezee Technologies", href: "/contact" }
}: {
  title?: string;
  copy?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="bg-brand-blue px-4 py-12 text-white sm:px-6 sm:py-14 lg:px-8 lg:py-16">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.4fr_auto] lg:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-aqua">Next Step</p>
          <h2 className="mt-3 max-w-4xl text-balance text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">{title}</h2>
          <p className="mt-5 max-w-3xl text-base leading-8 text-white/70">{copy}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
          <ButtonLink href={primary.href}>{primary.label}</ButtonLink>
          <ButtonLink href={secondary.href} variant="light">
            {secondary.label}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

export function HomePage() {
  const featuredServices = services.slice(0, 10);
  return (
    <>
      <JsonLd data={faqSchema(globalFaqs)} />
      <Hero
        eyebrow="Ezee Technologies Digital Labs"
        title="Your Digital Growth Engine. Built for Brands That Want to Lead."
        copy="Ezee Technologies Digital Labs helps businesses grow, automate, and transform through brand strategy, social media management, AI workflows, custom ERPs, LMS platforms, business automation, digital transformation, websites, apps, analytics, and technology consultation."
        primary={{ label: "Book a Free Digital Audit", href: "/free-digital-audit" }}
        secondary={{ label: "Explore Our Services", href: "/services" }}
        image="/images/hero-strategy-studio.png"
      />

      <MotionSection className="bg-white px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-4">
          {[
            "Strategy-first execution",
            "AI-native workflow thinking",
            "Custom systems, not templates",
            "Business-first development"
          ].map((item) => (
            <div key={item} className="rounded-lg border border-brand-blue/10 p-5">
              <CheckCircle2 className="h-6 w-6 text-brand-teal" />
              <p className="mt-4 font-semibold text-brand-blue">{item}</p>
            </div>
          ))}
        </div>
      </MotionSection>

      <MotionSection className="bg-brand-light px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-teal">The Problem</p>
            <h2 className="mt-3 text-balance text-2xl font-bold text-brand-blue sm:text-3xl md:text-4xl lg:text-5xl">
              Most businesses are not losing because their product is weak.
            </h2>
          </div>
          <div className="rounded-lg bg-white p-7 shadow-sm">
            <p className="text-lg leading-9 text-brand-dark/80">
              They are losing because their digital ecosystem is weak. Their website does not convert, their content does not
              position them, their workflows are manual, their systems do not talk to each other, and their customer journey feels
              disconnected.
            </p>
          </div>
        </div>
      </MotionSection>

      <ServicesSnapshot services={featuredServices} />
      <VisualSystemsGallery />
      <TransformationLayers />
      <IndustriesPreview />
      <ProofPreview />
      <ProcessPreview />
      <InsightsPreview />
      <AuditPreview />
      <MotionSection className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-teal">Buyer Questions</p>
            <h2 className="mt-3 text-balance text-2xl font-bold text-brand-blue sm:text-3xl md:text-4xl lg:text-5xl">
              Clear answers before a serious client conversation starts.
            </h2>
            <p className="mt-5 text-base leading-8 text-brand-dark/75">
              These answers help founders, business heads, and marketing teams understand where Ezee Technologies Digital Labs can help.
            </p>
          </div>
          <FAQAccordion faqs={globalFaqs} />
        </div>
      </MotionSection>
      <CtaBand />
    </>
  );
}

function VisualSystemsGallery() {
  const systems = [
    { title: "AI Workflow Automation", copy: "Intake, routing, reminders, proposals, and reporting flows.", href: servicePath("ai-consultation-workflow-automation") },
    { title: "Custom ERP Operations", copy: "Role-based operating systems for teams, approvals, and visibility.", href: servicePath("custom-erp-development") },
    { title: "LMS Enablement", copy: "Learning journeys, onboarding flows, progress, and training governance.", href: servicePath("lms-development") },
    { title: "Brand Growth Studio", copy: "Positioning, social media, content systems, and conversion journeys.", href: servicePath("brand-positioning") },
    { title: "Search & Answer Intelligence", copy: "SEO, AEO, intent-led content, and discoverability architecture.", href: servicePath("seo-aeo-performance-marketing") },
    { title: "Executive BI Visibility", copy: "Dashboards that turn scattered activity into leadership decisions.", href: servicePath("business-intelligence-analytics") },
    { title: "Web & App Product Studio", copy: "Premium interfaces designed around trust, clarity, and action.", href: servicePath("web-app-development") },
    { title: "Transformation Ecosystem", copy: "A practical roadmap from fragmented tools to connected execution.", href: servicePath("digital-transformation-as-a-service") }
  ];

  return (
    <MotionSection className="bg-brand-blue px-4 py-12 text-white sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          light
          eyebrow="Premium Growth Architecture"
          title="One strategic partner for brand, automation, systems, analytics, and digital transformation."
          copy="See the kind of visual and operational discipline Ezee Technologies Digital Labs brings to the work: strategy that looks premium, systems that feel practical, and digital experiences built to convert."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {systems.map((system, index) => {
            const Icon = iconMap[index % iconMap.length];
            return (
              <Link
                key={system.title}
                href={system.href}
                className="group relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.08] p-6 transition hover:-translate-y-1 hover:border-brand-aqua/40 hover:bg-white/[0.12]"
              >
                <div className="absolute right-4 top-4 h-20 w-20 rounded-full border border-brand-aqua/20" />
                <div className="relative flex h-12 w-12 items-center justify-center rounded-lg bg-brand-aqua/15 text-brand-aqua">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="relative mt-7 text-xs font-bold uppercase tracking-[0.18em] text-brand-aqua">Explore Capability</p>
                <h3 className="relative mt-2 text-xl font-bold text-white">{system.title}</h3>
                <p className="relative mt-4 text-sm leading-7 text-white/70">{system.copy}</p>
                <span className="relative mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand-aqua">
                  Open service <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </MotionSection>
  );
}

function ServicesSnapshot({ services: items }: { services: Service[] }) {
  return (
    <MotionSection className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Services Snapshot"
          title="Brand, AI, automation, ERP, LMS, websites, apps, analytics, and growth in one connected system."
          copy="Every service page is built like a buying journey: clear problem, business outcome, proof, relevant insights, strong FAQ coverage, and a practical next step."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((service, index) => (
            <ServiceCard key={service.slug} service={service} index={index} />
          ))}
        </div>
      </div>
    </MotionSection>
  );
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = iconMap[index % iconMap.length];
  return (
    <Link
      href={servicePath(service.slug)}
      className="magnetic-card group rounded-lg border border-brand-blue/10 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:border-brand-teal/40 hover:shadow-glow"
    >
      <div className="relative h-40 overflow-hidden rounded-lg bg-brand-blue">
        <Image
          src={visualForService(service.slug)}
          alt={`${service.title} visual`}
          fill
          className="object-cover opacity-90 transition duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/90 via-brand-blue/20 to-transparent" />
        <div className="absolute bottom-3 left-3 flex h-11 w-11 items-center justify-center rounded-lg bg-white/15 text-brand-aqua backdrop-blur transition group-hover:bg-brand-orange group-hover:text-white">
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div className="p-2 pt-5">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-teal">{service.category}</p>
        <h3 className="mt-3 text-xl font-bold text-brand-blue">{service.title}</h3>
        <p className="mt-4 text-sm leading-7 text-brand-dark/75">{service.summary}</p>
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand-orange">
          Explore service <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}

function TransformationLayers() {
  const layers = [
    {
      title: "AI + Automation",
      copy: "Map repetitive work, prioritize practical AI use cases, and build workflows for lead intake, reporting, document handling, support, and CRM triggers.",
      href: servicePath("ai-consultation-workflow-automation")
    },
    {
      title: "Brand + Growth",
      copy: "Create positioning, social media systems, messaging, SEO/AEO content, landing pages, and campaign journeys that build recall and demand.",
      href: servicePath("brand-positioning")
    },
    {
      title: "ERP, LMS + Custom Systems",
      copy: "Build custom operating systems, learning platforms, dashboards, portals, websites, and apps around real workflows and roles.",
      href: servicePath("custom-erp-development")
    },
    {
      title: "Digital Transformation",
      copy: "Create a practical roadmap from scattered tools and manual follow-ups to connected systems, dashboards, automation, and operating clarity.",
      href: servicePath("digital-transformation-as-a-service")
    }
  ];

  return (
    <MotionSection className="bg-brand-blue px-4 py-12 text-white sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          light
          eyebrow="Growth Architecture"
          title="The website, content, workflows, dashboards, and systems should make one business journey."
          copy="Ezee Technologies Digital Labs brings strategy, creative, AI, automation, custom systems, and reporting into a guided digital growth engine."
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-4">
          {layers.map((layer) => (
            <Link key={layer.title} href={layer.href} className="rounded-lg border border-white/10 bg-white/10 p-6 transition hover:-translate-y-1 hover:bg-white/15">
              <h3 className="text-xl font-bold text-white">{layer.title}</h3>
              <p className="mt-4 text-sm leading-7 text-white/70">{layer.copy}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand-aqua">
                Explore <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}

function IndustriesPreview() {
  return (
    <MotionSection className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-teal">Industries</p>
          <h2 className="mt-3 text-balance text-2xl font-bold text-brand-blue sm:text-3xl md:text-4xl lg:text-5xl">
            Built for every business ready to grow digitally.
          </h2>
          <p className="mt-6 text-base leading-8 text-brand-dark/75">
            Ezee Technologies Digital Labs works with ambitious businesses across sectors that need stronger branding, smarter systems, better
            customer journeys, and technology-led growth.
          </p>
          <div className="mt-7">
            <ButtonLink href="/industries" variant="secondary">
              Explore Industries
            </ButtonLink>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {industries.slice(0, 6).map((industry) => (
            <Link key={industry.slug} href="/industries" className="rounded-lg border border-brand-blue/10 p-5 transition hover:border-brand-teal hover:shadow-glow">
              <h3 className="font-bold text-brand-blue">{industry.title}</h3>
              <p className="mt-3 text-sm leading-7 text-brand-dark/70">{industry.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}

function ProofPreview() {
  return (
    <MotionSection className="bg-brand-light px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Proof Library"
          title="Case studies and portfolio previews that connect problems, execution, and impact."
          copy="The proof is written with publish-safe, qualitative impact wording. No unverified client names or invented metrics."
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {caseStudies.slice(0, 3).map((study) => (
            <Link key={study.slug} href={caseStudyPath(study.slug)} className="rounded-lg bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-glow">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-teal">{study.industry}</p>
              <h3 className="mt-4 text-xl font-bold text-brand-blue">{study.title}</h3>
              <p className="mt-4 text-sm leading-7 text-brand-dark/75">{study.impact}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand-orange">
                Read case study <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}

function ProcessPreview() {
  return (
    <MotionSection className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Process"
          title="A clear process. From confusion to execution."
          copy="Ezee Technologies Digital Labs does not start with random design or development. The process begins with business gaps, customer journeys, workflows, and growth goals."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-4">
          {processSteps.map((step, index) => (
            <div key={step.title} className="rounded-lg border border-brand-blue/10 bg-white p-5">
              <span className="text-sm font-black text-brand-orange">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 font-bold text-brand-blue">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 text-brand-dark/70">{step.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}

function InsightsPreview() {
  return (
    <MotionSection className="bg-brand-blue px-4 py-12 text-white sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          light
          eyebrow="Insights"
          title="Practical guides for brands that want to grow, automate, and transform."
          copy="Blogs are structured for SEO, AEO, internal linking, and conversion from education traffic to service interest."
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {blogs.slice(0, 3).map((blog) => (
            <Link key={blog.slug} href={blogPath(blog.slug)} className="rounded-lg border border-white/10 bg-white/10 p-6 transition hover:-translate-y-1 hover:bg-white/15">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-aqua">{blog.category}</p>
              <h3 className="mt-4 text-xl font-bold text-white">{blog.title}</h3>
              <p className="mt-4 text-sm leading-7 text-white/70">{blog.excerpt}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand-aqua">
                Read insight <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}

function AuditPreview() {
  return (
    <MotionSection className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="relative min-h-[380px] overflow-hidden rounded-lg border border-brand-blue/10 shadow-glow">
          <Image src="/images/bi-leadership-dashboard.png" alt="Digital growth audit dashboard montage" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-teal">Free Digital Growth Audit</p>
          <h2 className="mt-3 text-balance text-2xl font-bold text-brand-blue sm:text-3xl md:text-4xl lg:text-5xl">
            We review your brand presence, website experience, social media, automation gaps, system gaps, AI use cases, and digital growth opportunities.
          </h2>
          <p className="mt-6 text-base leading-8 text-brand-dark/75">
            The audit helps identify what is broken, what is missing, what should be connected, and what can create the highest business impact.
          </p>
          <div className="mt-7">
            <ButtonLink href="/free-digital-audit">Request My Free Audit</ButtonLink>
          </div>
        </div>
      </div>
    </MotionSection>
  );
}

export function ServicesHub() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Ezee Digital Labs services",
          itemListElement: services.map((service, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: service.title,
            url: `${site.url}${servicePath(service.slug)}`
          }))
        }}
      />
      <Breadcrumbs items={[{ label: "Services" }]} />
      <Hero
        eyebrow="Services"
        title="Digital, AI, Brand, Automation & Technology Services Under One Roof."
        copy="From brand building to AI automation, from social media to ERP development, from LMS platforms to full digital transformation, Ezee Digital Labs helps businesses move faster, look sharper, and operate smarter."
        primary={{ label: "Book a Free Digital Audit", href: "/free-digital-audit" }}
        secondary={{ label: "See Case Studies", href: "/case-studies" }}
        image="/images/hero-strategy-studio.png"
      />
      <MotionSection className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl space-y-12">
          {serviceGroups.map((group) => (
            <div key={group.title}>
              <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-teal">{group.title}</p>
                  <h2 className="mt-2 text-2xl font-bold text-brand-blue">{group.description}</h2>
                </div>
              </div>
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {group.services.map((slug, index) => {
                  const service = services.find((entry) => entry.slug === slug);
                  return service ? <ServiceCard key={slug} service={service} index={index} /> : null;
                })}
              </div>
            </div>
          ))}
          <div className="relative overflow-hidden rounded-2xl border border-brand-blue/10 bg-white p-7 shadow-[0_18px_48px_rgba(17,48,64,0.10)] sm:p-9">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-teal via-brand-aqua to-brand-orange" />
            <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand-aqua/20 blur-3xl" />
            <div aria-hidden className="pointer-events-none absolute -bottom-20 -left-10 h-52 w-52 rounded-full bg-brand-orange/10 blur-3xl" />
            <div className="relative">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-teal">Service Path</p>
              <h2 className="mt-3 text-2xl font-bold text-brand-blue sm:text-3xl">Not sure what you need?</h2>
              <p className="mt-4 max-w-3xl text-base leading-8 text-brand-dark/75">
                Choose Brand Growth if people do not remember you. Choose Automation if your team is repeating manual tasks.
                Choose ERP if operations are scattered. Choose LMS if training is unstructured. Choose Technology Consultation if
                you need clarity before spending.
              </p>
              <div className="mt-7">
                <ButtonLink href="/free-digital-audit">Get the Right Service Path</ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </MotionSection>
      <CtaBand />
    </>
  );
}

export function ServiceDetail({ service }: { service: Service }) {
  const relatedServices = service.relatedServices.map((slug) => services.find((item) => item.slug === slug)).filter(Boolean) as Service[];
  const relatedBlogs = service.relatedBlogs.map((slug) => blogs.find((item) => item.slug === slug)).filter(Boolean) as Blog[];
  const relatedStudies = service.relatedCaseStudies.map((slug) => caseStudies.find((item) => item.slug === slug)).filter(Boolean) as CaseStudy[];

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    provider: {
      "@type": "Organization",
      name: site.name,
      url: site.url
    },
    description: service.summary,
    serviceType: service.category,
    areaServed: "Global",
    audience: service.whoFor.map((audience) => ({
      "@type": "Audience",
      audienceType: audience
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.title} deliverables`,
      itemListElement: service.deliverables.map((deliverable, index) => ({
        "@type": "Offer",
        position: index + 1,
        itemOffered: {
          "@type": "Service",
          name: deliverable
        }
      }))
    },
    url: `${site.url}${servicePath(service.slug)}`
  };

  return (
    <>
      <JsonLd data={schema} />
      <JsonLd data={faqSchema(service.faqs)} />
      <Breadcrumbs items={[{ label: "Services", href: "/services" }, { label: service.title }]} />
      <Hero
        eyebrow={service.category}
        title={service.hero}
        copy={service.summary}
        primary={{ label: service.cta, href: "/free-digital-audit" }}
        secondary={{ label: "Book Consultation", href: "/book-consultation" }}
        image={visualForService(service.slug)}
      />
      <ServiceVisualShowcase service={service} />
      <MotionSection className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          <InfoPanel eyebrow="Problem" title="What slows the business down" copy={service.problem} />
          <InfoPanel eyebrow="Solution" title="How EZEE DIGITAL LABS solves it" copy={service.solution} />
        </div>
      </MotionSection>
      <MotionSection className="bg-brand-light px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <SectionHeader eyebrow="Deliverables" title={`What ${service.title} includes`} />
            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {service.deliverables.map((item) => (
                <ListPill key={item}>{item}</ListPill>
              ))}
            </div>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="text-2xl font-bold text-brand-blue">Who it is for</h3>
            <div className="mt-6 grid gap-3">
              {service.whoFor.map((item) => (
                <ListPill key={item}>{item}</ListPill>
              ))}
            </div>
          </div>
        </div>
      </MotionSection>
      <MotionSection className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-teal">Benefits</p>
            <h2 className="mt-3 text-3xl font-bold text-brand-blue">Business outcomes this page is built to create.</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {service.benefits.map((item) => (
              <div key={item} className="rounded-lg border border-brand-blue/10 p-5">
                <CheckCircle2 className="h-5 w-5 text-brand-teal" />
                <p className="mt-3 font-semibold text-brand-blue">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </MotionSection>
      <RelatedContent services={relatedServices} blogs={relatedBlogs} studies={relatedStudies} />
      <MotionSection className="bg-brand-light px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionHeader eyebrow="FAQ" title={`Questions about ${service.title}`} />
            <div className="mt-8">
              <FAQAccordion faqs={service.faqs} />
            </div>
            <div className="mt-6">
              <FormSupportPanel
                image={supportVisualForService(service.slug)}
                eyebrow="Free Service Roadmap"
                title="Get a practical next-step plan."
                copy="Request a quick review and Ezee Digital Labs will map the clearest service path before you spend on execution."
                points={["Priority growth or system gap", "Recommended service path", "Practical next step"]}
              />
            </div>
          </div>
          <LeadForm
            title={service.cta}
            description={`Request a focused roadmap for ${service.title}. Share your goal, current links, timeline, and business context so the reply is specific.`}
            endpoint="/api/service-inquiry"
            formType={`service:${service.slug}`}
            defaultService={service.title}
            compact
            eyebrow="Service Inquiry"
            submitLabel={service.cta}
          />
        </div>
      </MotionSection>
      <CtaBand
        primary={{ label: service.cta, href: "/free-digital-audit" }}
        secondary={{ label: "Explore Related Work", href: "/case-studies" }}
      />
    </>
  );
}

function ServiceVisualShowcase({ service }: { service: Service }) {
  return (
    <MotionSection className="bg-brand-blue px-4 py-12 text-white sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="premium-frame relative min-h-[420px] overflow-hidden rounded-lg border border-white/15 bg-white/10 shadow-glow">
          <Image
            src={showcaseVisualForService(service.slug)}
            alt={`${service.title} premium technology visual`}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 58vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/85 via-brand-blue/30 to-brand-blue/30" />
          <div className="scan-line" />
          <div className="absolute bottom-5 left-5 right-5 rounded-lg border border-white/15 bg-brand-blue/75 p-5 text-white backdrop-blur">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-aqua">EZEE DIGITAL LABS View</p>
            <h2 className="mt-2 text-2xl font-bold">{service.title}</h2>
          </div>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-aqua">What This Helps You Fix</p>
          <h2 className="mt-3 text-balance text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
            Move from unclear digital effort to a focused growth layer.
          </h2>
          <p className="mt-6 text-base leading-8 text-white/70">
            Ezee Digital Labs aligns the business problem, service scope, proof, deliverables, and next step so your team can
            decide with confidence before investing more time or budget.
          </p>
          <div className="mt-8 grid gap-3">
            {["Map the business gap", "Design the service path", "Build the right digital layer", "Align proof, insight, and CTA"].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-sm font-semibold text-white">
                <CheckCircle2 className="h-4 w-4 text-brand-aqua" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MotionSection>
  );
}

function InfoPanel({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return (
    <div className="rounded-lg border border-brand-blue/10 bg-white p-7 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-teal">{eyebrow}</p>
      <h2 className="mt-3 text-2xl font-bold text-brand-blue">{title}</h2>
      <p className="mt-5 text-base leading-8 text-brand-dark/80">{copy}</p>
    </div>
  );
}

function ListPill({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 rounded-lg border border-brand-blue/10 bg-white px-4 py-3 text-sm font-semibold text-brand-blue">
      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" />
      <span>{children}</span>
    </div>
  );
}

function FormSupportPanel({
  image,
  eyebrow,
  title,
  copy,
  points
}: {
  image: string;
  eyebrow: string;
  title: string;
  copy: string;
  points: string[];
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-brand-blue/10 bg-white shadow-sm">
      <div className="relative h-64 overflow-hidden bg-brand-blue">
        <Image src={image} alt={`${title} visual`} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 42vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/95 via-brand-blue/30 to-transparent" />
        <div className="absolute bottom-5 left-5 right-5">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-aqua">{eyebrow}</p>
          <h3 className="mt-2 text-2xl font-bold text-white">{title}</h3>
        </div>
      </div>
      <div className="p-6">
        <p className="text-sm leading-7 text-brand-dark/75">{copy}</p>
        <div className="mt-5 grid gap-3">
          {points.map((point) => (
            <div key={point} className="flex items-start gap-3 text-sm font-semibold text-brand-blue">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" />
              <span>{point}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RelatedContent({
  services: relatedServices,
  blogs: relatedBlogs,
  studies
}: {
  services: Service[];
  blogs: Blog[];
  studies: CaseStudy[];
}) {
  return (
    <MotionSection className="bg-brand-blue px-4 py-12 text-white sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeader light eyebrow="Decision Path" title="Related services, insights, and proof" />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          <RelatedColumn
            title="Services"
            items={relatedServices.map((item) => ({ label: item.title, href: servicePath(item.slug), copy: item.summary }))}
          />
          <RelatedColumn
            title="Insights"
            items={relatedBlogs.map((item) => ({ label: item.title, href: blogPath(item.slug), copy: item.excerpt }))}
          />
          <RelatedColumn
            title="Case Studies"
            items={studies.map((item) => ({ label: item.title, href: caseStudyPath(item.slug), copy: item.impact }))}
          />
        </div>
      </div>
    </MotionSection>
  );
}

function RelatedColumn({
  title,
  items
}: {
  title: string;
  items: Array<{ label: string; href: string; copy: string }>;
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/10 p-5">
      <h3 className="text-lg font-bold text-brand-aqua">{title}</h3>
      <div className="mt-5 grid gap-4">
        {items.length > 0 ? (
          items.map((item) => (
            <Link key={item.href} href={item.href} className="block rounded-lg bg-white/10 p-4 transition hover:bg-white/15">
              <span className="font-semibold text-white">{item.label}</span>
              <p className="mt-2 line-clamp-3 text-sm leading-6 text-white/70">{item.copy}</p>
            </Link>
          ))
        ) : (
          <Link href="/free-digital-audit" className="block rounded-lg bg-white/10 p-4 text-sm font-semibold text-white">
            Book a Free Digital Audit
          </Link>
        )}
      </div>
    </div>
  );
}

export function IndustriesPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Industries" }]} />
      <Hero
        eyebrow="Industries"
        title="Built for every business ready to grow digitally."
        copy="Ezee Technologies Digital Labs works with ambitious businesses across sectors that need stronger branding, smarter systems, better customer journeys, and technology-led growth."
        primary={{ label: "Explore the right growth layer", href: "/free-digital-audit" }}
        secondary={{ label: "View Services", href: "/services" }}
        image="/images/erp-control-room.png"
      />
      <MotionSection className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => (
            <div key={industry.slug} className="rounded-lg border border-brand-blue/10 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-brand-blue">{industry.title}</h2>
              <p className="mt-4 text-sm leading-7 text-brand-dark/75">{industry.description}</p>
              <div className="mt-5">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-teal">Common problems</p>
                <div className="mt-3 grid gap-2">
                  {industry.problems.map((problem) => (
                    <ListPill key={problem}>{problem}</ListPill>
                  ))}
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {industry.services.map((slug) => {
                  const service = services.find((item) => item.slug === slug);
                  return service ? (
                    <Link key={slug} href={servicePath(slug)} className="rounded-full bg-brand-light px-3 py-1 text-xs font-bold text-brand-blue">
                      {service.title}
                    </Link>
                  ) : null;
                })}
              </div>
            </div>
          ))}
        </div>
      </MotionSection>
      <CtaBand primary={{ label: "Book Industry Audit", href: "/free-digital-audit" }} secondary={{ label: "Talk to Ezee Technologies", href: "/contact" }} />
    </>
  );
}

export function PortfolioPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Portfolio" }]} />
      <Hero
        eyebrow="Portfolio"
        title="Work that combines strategy, design, technology, and execution."
        copy="Explore how Ezee Technologies Digital Labs supports brand launches, social media systems, websites, ERPs, LMS platforms, AI automations, digital roadmaps, and dashboards."
        primary={{ label: "Book a Free Digital Audit", href: "/free-digital-audit" }}
        secondary={{ label: "Read Case Studies", href: "/case-studies" }}
        image="/images/web-app-product-studio.png"
      />
      <MotionSection className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <PortfolioFilterGrid items={portfolio} />
        </div>
      </MotionSection>
      <CtaBand />
    </>
  );
}

export function CaseStudiesPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Ezee Technologies Digital Labs case studies",
          itemListElement: caseStudies.map((study, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: study.title,
            url: `${site.url}${caseStudyPath(study.slug)}`
          }))
        }}
      />
      <Breadcrumbs items={[{ label: "Case Studies" }]} />
      <Hero
        eyebrow="Case Studies"
        title="Proof of strategy, systems, automation, and digital growth."
        copy="Read how Ezee Technologies Digital Labs solves problems across brand, content, AI automation, ERP, LMS, websites, dashboards, and transformation."
        primary={{ label: "Have a similar challenge?", href: "/book-consultation" }}
        secondary={{ label: "Explore Services", href: "/services" }}
        image="/images/bi-executive-analytics-room.png"
      />
      <MotionSection className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <CaseStudyFilterGrid items={caseStudies} />
        </div>
      </MotionSection>
      <CtaBand />
    </>
  );
}

export function CaseStudyDetail({ study }: { study: CaseStudy }) {
  const relatedServices = study.relatedServices.map((slug) => services.find((item) => item.slug === slug)).filter(Boolean) as Service[];
  const relatedBlogs = study.relatedBlogs.map((slug) => blogs.find((item) => item.slug === slug)).filter(Boolean) as Blog[];
  const relatedStudies = caseStudies.filter((item) => item.slug !== study.slug).slice(0, 2);

  return (
    <>
      <TrackEvent event="case_study_view" payload={{ slug: study.slug, industry: study.industry }} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: study.title,
          about: study.industry,
          provider: { "@type": "Organization", name: site.name, url: site.url },
          url: `${site.url}${caseStudyPath(study.slug)}`
        }}
      />
      <Breadcrumbs items={[{ label: "Case Studies", href: "/case-studies" }, { label: study.title }]} />
      <Hero
        eyebrow={study.industry}
        title={study.title}
        copy={study.challenge}
        primary={{ label: "Book Consultation", href: "/book-consultation" }}
        secondary={{ label: "Explore Related Services", href: "/services" }}
        image={visualForTheme(`${study.title} ${study.industry} ${study.servicesUsed.join(" ")}`)}
      />
      <MotionSection className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-3">
          <InfoPanel eyebrow="Challenge" title="What the business needed" copy={study.challenge} />
          <InfoPanel eyebrow="Business Gap" title="What was slowing the journey" copy={study.gap} />
          <InfoPanel eyebrow="Impact" title="What changed" copy={study.impact} />
        </div>
      </MotionSection>
      <MotionSection className="bg-brand-light px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl items-start gap-8 lg:grid-cols-[1fr_0.85fr]">
          <div className="rounded-lg bg-white p-7 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-teal">Solution</p>
            <h2 className="mt-3 text-3xl font-bold text-brand-blue">What Ezee Technologies designed</h2>
            <p className="mt-5 text-base leading-8 text-brand-dark/80">{study.solution}</p>
            <h3 className="mt-9 text-2xl font-bold text-brand-blue">Execution approach</h3>
            <p className="mt-4 text-base leading-8 text-brand-dark/80">{study.execution}</p>
            <div className="mt-8 rounded-lg border border-brand-blue/10 bg-brand-light p-5">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-teal">Commercial takeaway</p>
              <p className="mt-3 text-sm leading-7 text-brand-dark/75">{study.cta}</p>
            </div>
          </div>
          <div>
            <div className="rounded-lg bg-brand-blue p-6 text-white">
              <h3 className="text-xl font-bold">Services used</h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {study.servicesUsed.map((service) => (
                  <span key={service} className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-brand-aqua">
                    {service}
                  </span>
                ))}
              </div>
              <p className="mt-6 text-sm leading-7 text-white/70">{study.cta}</p>
              <div className="mt-6">
                <ButtonLink href="/book-consultation">Talk to Ezee Technologies</ButtonLink>
              </div>
            </div>
            <div className="mt-5">
              <LeadForm
                title="Discuss a Similar Challenge"
                description="Share your challenge and the case study that feels closest to your business."
                endpoint="/api/case-study-inquiry"
                formType={`case-study:${study.slug}`}
                compact
                eyebrow="Case Study Inquiry"
                submitLabel="Request a Relevant Plan"
              />
            </div>
          </div>
        </div>
      </MotionSection>
      <RelatedContent services={relatedServices} blogs={relatedBlogs} studies={relatedStudies} />
      <CtaBand primary={{ label: "Book a Consultation", href: "/book-consultation" }} secondary={{ label: "View All Case Studies", href: "/case-studies" }} />
    </>
  );
}

export function ProcessPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Process" }]} />
      <Hero
        eyebrow="Process"
        title="A clear process. From confusion to execution."
        copy="We do not start with random design or development. We start by understanding your business, gaps, customer journey, workflows, and growth goals."
        primary={{ label: "Start with a Free Digital Audit", href: "/free-digital-audit" }}
        secondary={{ label: "View Case Studies", href: "/case-studies" }}
        image="/images/lms-learning-platform.png"
      />
      <MotionSection className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <div key={step.title} className="rounded-lg border border-brand-blue/10 p-6 shadow-sm">
                <span className="text-sm font-black text-brand-orange">{String(index + 1).padStart(2, "0")}</span>
                <h2 className="mt-4 text-2xl font-bold text-brand-blue">{step.title}</h2>
                <p className="mt-4 text-sm leading-7 text-brand-dark/75">{step.detail}</p>
              </div>
            ))}
          </div>
          <div className="relative mt-12 overflow-hidden rounded-2xl border border-brand-blue/10 bg-white p-7 shadow-[0_18px_48px_rgba(17,48,64,0.10)] sm:p-9">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-teal via-brand-aqua to-brand-orange" />
            <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand-aqua/20 blur-3xl" />
            <div aria-hidden className="pointer-events-none absolute -bottom-20 -left-10 h-52 w-52 rounded-full bg-brand-orange/10 blur-3xl" />
            <div className="relative">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-teal">Governance</p>
              <h2 className="mt-3 text-2xl font-bold text-brand-blue sm:text-3xl">Aligned execution at every step</h2>
              <p className="mt-4 text-base leading-8 text-brand-dark/75">
                Every project includes scope clarity, deliverables, owners, timelines, QA, launch checklist, and optimization plan.
                This keeps strategy, design, content, development, automation, and reporting aligned from the first conversation.
              </p>
            </div>
          </div>
        </div>
      </MotionSection>
      <CtaBand primary={{ label: "Start with a Free Digital Audit", href: "/free-digital-audit" }} secondary={{ label: "Book Consultation", href: "/book-consultation" }} />
    </>
  );
}

export function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "About" }]} />
      <Hero
        eyebrow="About Ezee Technologies"
        title="We are not just a digital agency. We are a digital growth and transformation lab."
        copy="Ezee Technologies Digital Labs was created to help businesses move beyond scattered digital efforts and build connected ecosystems."
        primary={{ label: "Let's build your next digital layer", href: "/book-consultation" }}
        secondary={{ label: "Explore Process", href: "/process" }}
        image="/images/brand-social-studio.png"
      />
      <MotionSection className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-teal">Story</p>
            <h2 className="mt-3 text-3xl font-bold text-brand-blue">Digital layers should not work in isolation.</h2>
            <p className="mt-5 text-base leading-8 text-brand-dark/75">
              Many companies work with different vendors for social media, websites, software, automation, dashboards, and
              consulting. This creates inconsistency and delays. Ezee Technologies Digital Labs brings these layers together under one
              business-first execution model.
            </p>
          </div>
          <div className="relative overflow-hidden rounded-2xl border border-brand-blue/10 bg-white p-7 shadow-[0_18px_48px_rgba(17,48,64,0.10)] sm:p-9">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-teal via-brand-aqua to-brand-orange" />
            <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand-aqua/20 blur-3xl" />
            <div aria-hidden className="pointer-events-none absolute -bottom-20 -left-10 h-52 w-52 rounded-full bg-brand-orange/10 blur-3xl" />
            <div className="relative">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-teal">Mission</p>
            <h2 className="mt-3 text-2xl font-bold text-brand-blue sm:text-3xl">Build connected digital growth.</h2>
            <p className="mt-5 text-base leading-8 text-brand-dark/75">
              To help businesses grow, automate, and transform through intelligent digital strategy, premium execution, and
              scalable technology.
            </p>
            <div className="mt-6 grid gap-3">
              {["Strategy before execution", "Clarity before development", "Premium design", "Measurable outcomes", "Business-first technology", "Long-term partnerships"].map((value) => (
                <ListPill key={value}>{value}</ListPill>
              ))}
            </div>
            </div>
          </div>
        </div>
      </MotionSection>
      <CtaBand />
    </>
  );
}

export function InsightsPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Ezee Technologies Digital Labs insights",
          itemListElement: blogs.map((blog, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: blog.title,
            url: `${site.url}${blogPath(blog.slug)}`
          }))
        }}
      />
      <Breadcrumbs items={[{ label: "Insights" }]} />
      <Hero
        eyebrow="Insights"
        title="Insights for brands that want to grow, automate, and transform."
        copy="Read practical guides on AI workflow automation, digital transformation, social media strategy, brand positioning, ERP, LMS, dashboards, and technology consultation."
        primary={{ label: "Book a Free Digital Audit", href: "/free-digital-audit" }}
        secondary={{ label: "Explore Services", href: "/services" }}
        image="/images/ai-workflow-automation.png"
      />
      <MotionSection className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <BlogFilterGrid items={blogs} />
        </div>
      </MotionSection>
      <CtaBand />
    </>
  );
}

export function BlogDetail({ blog }: { blog: Blog }) {
  const relatedService = services.find((item) => item.slug === blog.relatedService);
  const relatedServices = blog.relatedServices.map((slug) => services.find((item) => item.slug === slug)).filter(Boolean) as Service[];
  const relatedStudy = caseStudies.find((item) => item.slug === blog.relatedCaseStudy);
  const relatedBlogs = blogs.filter((item) => item.slug !== blog.slug && item.category === blog.category).slice(0, 2);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: blog.title,
          description: blog.metaDescription,
          datePublished: blog.date,
          author: { "@type": "Organization", name: site.name },
          publisher: { "@type": "Organization", name: site.name },
          mainEntityOfPage: `${site.url}${blogPath(blog.slug)}`
        }}
      />
      <JsonLd data={faqSchema(blog.faq)} />
      <Breadcrumbs items={[{ label: "Insights", href: "/insights" }, { label: blog.title }]} />
      <Hero
        eyebrow={blog.category}
        title={blog.title}
        copy={blog.excerpt}
        primary={{ label: "Book a Free Digital Audit", href: "/free-digital-audit" }}
        secondary={relatedService ? { label: `Explore ${relatedService.title}`, href: servicePath(relatedService.slug) } : { label: "Explore Services", href: "/services" }}
        image={visualForTheme(`${blog.category} ${blog.title}`)}
      />
      <MotionSection className="bg-white px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
          <article className="prose-labs max-w-none">
            {blog.body.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            ))}
            <div className="relative mt-12 overflow-hidden rounded-2xl border border-brand-blue/10 bg-white p-7 not-prose shadow-[0_18px_48px_rgba(17,48,64,0.10)] sm:p-9">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-teal via-brand-aqua to-brand-orange" />
              <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand-aqua/20 blur-3xl" />
              <div aria-hidden className="pointer-events-none absolute -bottom-20 -left-10 h-52 w-52 rounded-full bg-brand-orange/10 blur-3xl" />
              <div className="relative">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-teal">Next Step</p>
                <h2 className="mt-3 text-2xl font-bold text-brand-blue sm:text-3xl">Suggested Next Step</h2>
                <p className="mt-4 text-base leading-8 text-brand-dark/75">
                  Want to apply this to your business? Book a Free Digital Growth Audit with Ezee Digital Labs and
                  get a practical view of your brand, website, systems, automation gaps, and digital growth opportunities.
                </p>
                <div className="mt-6">
                  <ButtonLink href="/free-digital-audit">Book a Free Digital Audit</ButtonLink>
                </div>
              </div>
            </div>
            <div className="mt-12">
              <FAQAccordion faqs={blog.faq} />
            </div>
          </article>
          <aside className="space-y-5">
            {relatedService && (
              <div className="rounded-lg bg-brand-blue p-6 text-white">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-aqua">Primary Service</p>
                <h2 className="mt-3 text-2xl font-bold">{relatedService.title}</h2>
                <p className="mt-4 text-sm leading-7 text-white/70">{relatedService.summary}</p>
                <div className="mt-6">
                  <ButtonLink href={servicePath(relatedService.slug)}>Explore Service</ButtonLink>
                </div>
              </div>
            )}
            {relatedStudy && (
              <Link href={caseStudyPath(relatedStudy.slug)} className="block rounded-lg border border-brand-blue/10 p-6 shadow-sm transition hover:shadow-glow">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-teal">Related Case Study</p>
                <h2 className="mt-3 text-xl font-bold text-brand-blue">{relatedStudy.title}</h2>
                <p className="mt-4 text-sm leading-7 text-brand-dark/70">{relatedStudy.impact}</p>
              </Link>
            )}
            <LeadForm
              title="Apply This Insight"
              description="Share your current challenge and Ezee Technologies will suggest the right next step."
              endpoint="/api/contact"
              formType={`blog:${blog.slug}`}
              compact
              eyebrow="Insight Inquiry"
              submitLabel="Talk to Ezee Technologies"
            />
          </aside>
        </div>
      </MotionSection>
      {relatedBlogs.length > 0 && (
        <MotionSection className="bg-brand-light px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-7xl">
            <SectionHeader eyebrow="Related Reads" title="Continue the learning path" />
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {relatedBlogs.map((item) => (
                <Link key={item.slug} href={blogPath(item.slug)} className="rounded-lg bg-white p-6 shadow-sm transition hover:shadow-glow">
                  <h3 className="text-xl font-bold text-brand-blue">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-brand-dark/70">{item.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </MotionSection>
      )}
      <CtaBand />
    </>
  );
}

export function FreeAuditPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Free Digital Audit" }]} />
      <Hero
        eyebrow="Free Digital Growth Audit"
        title="Find out what is stopping your business from looking better, working faster, and converting more customers."
        copy="Our Digital Growth Audit reviews your brand presence, website, social media, automation opportunities, ERP gaps, customer journey, AI use cases, and digital growth potential."
        primary={{ label: "Request My Free Audit", href: "#audit-form" }}
        secondary={{ label: "See Proof", href: "/case-studies" }}
        image="/images/hero-strategy-studio.png"
      />
      <MotionSection className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6">
            <SectionHeader eyebrow="What We Review" title="The audit looks across the full digital growth journey." />
            <div className="mt-8 grid gap-3">
              {[
                "Website experience",
                "Brand positioning",
                "Social media presence",
                "Content quality",
                "Lead generation journey",
                "Automation opportunities",
                "ERP and system gaps",
                "Customer experience",
                "AI use cases",
                "Technology roadmap"
              ].map((item) => (
                <ListPill key={item}>{item}</ListPill>
              ))}
            </div>
            <FormSupportPanel
              image="/images/bi-executive-analytics-room.png"
              eyebrow="Free Growth Audit"
              title="Get a clear digital growth diagnosis."
              copy="We review the touchpoints that shape trust, leads, automation, and visibility, then suggest the first moves that matter."
              points={["Brand and website trust gaps", "Automation and AI opportunities", "Practical next-step priorities"]}
            />
          </div>
          <div id="audit-form">
            <LeadForm
              title="Request My Free Audit"
              description="Share your website, social link, current pain points, service interest, budget range, and timeline so Ezee Technologies can review the right growth layers."
              endpoint="/api/audit"
              formType="free-digital-audit"
              eyebrow="Free Digital Growth Audit"
              submitLabel="Request My Free Audit"
            />
          </div>
        </div>
      </MotionSection>
    </>
  );
}

export function ConsultationPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Book Consultation" }]} />
      <Hero
        eyebrow="Book Consultation"
        title="Let's discuss your next digital growth layer."
        copy="Book a consultation to discuss your brand, social media, automation, ERP, LMS, website, app, dashboard, or transformation requirement."
        primary={{ label: "Book My Consultation", href: "#consultation-form" }}
        secondary={{ label: "Explore Process", href: "/process" }}
        image="/images/digital-transformation-ecosystem.png"
      />
      <MotionSection className="bg-brand-light px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6">
            <InfoPanel
              eyebrow="Meeting Types"
              title="Choose the conversation you need"
              copy="Digital Growth Audit Call, AI Automation Discovery, ERP/LMS Scoping Call, Brand Positioning Session, or Technology Consultation."
            />
            <InfoPanel
              eyebrow="Prepare"
              title="Bring practical context"
              copy="Current website or social links, pain points, goals, existing systems, timelines, budget range, and key stakeholders."
            />
            <FormSupportPanel
              image="/images/service-systems-montage.png"
              eyebrow="Strategy Call"
              title="Leave with a sharper direction."
              copy="Use the call to pressure-test priorities, understand the best first build, and avoid spending on the wrong digital layer."
              points={["Scope and priority clarity", "Recommended service path", "Proposal-ready context"]}
            />
          </div>
          <div id="consultation-form">
            <LeadForm
              title="Book My Consultation"
              description="Share the decision you are trying to make, the current blocker, and the timeline. Ezee Technologies will review the context before responding."
              endpoint="/api/consultation"
              formType="book-consultation"
              eyebrow="Consultation Request"
              submitLabel="Book My Consultation"
            />
          </div>
        </div>
      </MotionSection>
    </>
  );
}

export function ContactPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Contact" }]} />
      <Hero
        eyebrow="Contact"
        title="Let's build your next digital growth layer."
        copy="Whether you need social media management, brand positioning, AI automation, ERP development, LMS development, digital transformation, or technology consultation, Ezee Technologies Digital Labs can help you move with clarity and speed."
        primary={{ label: "Send My Request", href: "#contact-form" }}
        secondary={{ label: "Book Free Audit", href: "/free-digital-audit" }}
        image="/images/brand-communication-studio.png"
      />
      <MotionSection className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-6">
            <SectionHeader eyebrow="Contact Routes" title="Route the request to the right conversation." />
            <div className="mt-8 grid gap-3">
              {["General inquiry", "Audit request", "Proposal request", "Partnership", "Support"].map((item) => (
                <ListPill key={item}>{item}</ListPill>
              ))}
            </div>
            <FormSupportPanel
              image="/images/web-app-interface-studio.png"
              eyebrow="Fast Routing"
              title="Reach the right team faster."
              copy="Send one clear request and we will route it to the right brand, automation, systems, analytics, or transformation conversation."
              points={["Correct service lane", "Timeline and budget context", "Relevant next step"]}
            />
          </div>
          <div id="contact-form">
            <LeadForm
              title="Send My Request"
              description="Use this form for general inquiries, audit requests, proposal requests, partnerships, and support routing."
              endpoint="/api/contact"
              formType="contact"
              eyebrow="Contact Request"
              submitLabel="Send My Request"
            />
          </div>
        </div>
      </MotionSection>
    </>
  );
}

export function ThankYouPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Thank You" }]} />
      <section className="bg-blue-radial px-4 py-24 text-white lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-aqua">Request Received</p>
          <h1 className="mt-4 text-balance text-4xl font-black md:text-6xl">Thank you. Your request has been received.</h1>
          <p className="mt-6 text-lg leading-9 text-white/75">
            Our Ezee Technologies team will review your brand, website, systems, workflows, or automation requirement and get back
            with a practical next step. While you wait, you can book a discovery slot or explore relevant case studies below.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/book-consultation">Book Discovery Slot</ButtonLink>
            <ButtonLink href="/case-studies" variant="light">
              Explore Case Studies
            </ButtonLink>
          </div>
        </div>
      </section>
      <ProofPreview />
    </>
  );
}

export function LegalPage({ type }: { type: "privacy" | "terms" }) {
  const isPrivacy = type === "privacy";
  return (
    <>
      <Breadcrumbs items={[{ label: isPrivacy ? "Privacy Policy" : "Terms" }]} />
      <section className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-teal">
            {isPrivacy ? "Privacy Policy" : "Terms and Disclaimer"}
          </p>
          <h1 className="mt-4 text-4xl font-black text-brand-blue md:text-6xl">
            {isPrivacy ? "How Ezee Technologies handles submitted information." : "Website terms, service scope, and publishing disclaimer."}
          </h1>
          <div className="prose-labs mt-10">
            {isPrivacy ? (
              <>
                <h2>Information We Collect</h2>
                <p>
                  Forms on this website may collect full name, company name, email, phone, website or social link, service
                  interest, budget range, timeline, message, source page, and form type. This information is used to respond
                  to requests, prepare consultations, route leads, and improve service relevance.
                </p>
                <h2>How Information Is Used</h2>
                <p>
                  Submitted information may be reviewed by the Ezee Technologies team and, when configured, sent to an internal
                  email, CRM, or secure integration URL through environment-based connections. The website does not require
                  payment details or sensitive credentials through public forms.
                </p>
                <h2>Data Handling</h2>
                <p>
                  Businesses should avoid sending confidential system credentials through public forms. Detailed access, NDA,
                  and implementation governance should be handled during formal engagement.
                </p>
              </>
            ) : (
              <>
                <h2>Website Content</h2>
                <p>
                  This website explains Digital Labs services, process, case study structures, and educational content. Service
                  descriptions are for information and consultation purposes. Final scope, timeline, pricing, deliverables, and
                  responsibilities are confirmed through a proposal or formal agreement.
                </p>
                <h2>Case Study Disclaimer</h2>
                <p>
                  Case studies use publish-safe qualitative impact wording. Where client identity or numerical outcomes are not
                  approved, anonymized industry-based wording is used. No unverified metrics should be published without internal
                  approval.
                </p>
                <h2>Consultation Scope</h2>
                <p>
                  A consultation or free audit is intended to identify practical next steps. It does not replace a full BRD,
                  technical architecture, legal advice, financial advice, or implementation agreement.
                </p>
              </>
            )}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
