"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Boxes,
  Cpu,
  Facebook,
  Linkedin,
  Mail,
  Megaphone,
  Menu,
  Sparkles,
  X
} from "lucide-react";
import {
  navigation,
  serviceGroups,
  servicePath,
  services,
  site
} from "@/content/site";
import { NewsletterForm } from "@/components/forms";
import { BackToTop, StickyMobileCta } from "@/components/interactive";
import { cn } from "@/lib/utils";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <div aria-hidden className="h-20 md:hidden" />
      <BackToTop />
      <StickyMobileCta />
    </>
  );
}

const serviceGroupIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "Growth & Brand": Megaphone,
  "AI & Automation": Cpu,
  "Custom Systems": Boxes,
  "Transformation & Visibility": BarChart3
};

function Header() {
  const [open, setOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  const openMega = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setMegaOpen(true);
  };

  const scheduleCloseMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMegaOpen(false), 180);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-brand-blue/10 bg-white/95 text-brand-blue shadow-[0_12px_38px_rgba(17,48,64,0.10)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:gap-5 lg:px-8">
        <Link href="/" className="group flex items-center gap-3" aria-label="Ezee Technologies Digital Labs home">
          <Image
            src="/images/ezee-technologies-logo.png"
            alt="Ezee Technologies Digital Labs"
            width={1203}
            height={575}
            priority
            sizes="(max-width: 640px) 180px, (max-width: 1024px) 200px, 220px"
            className="block h-auto w-[180px] flex-shrink-0 sm:w-[200px] lg:w-[220px]"
          />
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex xl:gap-1" aria-label="Main navigation">
          {navigation.map((item) => {
            if (item.label === "Services") {
              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={openMega}
                  onMouseLeave={scheduleCloseMega}
                >
                  <Link
                    href={item.href}
                    aria-haspopup="true"
                    aria-expanded={megaOpen}
                    className={cn(
                      "inline-flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-2 text-sm font-bold text-brand-blue transition hover:bg-brand-light hover:text-brand-teal xl:px-4",
                      (megaOpen || pathname.startsWith("/services")) && "bg-brand-light text-brand-teal"
                    )}
                  >
                    Services
                    <ArrowRight
                      className={cn(
                        "h-3.5 w-3.5 transition-transform duration-200",
                        megaOpen ? "rotate-90" : "rotate-90 opacity-60"
                      )}
                    />
                  </Link>
                  <div
                    className={cn(
                      "absolute left-1/2 top-full w-[min(960px,calc(100vw-2rem))] -translate-x-1/2 pt-3 transition-all duration-200",
                      megaOpen
                        ? "visible translate-y-0 opacity-100"
                        : "invisible -translate-y-1 opacity-0"
                    )}
                    onMouseEnter={openMega}
                    onMouseLeave={scheduleCloseMega}
                  >
                    <div className="overflow-hidden rounded-2xl border border-brand-blue/10 bg-white shadow-[0_24px_60px_rgba(17,48,64,0.18)] ring-1 ring-black/5">
                      <div className="bg-gradient-to-r from-brand-blue via-brand-blue to-brand-teal px-6 py-4 text-white">
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-aqua">
                              Explore
                            </p>
                            <p className="mt-0.5 text-sm font-semibold">
                              Digital, AI, Brand & Automation services
                            </p>
                          </div>
                          <Link
                            href="/services"
                            className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-white ring-1 ring-white/20 transition hover:bg-white hover:text-brand-blue"
                          >
                            View All
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </Link>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-3 p-5 sm:grid-cols-2 xl:grid-cols-4">
                        {serviceGroups.map((group) => {
                          const Icon = serviceGroupIcons[group.title] ?? Sparkles;
                          return (
                            <div
                              key={group.title}
                              className="group/card relative flex flex-col rounded-xl border border-brand-blue/10 bg-gradient-to-b from-brand-light/60 to-white p-4 transition hover:border-brand-teal/30 hover:shadow-md"
                            >
                              <div className="flex items-center gap-2.5">
                                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-blue text-brand-aqua shadow-glow transition group-hover/card:bg-brand-teal group-hover/card:text-white">
                                  <Icon className="h-4 w-4" />
                                </span>
                                <h3 className="text-sm font-bold text-brand-blue">{group.title}</h3>
                              </div>
                              <p className="mt-3 text-[11px] leading-5 text-brand-dark/65">
                                {group.description}
                              </p>
                              <div className="mt-3 flex flex-col gap-1 border-t border-brand-blue/10 pt-3">
                                {group.services.map((slug) => {
                                  const service = services.find((entry) => entry.slug === slug);
                                  if (!service) return null;
                                  return (
                                    <Link
                                      key={slug}
                                      href={servicePath(slug)}
                                      onClick={() => setMegaOpen(false)}
                                      className="group/link flex items-center justify-between gap-2 rounded-md px-2 py-1.5 text-xs font-semibold text-brand-blue/85 transition hover:bg-brand-light hover:text-brand-teal"
                                    >
                                      <span className="leading-snug">{service.title}</span>
                                      <ArrowRight className="h-3 w-3 flex-shrink-0 -translate-x-1 opacity-0 transition-all group-hover/link:translate-x-0 group-hover/link:opacity-100" />
                                    </Link>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div className="flex flex-col gap-2 border-t border-brand-blue/10 bg-brand-light/40 px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-xs text-brand-dark/70">
                          Not sure where to start? Let us map the right service path.
                        </p>
                        <Link
                          href="/free-digital-audit"
                          onClick={() => setMegaOpen(false)}
                          className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-brand-orange px-4 py-2 text-xs font-bold text-white shadow-orange transition hover:-translate-y-0.5"
                        >
                          Book Free Digital Audit
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "whitespace-nowrap rounded-full px-3 py-2 text-sm font-bold text-brand-blue transition hover:bg-brand-light hover:text-brand-teal xl:px-4",
                  pathname === item.href && "bg-brand-light text-brand-teal"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex xl:gap-3">
          <Link
            href="/book-consultation"
            className="whitespace-nowrap rounded-full border border-brand-blue/15 px-3 py-2 text-sm font-bold text-brand-blue transition hover:border-brand-teal hover:text-brand-teal xl:px-4"
          >
            Book Consultation
          </Link>
          <Link
            href="/free-digital-audit"
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-brand-orange px-4 py-2.5 text-sm font-bold text-white shadow-orange transition hover:-translate-y-0.5 xl:px-5"
          >
            Book Free Digital Audit
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex h-11 w-11 items-center justify-center rounded-lg border border-brand-blue/15 text-brand-blue lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div className={cn("max-h-[calc(100vh-72px)] overflow-y-auto border-t border-brand-blue/10 bg-white px-4 transition sm:px-6 lg:hidden", open ? "block" : "hidden")}>
        <nav className="mx-auto grid max-w-7xl gap-2 py-4" aria-label="Mobile navigation">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 text-sm font-bold text-brand-blue transition hover:bg-brand-light"
            >
              {item.label}
            </Link>
          ))}
          <details className="rounded-lg bg-brand-light px-3 py-3 text-brand-blue">
            <summary className="cursor-pointer text-sm font-bold">Service menu</summary>
            <div className="mt-3 grid gap-2">
              {services.map((service) => (
                <Link
                  key={service.slug}
                  href={servicePath(service.slug)}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2 text-sm font-semibold text-brand-blue/100 hover:bg-white"
                >
                  {service.title}
                </Link>
              ))}
            </div>
          </details>
          <Link
            href="/free-digital-audit"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-brand-orange px-5 py-3 text-center text-sm font-bold text-white"
          >
            Book Free Digital Audit
          </Link>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  const socialLinks = [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/ezeetechnologies", Icon: Linkedin },
    { label: "Facebook", href: "https://www.facebook.com/ezee.technologies", Icon: Facebook },
    { label: "Email", href: `mailto:${site.email}`, Icon: Mail }
  ];

  return (
    <footer className="bg-brand-blue text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <Link href="/" className="inline-flex rounded-lg bg-white p-2 shadow-glow">
              <Image
                src="/images/ezee-technologies-logo.png"
                alt="Ezee Technologies Digital Labs"
                width={1203}
                height={575}
                className="h-auto w-[240px] max-w-full"
              />
            </Link>
            <p className="mt-6 max-w-xl text-sm leading-7 text-white/70">{site.promise}</p>
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:-translate-y-0.5 hover:border-brand-aqua hover:text-brand-aqua"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
            <NewsletterForm />
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            <FooterColumn
              title="Services"
              links={services.map((service) => ({
                label: service.title,
                href: servicePath(service.slug)
              }))}
            />
            <FooterColumn
              title="Company"
              links={[
                { label: "Industries", href: "/industries" },
                { label: "Portfolio", href: "/portfolio" },
                { label: "Case Studies", href: "/case-studies" },
                { label: "Insights", href: "/insights" },
                { label: "About", href: "/about" },
                { label: "Process", href: "/process" }
              ]}
            />
            <FooterColumn
              title="Convert"
              links={[
                { label: "Free Digital Audit", href: "/free-digital-audit" },
                { label: "Book Consultation", href: "/book-consultation" },
                { label: "Contact", href: "/contact" },
                { label: "Privacy Policy", href: "/privacy-policy" },
                { label: "Terms", href: "/terms" }
              ]}
            />
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-8 text-sm text-white/55 md:flex-row md:items-center md:justify-between">
          <p>
            © 2026{" "}
            <a
              href="https://www.ezeetechnologies.com"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-white transition hover:text-brand-aqua"
            >
              Ezee Technologies
            </a>
            . All rights reserved.
          </p>
          <a href={`mailto:${site.email}`} className="font-semibold text-white/70 transition hover:text-brand-aqua">
            {site.email}
          </a>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links
}: {
  title: string;
  links: Array<{ label: string; href: string }>;
}) {
  return (
    <div>
      <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-brand-aqua">{title}</h3>
      <div className="mt-5 grid gap-3">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="text-sm text-white/70 transition hover:text-white">
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
