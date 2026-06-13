import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  AboutPage,
  BlogDetail,
  CaseStudiesPage,
  CaseStudyDetail,
  ContactPage,
  FreeAuditPage,
  HomePage,
  IndustriesPage,
  InsightsPage,
  JsonLd,
  LegalPage,
  PortfolioPage,
  ProcessPage,
  ServiceDetail,
  ServicesHub,
  ConsultationPage,
  ThankYouPage
} from "@/components/sections";
import {
  allSitePaths,
  getBlog,
  getCaseStudy,
  getService,
  site,
  staticPages
} from "@/content/site";

type PageProps = {
  params: { slug?: string[] };
};

function pathFromParams(params: PageProps["params"]) {
  return params.slug?.join("/") || "";
}

function pageMeta(path: string) {
  if (path === "") return staticPages.home;
  if (path === "services") return staticPages.services;
  if (path === "industries") return staticPages.industries;
  if (path === "portfolio") return staticPages.portfolio;
  if (path === "case-studies") return staticPages.caseStudies;
  if (path === "process") return staticPages.process;
  if (path === "about") return staticPages.about;
  if (path === "insights") return staticPages.insights;
  if (path === "free-digital-audit") return staticPages.freeAudit;
  if (path === "book-consultation") return staticPages.consultation;
  if (path === "contact") return staticPages.contact;
  if (path === "privacy-policy") return staticPages.privacy;
  if (path === "terms") return staticPages.terms;
  if (path === "thank-you") return staticPages.thankYou;

  const [prefix, slug] = path.split("/");
  if (prefix === "services" && slug) {
    const service = getService(slug);
    if (service) {
      return {
        path: `/services/${service.slug}`,
        title: service.metaTitle,
        description: service.metaDescription
      };
    }
  }

  if (prefix === "insights" && slug) {
    const blog = getBlog(slug);
    if (blog) {
      return {
        path: `/insights/${blog.slug}`,
        title: blog.metaTitle,
        description: blog.metaDescription
      };
    }
  }

  if (prefix === "case-studies" && slug) {
    const study = getCaseStudy(slug);
    if (study) {
      return {
        path: `/case-studies/${study.slug}`,
        title: study.title,
        description: study.challenge
      };
    }
  }

  return null;
}

const coreKeywords = [
  "Ezee Technologies",
  "Ezee Technologies Digital Labs",
  "digital transformation company",
  "AI workflow automation",
  "custom ERP development",
  "LMS development",
  "social media management",
  "brand positioning",
  "SEO AEO services",
  "business intelligence dashboards",
  "web app development"
];

function metaImageForPath(path: string) {
  if (path === "") return "/images/hero-strategy-studio.png";
  if (path === "services") return "/images/digital-transformation-ecosystem.png";
  if (path === "industries") return "/images/service-systems-montage.png";
  if (path === "portfolio") return "/images/brand-communication-studio.png";
  if (path === "case-studies") return "/images/bi-executive-analytics-room.png";
  if (path === "process") return "/images/digital-command-center.png";
  if (path === "about") return "/images/brand-social-studio.png";
  if (path === "insights") return "/images/seo-aeo-search-intelligence.png";
  if (path === "free-digital-audit") return "/images/hero-strategy-studio.png";
  if (path === "book-consultation") return "/images/digital-transformation-ecosystem.png";
  if (path === "contact") return "/images/brand-communication-studio.png";

  const [prefix, slug] = path.split("/");
  if (prefix === "services") {
    if (slug?.includes("seo") || slug?.includes("aeo")) return "/images/seo-aeo-search-intelligence.png";
    if (slug?.includes("ai")) return "/images/ai-automation-workflow-desk.png";
    if (slug?.includes("crm")) return "/images/ai-workflow-automation.png";
    if (slug?.includes("erp")) return "/images/erp-operations-floor.png";
    if (slug?.includes("lms")) return "/images/lms-learning-lounge.png";
    if (slug?.includes("brand-management")) return "/images/brand-communication-studio.png";
    if (slug?.includes("brand") || slug?.includes("social")) return "/images/brand-social-studio.png";
    if (slug?.includes("web") || slug?.includes("app")) return "/images/web-app-interface-studio.png";
    if (slug?.includes("analytics") || slug?.includes("intelligence")) return "/images/bi-executive-analytics-room.png";
    if (slug?.includes("transformation")) return "/images/digital-transformation-ecosystem.png";
  }

  if (prefix === "case-studies") return "/images/bi-executive-analytics-room.png";
  if (prefix === "insights") return "/images/seo-aeo-search-intelligence.png";
  return "/images/hero-strategy-studio.png";
}

export function generateStaticParams() {
  return allSitePaths().map((path) => ({
    slug: path === "/" ? [] : path.replace(/^\//, "").split("/")
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const path = pathFromParams(params);
  const meta = pageMeta(path);

  if (!meta) {
    return {
      title: "Page Not Found",
      robots: { index: false, follow: false }
    };
  }

  const canonical = `${site.url}${meta.path === "/" ? "" : meta.path}`;
  const metaImage = metaImageForPath(path);

  return {
    title: meta.title,
    description: meta.description,
    keywords: [...coreKeywords, meta.title],
    applicationName: site.name,
    authors: [{ name: site.name, url: site.url }],
    creator: site.name,
    publisher: site.name,
    category: "Digital transformation, AI automation, branding, ERP, LMS, SEO and analytics",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1
      }
    },
    alternates: {
      canonical
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: canonical,
      siteName: site.name,
      images: [
        {
          url: metaImage,
          width: 1792,
          height: 1024,
          alt: `${site.name} - ${meta.title}`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [metaImage]
    }
  };
}

export default function Page({ params }: PageProps) {
  const path = pathFromParams(params);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: site.url
      },
      ...path.split("/").filter(Boolean).map((segment, index, segments) => ({
        "@type": "ListItem",
        position: index + 2,
        name: segment
          .split("-")
          .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
          .join(" "),
        item: `${site.url}/${segments.slice(0, index + 1).join("/")}`
      }))
    ]
  };

  let content: React.ReactNode;

  if (path === "") content = <HomePage />;
  else if (path === "services") content = <ServicesHub />;
  else if (path === "industries") content = <IndustriesPage />;
  else if (path === "portfolio") content = <PortfolioPage />;
  else if (path === "case-studies") content = <CaseStudiesPage />;
  else if (path === "process") content = <ProcessPage />;
  else if (path === "about") content = <AboutPage />;
  else if (path === "insights") content = <InsightsPage />;
  else if (path === "free-digital-audit") content = <FreeAuditPage />;
  else if (path === "book-consultation") content = <ConsultationPage />;
  else if (path === "contact") content = <ContactPage />;
  else if (path === "privacy-policy") content = <LegalPage type="privacy" />;
  else if (path === "terms") content = <LegalPage type="terms" />;
  else if (path === "thank-you") content = <ThankYouPage />;
  else {
    const [prefix, slug] = path.split("/");
    if (prefix === "services" && slug) {
      const service = getService(slug);
      if (service) content = <ServiceDetail service={service} />;
    }
    if (prefix === "insights" && slug) {
      const blog = getBlog(slug);
      if (blog) content = <BlogDetail blog={blog} />;
    }
    if (prefix === "case-studies" && slug) {
      const study = getCaseStudy(slug);
      if (study) content = <CaseStudyDetail study={study} />;
    }
  }

  if (!content) notFound();

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      {content}
    </>
  );
}
