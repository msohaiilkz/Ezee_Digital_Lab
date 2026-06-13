import Link from "next/link";

export default function NotFound() {
  return (
    <section className="bg-blue-radial px-4 py-24 text-white lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-aqua">404</p>
        <h1 className="mt-4 text-4xl font-black md:text-6xl">This page is not part of the Digital Labs journey.</h1>
        <p className="mt-6 text-lg leading-8 text-white/70">
          Explore the services, case studies, insights, or free audit page to continue.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/services" className="rounded-full bg-brand-orange px-6 py-3 text-sm font-bold text-white shadow-orange">
            Explore Services
          </Link>
          <Link href="/free-digital-audit" className="rounded-full border border-white/20 px-6 py-3 text-sm font-bold text-white">
            Book Free Audit
          </Link>
        </div>
      </div>
    </section>
  );
}
