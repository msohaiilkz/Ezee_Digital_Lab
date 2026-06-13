import type { Metadata } from "next";
import "./globals.css";
import { SiteShell } from "@/components/layout";
import { site } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Ezee Technologies Digital Labs | Digital, AI, Brand & Automation Company",
    template: "%s | Ezee Technologies Digital Labs"
  },
  description: site.description,
  keywords: [
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
  ],
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    images: [
      {
        url: "/images/hero-strategy-studio.png",
        width: 1792,
        height: 1024,
        alt: "Ezee Technologies Digital Labs strategy studio"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Ezee Technologies Digital Labs",
    description: site.description,
    images: ["/images/hero-strategy-studio.png"]
  },
  alternates: {
    canonical: site.url
  }
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  name: site.name,
  url: site.url,
  email: site.email,
  areaServed: "Global",
  description: site.description,
  brand: {
    "@type": "Brand",
    name: "Ezee Technologies Digital Labs"
  },
  sameAs: []
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  url: site.url,
  publisher: {
    "@type": "Organization",
    name: site.name
  },
  inLanguage: "en"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema)
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema)
          }}
        />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
