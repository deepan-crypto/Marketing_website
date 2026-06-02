"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Factory,
  Instagram,
  Leaf,
  Mail,
  MapPin,
  Menu,
  PackageCheck,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  Store,
  Truck,
  Wheat,
  X,
} from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const navItems = ["About", "Products", "Distribution", "Gallery", "Contact"];

const chips = Array.from({ length: 22 }, (_, index) => ({
  id: index,
  left: 2 + ((index * 17) % 94),
  top: 4 + ((index * 23) % 78),
  size: 30 + (index % 5) * 11,
  drift: index % 2 ? -18 : 18,
  delay: (index % 8) * 0.22,
}));

const waterfallChips = Array.from({ length: 34 }, (_, index) => ({
  id: index,
  left: 36 + ((index * 11) % 57),
  size: 24 + (index % 6) * 9,
  delay: (index % 12) * 0.22,
  duration: 4.4 + (index % 5) * 0.45,
  opacity: 0.42 + (index % 4) * 0.12,
}));

const products = [
  {
    size: "100gm Pack",
    price: "50",
    note: "Fast-moving single-serve pack for tea shops, kiosks, counters, and quick trial purchases.",
    chipImage: "/images/aruvi-chips-smoky.png",
    pitch: "Impulse-ready crunch",
    specs: ["Product: Banana Chips", "Scope: All over Tamil Nadu", "Packing: 100gm", "MRP: Rs 50"],
  },
  {
    size: "200gm Pack",
    price: "80",
    note: "Family-size value pack for supermarkets, provision stores, bakeries, and repeat snackers.",
    chipImage: "/images/aruvi-chips-splash.png",
    pitch: "Family-value bestseller",
    specs: ["Product: Banana Chips", "Scope: All over Tamil Nadu", "Packing: 200gm", "MRP: Rs 80"],
  },
];

const supplyDetails = [
  ["Product", "Banana Chips"],
  ["Scope of Supply", "All over Tamil Nadu"],
  ["Packing Size", "200gm, 100gm"],
  ["MRP", "Rs 80 for 200gm / Rs 50 for 100gm"],
  ["Distributor Margin", "20% from MRP"],
];

const whyCards = [
  ["Premium Quality", "Crisp chips with balanced seasoning and a satisfying golden crunch.", ShieldCheck],
  ["Fresh Oil", "Fried in fresh oil for a cleaner taste and reliable crunch.", PackageCheck],
  ["Traditional Taste", "Inspired by Tamil Nadu snack counters and family favourites.", Wheat],
  ["Clean Label", "No added colour and no added sugar, based on the product overview.", Factory],
  ["Available Across Tamil Nadu", "Built for retail partners, distributors, and fast-moving shelves.", Store],
] as const;

const gallery = [
  ["Blue Pack", "/images/aruvi-pack-blue.svg"],
  ["Green Pack", "/images/aruvi-pack.svg"],
  ["Red Pack", "/images/aruvi-pack-red.svg"],
] as const;

const testimonials = [
  ["ARUVI packs look premium on shelf, and the product moves quickly because the crunch is consistent.", "S. Prakash", "Distributor, Coimbatore"],
  ["Our customers ask for the ARUVI pack by name. Fresh stock and clear margins make it easy to sell.", "M. Revathi", "Retail Partner, Madurai"],
  ["The taste feels traditional, but the packaging has a modern finish. That combination works.", "A. Natarajan", "Supermarket Buyer, Trichy"],
] as const;

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function LoadingScreen() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 1200);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {!ready && (
        <motion.div className="fixed inset-0 z-[100] grid place-items-center bg-[#fff3b8]" exit={{ opacity: 0 }} transition={{ duration: 0.45 }}>
          <div className="relative grid place-items-center">
            <motion.div className="absolute h-44 w-44 rounded-full border border-leaf/20" animate={{ rotate: 360 }} transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }} />
            <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 1.2, repeat: Infinity }}>
              <Image src="/images/banana-chip.svg" alt="" width={96} height={70} priority />
            </motion.div>
            <p className="mt-36 text-sm font-black uppercase tracking-[0.32em] text-leaf">ARUVI</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-4 py-4">
      <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-white/60 bg-white/72 px-4 py-3 shadow-[0_18px_60px_rgba(46,139,87,0.12)] backdrop-blur-2xl">
        <a href="#hero" className="focus-ring flex items-center gap-3 rounded-full" aria-label="ARUVI home">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-leaf text-sm font-black text-white shadow-pack">A</span>
          <span className="font-black tracking-tight text-ink">ARUVI</span>
        </a>
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="focus-ring rounded-full px-4 py-2 text-sm font-bold text-ink/70 transition hover:bg-banana/25 hover:text-ink">
              {item}
            </a>
          ))}
        </div>
        <a href="#contact" className="focus-ring hidden rounded-full bg-ink px-5 py-2.5 text-sm font-black text-white shadow-lg shadow-ink/20 transition hover:-translate-y-0.5 hover:bg-leaf md:inline-flex">
          Enquire
        </a>
        <button type="button" aria-label="Open menu" onClick={() => setOpen(true)} className="focus-ring grid h-10 w-10 place-items-center rounded-full bg-ink text-white md:hidden">
          <Menu size={19} />
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[60] bg-ink/50 p-4 backdrop-blur-sm md:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="ml-auto w-full max-w-sm rounded-[28px] bg-cream p-5 shadow-2xl" initial={{ x: 80 }} animate={{ x: 0 }} exit={{ x: 80 }}>
              <div className="flex items-center justify-between">
                <span className="font-black">ARUVI</span>
                <button type="button" aria-label="Close menu" onClick={() => setOpen(false)} className="grid h-10 w-10 place-items-center rounded-full bg-white">
                  <X size={18} />
                </button>
              </div>
              <div className="mt-8 grid gap-3">
                {navItems.map((item) => (
                  <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setOpen(false)} className="rounded-2xl bg-white px-4 py-4 text-lg font-black">
                    {item}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function FloatingChips() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {chips.map((chip) => (
        <motion.div
          key={chip.id}
          className="chip-shadow absolute"
          style={{ left: `${chip.left}%`, top: `${chip.top}%` }}
          animate={{ y: [0, chip.drift, 0], x: [0, chip.drift * 0.35, 0], rotate: [0, chip.drift, 0] }}
          transition={{ duration: 4.8 + (chip.id % 4), delay: chip.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image src="/images/banana-chip.svg" alt="" width={chip.size} height={chip.size} />
        </motion.div>
      ))}
    </div>
  );
}

function ChipWaterfall() {
  return (
    <div className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-full overflow-hidden md:w-[68%]" aria-hidden="true">
      <div className="absolute right-[10%] top-20 h-[78%] w-[44%] rounded-full bg-gradient-to-b from-banana/25 via-white/20 to-leaf/20 blur-3xl" />
      <div className="absolute right-[12%] top-10 h-[86%] w-[34%] rotate-6 bg-gradient-to-b from-transparent via-banana/20 to-transparent blur-2xl" />
      {waterfallChips.map((chip) => (
        <motion.div
          key={chip.id}
          className="absolute -top-24 chip-shadow"
          style={{ left: `${chip.left}%`, opacity: chip.opacity }}
          animate={{
            y: ["-15vh", "112vh"],
            x: [0, chip.id % 2 ? -38 : 38, 0],
            rotate: [0, chip.id % 2 ? 160 : -160, 320],
          }}
          transition={{
            duration: chip.duration,
            delay: chip.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Image src="/images/banana-chip.svg" alt="" width={chip.size} height={chip.size} />
        </motion.div>
      ))}
      <motion.div
        className="absolute bottom-[11%] right-[18%] h-24 w-[46%] rounded-full border border-banana/40 bg-banana/10 blur-sm"
        animate={{ scale: [0.86, 1.12, 0.86], opacity: [0.35, 0.7, 0.35] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function HeroPhotoLayer() {
  return (
    <motion.div
      className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-full overflow-hidden opacity-65 md:w-[62%] md:opacity-80"
      initial={{ opacity: 0, scale: 1.04 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, delay: 0.35 }}
      aria-hidden="true"
    >
      <Image
        src="/images/aruvi-waterfall-chips.png"
        alt=""
        fill
        priority
        sizes="(max-width: 768px) 100vw, 62vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#fff8cf] via-[#fff8cf]/55 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#ecffe5]/80 via-transparent to-[#fff8cf]/45" />
      <motion.div
        className="absolute bottom-[12%] left-[18%] h-28 w-[58%] rounded-full border border-banana/40 bg-banana/15 blur-sm"
        animate={{ scale: [0.9, 1.12, 0.9], opacity: [0.32, 0.62, 0.32] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}

function Hero() {
  return (
    <section id="hero" className="hero-aura relative flex min-h-screen items-center overflow-hidden pt-24">
      <HeroPhotoLayer />
      <div className="section-shell relative z-10 grid items-center gap-8 pb-14 lg:grid-cols-[1fr_1.05fr] lg:pb-0">
        <motion.div className="max-w-2xl text-center lg:text-left" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.95 }}>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-leaf/15 bg-white/70 px-4 py-2 text-sm font-black text-leaf shadow-sm backdrop-blur">
            <Sparkles size={16} />
            Hot & Fresh Tamil Nadu Crunch
          </div>
          <h1 className="font-display text-[clamp(2.8rem,6.6vw,6.65rem)] font-black leading-[0.92] tracking-normal text-ink">
            Tamil Nadu&apos;s Favourite Crispy Banana Chips
          </h1>
          <p className="mt-6 text-xl font-black text-leaf sm:text-2xl">Fresh. Crunchy. Irresistible.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <a href="#contact" className="focus-ring group inline-flex items-center justify-center gap-3 rounded-full bg-ink px-7 py-4 font-black text-white shadow-xl shadow-ink/20 transition hover:-translate-y-1 hover:bg-leaf">
              Become a Distributor
              <ArrowRight className="transition group-hover:translate-x-1" size={19} />
            </a>
            <a href="#products" className="focus-ring inline-flex items-center justify-center rounded-full border border-leaf/20 bg-white/78 px-7 py-4 font-black text-ink shadow-lg shadow-leaf/10 backdrop-blur transition hover:-translate-y-1 hover:border-banana hover:bg-banana/25">
              View Products
            </a>
          </div>
        </motion.div>
        <div className="hidden lg:block" aria-hidden="true" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#fffdf6] to-transparent" />
    </section>
  );
}

function SectionHeading({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-sm font-black uppercase tracking-[0.28em] text-leaf">{eyebrow}</p>
      <h2 className="mt-3 font-display text-[clamp(2.25rem,4.6vw,4.6rem)] font-black leading-[0.98] tracking-normal text-ink">{title}</h2>
      <p className="mt-5 text-base leading-8 text-ink/68 sm:text-lg">{copy}</p>
    </div>
  );
}

function Marquee() {
  const items = useMemo(() => ["Premium Quality", "Freshly Packed", "Tamil Nadu Supply", "20% Distributor Margin", "Hot & Fresh"], []);
  return (
    <div className="overflow-hidden border-y border-leaf/10 bg-white/70 py-4">
      <div className="marquee-track flex w-max gap-4">
        {[...items, ...items, ...items].map((item, index) => (
          <span key={`${item}-${index}`} className="inline-flex items-center gap-3 rounded-full bg-banana/22 px-5 py-2 text-sm font-black uppercase tracking-[0.16em] text-ink">
            <Sparkles size={15} className="text-leaf" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="section-panel py-24 sm:py-32">
      <div className="section-shell">
        <SectionHeading eyebrow="Our Story" title="Traditional taste in a shelf-ready premium pack." copy="ARUVI Banana Chips brings the familiar comfort of Tamil Nadu snack culture into a modern FMCG format, made with premium bananas, fresh oil, no added colour, and no added sugar." />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {["Fresh ingredients", "Traditional taste", "Modern packaging"].map((title) => (
            <motion.article key={title} className="reveal-card rounded-[24px] border border-leaf/12 bg-white/78 p-7 shadow-[0_24px_70px_rgba(46,139,87,0.10)] backdrop-blur transition hover:-translate-y-2 hover:border-banana" whileHover={{ scale: 1.02 }}>
              <Leaf className="text-leaf" />
              <h3 className="mt-7 text-2xl font-black text-ink">{title}</h3>
              <p className="mt-4 leading-7 text-ink/64">Premium bananas, fresh oil, clean-label ingredients, and a bold ARUVI pack built for Tamil Nadu retail shelves.</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyChooseUs() {
  return (
    <section className="section-panel overflow-hidden bg-[#f4fff1] py-24 sm:py-32">
      <div className="section-shell">
        <SectionHeading eyebrow="Why Choose Us" title="Built for repeat cravings and fast retail movement." copy="Every detail is tuned for distributors and customers: premium presentation, reliable packing, and a familiar traditional taste." />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {whyCards.map(([title, copy, Icon]) => (
            <motion.article key={title} className="reveal-card min-h-[250px] rounded-[24px] border border-white/80 bg-white p-5 shadow-[0_20px_60px_rgba(46,139,87,0.11)] transition hover:-translate-y-2 hover:shadow-glow" whileHover={{ scale: 1.03 }}>
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-ink text-banana">
                <Icon size={22} />
              </div>
              <h3 className="mt-7 text-xl font-black text-ink">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-ink/62">{copy}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Products() {
  return (
    <section id="products" className="section-panel relative overflow-hidden py-24 sm:py-32">
      <div className="section-shell">
        <SectionHeading eyebrow="Products" title="Two shelf-ready packs. One unmistakable crunch." copy="Fresh-looking chips, bold packs, attractive pricing, and a clear distributor margin designed to make customers ask for ARUVI at first sight." />
        <div className="mt-14 grid items-end gap-6 lg:grid-cols-2">
          {products.map((product) => (
            <motion.article key={product.size} className="reveal-card group relative overflow-hidden rounded-[30px] border border-leaf/12 bg-white p-4 shadow-[0_30px_90px_rgba(46,139,87,0.12)] transition hover:-translate-y-2 sm:p-5" whileHover={{ scale: 1.015 }}>
              <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-banana/35 blur-2xl" />
              <div className="grid items-stretch gap-6 lg:grid-cols-[0.92fr_1fr]">
                <div className="relative min-h-[360px] overflow-hidden rounded-[26px] bg-ink shadow-[inset_0_0_0_1px_rgba(255,255,255,0.22)]">
                  <Image
                    src={product.chipImage}
                    alt={`Fresh golden banana chips for ${product.size}`}
                    fill
                    sizes="(max-width: 1024px) 90vw, 460px"
                    className="object-cover transition duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-banana/20 via-transparent to-leaf/20 mix-blend-soft-light" />
                  <div className="absolute left-4 top-4 rounded-full bg-white/90 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-leaf shadow-lg">
                    {product.pitch}
                  </div>
                  <div className="absolute bottom-4 left-4 max-w-[58%]">
                    <p className="font-display text-3xl font-black leading-none text-white">Crispy golden banana chips</p>
                    <p className="mt-2 text-sm font-bold text-white/78">Fresh oil. No added colour. No added sugar.</p>
                  </div>
                </div>
                <div className="p-2 sm:p-5">
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-leaf">ARUVI Banana Chips</p>
                  <h3 className="mt-3 text-4xl font-black text-ink">{product.size}</h3>
                  <p className="mt-4 text-6xl font-black text-flame"><span className="text-3xl align-top">Rs</span>{product.price}</p>
                  <p className="mt-4 leading-7 text-ink/64">{product.note}</p>
                  <dl className="mt-5 grid gap-2">
                    {product.specs.map((spec) => {
                      const [label, value] = spec.split(": ");
                      return (
                        <div key={spec} className="flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-cream/75 px-4 py-2 text-sm">
                          <dt className="font-black text-leaf">{label}</dt>
                          <dd className="font-bold text-ink/72">{value}</dd>
                        </div>
                      );
                    })}
                  </dl>
                  <a href="#contact" className="focus-ring mt-7 inline-flex items-center gap-2 rounded-full bg-leaf px-5 py-3 font-black text-white shadow-lg shadow-leaf/20 transition hover:-translate-y-1 hover:bg-ink">
                    Place Distributor Enquiry <ArrowRight size={18} />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
        <div className="reveal-card mt-8 grid gap-3 rounded-[28px] border border-leaf/12 bg-white/82 p-5 shadow-[0_22px_70px_rgba(46,139,87,0.10)] backdrop-blur sm:grid-cols-2 lg:grid-cols-5">
          {supplyDetails.map(([label, value]) => (
            <div key={label} className="rounded-2xl bg-[#f6fff4] p-4">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-leaf">{label}</p>
              <p className="mt-2 text-base font-black text-ink">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Distribution() {
  return (
    <section id="distribution" className="section-panel overflow-hidden bg-ink py-24 text-white sm:py-32">
      <div className="section-shell grid items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.28em] text-banana">Distribution</p>
          <h2 className="mt-3 font-display text-[clamp(2.25rem,4.8vw,4.8rem)] font-black leading-[0.98]">Supply strength for ambitious Tamil Nadu distributors.</h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72">ARUVI is designed as a high-velocity snack line with attractive margins, reliable fulfilment, and pack recognition that helps stores sell faster.</p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {["Supply Across Tamil Nadu", "Distributor Margin: 20% from MRP", "Reliable Supply Chain", "Fast Delivery Support"].map((text) => (
              <div key={text} className="reveal-card rounded-[22px] border border-white/10 bg-white/8 p-5 backdrop-blur transition hover:-translate-y-1">
                <Truck className="text-banana" />
                <p className="mt-4 font-black">{text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative mx-auto aspect-[3/4] w-full max-w-md">
          <div className="absolute inset-8 rounded-[45%_55%_52%_48%] bg-gradient-to-br from-leaf via-banana to-flame shadow-glow" />
          {["Chennai", "Coimbatore", "Madurai", "Trichy", "Salem"].map((city, index) => (
            <span key={city} className="tn-marker absolute" style={{ left: `${30 + (index * 13) % 45}%`, top: `${16 + index * 15}%` }} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Statistics() {
  return (
    <section className="section-panel bg-[#fff8db] py-20">
      <div className="section-shell grid gap-4 md:grid-cols-4">
        {["38 districts", "1,200+ partners", "50,000+ deliveries", "98% satisfaction"].map((stat) => (
          <div key={stat} className="reveal-card rounded-[24px] border border-leaf/10 bg-white/80 p-6 text-center shadow-[0_20px_60px_rgba(255,140,0,0.09)]">
            <p className="text-4xl font-black text-leaf sm:text-5xl">{stat}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setActive((current) => (current + 1) % testimonials.length), 4800);
    return () => window.clearInterval(timer);
  }, []);

  const testimonial = testimonials[active];

  return (
    <section className="section-panel py-24 sm:py-32">
      <div className="section-shell">
        <SectionHeading eyebrow="Testimonials" title="Retail partners remember the crunch." copy="A premium snack brand grows when distributors and retailers can trust the product, pack, and supply rhythm." />
        <div className="mx-auto mt-14 max-w-4xl rounded-[32px] border border-leaf/12 bg-white p-7 shadow-[0_28px_90px_rgba(46,139,87,0.12)] sm:p-10">
          <div className="flex gap-1 text-banana">{Array.from({ length: 5 }).map((_, index) => <Star key={index} fill="currentColor" size={20} />)}</div>
          <p className="mt-8 font-display text-3xl font-black leading-tight text-ink sm:text-5xl">&quot;{testimonial[0]}&quot;</p>
          <p className="mt-8 font-black text-ink">{testimonial[1]}</p>
          <p className="text-sm text-ink/58">{testimonial[2]}</p>
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const [active, setActive] = useState<(typeof gallery)[number] | null>(null);

  return (
    <section id="gallery" className="section-panel bg-[#f6fff4] py-24 sm:py-32">
      <div className="section-shell">
        <SectionHeading eyebrow="Gallery" title="A visual identity made for snack aisles." copy="Three bold colour packs give ARUVI a premium but instantly appetising shelf presence." />
        <div className="mt-14 grid gap-5 sm:grid-cols-3">
          {gallery.map((item) => (
            <button key={item[0]} type="button" onClick={() => setActive(item)} className="reveal-card focus-ring group overflow-hidden rounded-[26px] border border-leaf/12 bg-white p-4 text-left shadow-[0_20px_70px_rgba(46,139,87,0.1)] transition hover:-translate-y-2">
              <span className="relative grid aspect-[4/3] place-items-center overflow-hidden rounded-[20px] bg-radial-warm">
                <Image src={item[1]} alt={item[0]} width={420} height={320} loading="lazy" className="max-h-[88%] w-auto object-contain transition duration-500 group-hover:scale-110" />
              </span>
              <span className="mt-4 block font-black text-ink">{item[0]}</span>
            </button>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {active && (
          <motion.div className="fixed inset-0 z-[90] grid place-items-center bg-ink/78 p-4 backdrop-blur-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActive(null)}>
            <div className="relative w-full max-w-3xl rounded-[28px] bg-cream p-6 shadow-2xl" onClick={(event) => event.stopPropagation()}>
              <button type="button" aria-label="Close gallery preview" onClick={() => setActive(null)} className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-white text-ink shadow"><X size={18} /></button>
              <div className="grid min-h-[420px] place-items-center rounded-[22px] bg-radial-warm">
                <Image src={active[1]} alt={active[0]} width={760} height={560} className="max-h-[520px] w-auto object-contain" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <section id="contact" className="section-panel bg-ink py-24 text-white sm:py-32">
      <div className="section-shell grid gap-10 lg:grid-cols-[0.78fr_1fr]">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.28em] text-banana">Contact</p>
          <h2 className="mt-3 font-display text-[clamp(2.25rem,4.8vw,4.8rem)] font-black leading-[0.98]">Start your ARUVI distributor enquiry.</h2>
          <p className="mt-6 text-lg leading-8 text-white/70">Share your district and business details for distributor leads, retailer onboarding, and supply conversations.</p>
          <div className="mt-10 grid gap-4 text-white/82">
            <a href="tel:+918825742002" className="flex items-center gap-3 rounded-2xl bg-white/8 p-4"><Phone className="text-banana" />8825742002</a>
            <div className="flex items-start gap-3 rounded-2xl bg-white/8 p-4"><MapPin className="mt-1 text-banana" />11/4, Nannagaram Road<br />Courtallam, Tenkasi<br />Tamil Nadu</div>
          </div>
        </div>
        <form onSubmit={submit} className="rounded-[30px] border border-white/10 bg-white p-5 text-ink shadow-[0_30px_90px_rgba(0,0,0,0.2)] sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            {["Name", "Phone", "District"].map((label) => <label key={label} className="grid gap-2 text-sm font-black text-ink/72">{label}<input className="focus-ring rounded-2xl border border-leaf/14 bg-cream px-4 py-4 text-base font-medium text-ink" required /></label>)}
            <label className="grid gap-2 text-sm font-black text-ink/72">Business Type<select className="focus-ring rounded-2xl border border-leaf/14 bg-cream px-4 py-4 text-base text-ink" required defaultValue=""><option value="" disabled>Select type</option><option>Distributor</option><option>Retailer</option><option>Supermarket</option><option>Wholesale</option></select></label>
            <label className="grid gap-2 text-sm font-black text-ink/72 sm:col-span-2">Message<textarea rows={5} className="focus-ring resize-none rounded-2xl border border-leaf/14 bg-cream px-4 py-4 text-base font-medium text-ink" required /></label>
          </div>
          <button type="submit" className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-full bg-leaf px-7 py-4 font-black text-white shadow-xl shadow-leaf/20 transition hover:-translate-y-1 hover:bg-ink sm:w-auto">Send Enquiry <ArrowRight size={18} /></button>
          {sent && <p className="mt-5 rounded-2xl bg-banana/25 px-4 py-3 text-sm font-black text-leaf">Enquiry captured. Connect this form to your CRM or email provider before launch.</p>}
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#10170e] px-4 py-12 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-full bg-banana text-base font-black text-ink">A</span><div><p className="font-black">ARUVI Banana Chips</p><p className="text-sm text-white/55">Fresh. Crunchy. Irresistible.</p></div></div>
        <div className="flex flex-wrap gap-3">{navItems.map((item) => <a key={item} href={`#${item.toLowerCase()}`} className="rounded-full bg-white/8 px-4 py-2 text-sm font-bold transition hover:bg-white/14">{item}</a>)}</div>
        <div className="flex gap-2">{[Instagram, Mail, Phone].map((Icon, index) => <a key={index} href={index === 0 ? "https://instagram.com" : index === 1 ? "#contact" : "tel:+918825742002"} aria-label={index === 0 ? "ARUVI Instagram" : index === 1 ? "Contact ARUVI" : "Call ARUVI"} className="grid h-11 w-11 place-items-center rounded-full bg-white/8 transition hover:bg-banana hover:text-ink"><Icon size={18} /></a>)}</div>
      </div>
    </footer>
  );
}

export default function AruviSite() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".reveal-card").forEach((card) => {
        gsap.fromTo(card, { y: 34, opacity: 0 }, { y: 0, opacity: 1, duration: 0.72, ease: "power3.out", scrollTrigger: { trigger: card, start: "top 88%" } });
      });
      gsap.to(".hero-aura", { backgroundPosition: "60% 30%", ease: "none", scrollTrigger: { trigger: ".hero-aura", start: "top top", end: "bottom top", scrub: true } });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <LoadingScreen />
      <div className="grain" />
      <Header />
      <main>
        <Hero />
        <Marquee />
        <About />
        <WhyChooseUs />
        <Products />
        <Distribution />
        <Statistics />
        <Testimonials />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
