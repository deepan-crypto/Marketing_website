"use client";

import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
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
import { FormEvent, MouseEvent, useEffect, useMemo, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const navItems = ["About", "Products", "Distribution", "Gallery", "Contact"];

const chipParticles = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  size: 34 + (index % 5) * 10,
  left: 5 + ((index * 23) % 88),
  top: 8 + ((index * 17) % 78),
  delay: (index % 7) * 0.22,
  drift: index % 2 === 0 ? 24 : -24,
}));

const whyCards = [
  {
    title: "Premium Quality",
    copy: "Crisp chips with balanced seasoning and a satisfying golden crunch.",
    icon: ShieldCheck,
  },
  {
    title: "Freshly Packed",
    copy: "Packed quickly to lock in aroma, snap, and shelf-ready freshness.",
    icon: PackageCheck,
  },
  {
    title: "Traditional Taste",
    copy: "Inspired by Tamil Nadu snack counters and familiar family favourites.",
    icon: Wheat,
  },
  {
    title: "Hygienic Manufacturing",
    copy: "Controlled production flow for cleaner batches and consistent quality.",
    icon: Factory,
  },
  {
    title: "Available Across Tamil Nadu",
    copy: "Built for retail partners, distributors, and fast-moving local shelves.",
    icon: Store,
  },
];

const products = [
  {
    size: "100gm Pack",
    price: "50",
    note: "Fast-moving single-serve pack for tea shops, stores, and counters.",
    scale: "w-40 sm:w-48",
    src: "/images/aruvi-pack-blue.svg",
    specs: ["Product: Banana Chips", "Scope: All over Tamil Nadu", "Packing: 100gm", "MRP: Rs 50"],
  },
  {
    size: "200gm Pack",
    price: "80",
    note: "Family-size crunch for supermarkets, bakeries, and premium retail.",
    scale: "w-52 sm:w-64",
    src: "/images/aruvi-pack-red.svg",
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

const stats = [
  { label: "Tamil Nadu Coverage", value: 38, suffix: " districts" },
  { label: "Retail Partners", value: 1200, suffix: "+" },
  { label: "Product Deliveries", value: 50000, suffix: "+" },
  { label: "Customer Satisfaction", value: 98, suffix: "%" },
];

const testimonials = [
  {
    quote:
      "ARUVI packs look premium on shelf, and the product moves quickly because the crunch is consistent.",
    name: "S. Prakash",
    role: "Distributor, Coimbatore",
  },
  {
    quote:
      "Our customers ask for the green ARUVI pack by name. Fresh stock and clear margins make it easy to sell.",
    name: "M. Revathi",
    role: "Retail Partner, Madurai",
  },
  {
    quote:
      "The taste feels traditional, but the packaging has a modern finish. That combination works.",
    name: "A. Natarajan",
    role: "Supermarket Buyer, Trichy",
  },
];

const gallery = [
  { title: "Blue Pack", src: "/images/aruvi-pack-blue.svg" },
  { title: "Green Pack", src: "/images/aruvi-pack.svg" },
  { title: "Red Pack", src: "/images/aruvi-pack-red.svg" },
];

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function LoadingScreen() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 1300);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {!ready ? (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center bg-[#fff3b8]"
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.55, ease: "easeInOut" }}
        >
          <div className="relative grid place-items-center">
            <motion.div
              className="absolute h-44 w-44 rounded-full border border-leaf/20"
              animate={{ rotate: 360 }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              animate={{ y: [0, -12, 0], rotate: [-6, 6, -6] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image src="/images/banana-chip.svg" alt="" width={98} height={70} priority />
            </motion.div>
            <p className="mt-36 text-sm font-black uppercase tracking-[0.32em] text-leaf">
              ARUVI
            </p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-4 py-4">
      <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-white/60 bg-white/72 px-4 py-3 shadow-[0_18px_60px_rgba(46,139,87,0.12)] backdrop-blur-2xl">
        <a href="#hero" className="focus-ring flex items-center gap-3 rounded-full" aria-label="ARUVI home">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-leaf text-sm font-black text-white shadow-pack">
            A
          </span>
          <span className="font-black tracking-tight text-ink">ARUVI</span>
        </a>
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="focus-ring rounded-full px-4 py-2 text-sm font-bold text-ink/70 transition hover:bg-banana/25 hover:text-ink"
            >
              {item}
            </a>
          ))}
        </div>
        <a
          href="#contact"
          className="focus-ring hidden rounded-full bg-ink px-5 py-2.5 text-sm font-black text-white shadow-lg shadow-ink/20 transition hover:-translate-y-0.5 hover:bg-leaf md:inline-flex"
        >
          Enquire
        </a>
        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          className="focus-ring grid h-10 w-10 place-items-center rounded-full bg-ink text-white md:hidden"
        >
          <Menu size={19} />
        </button>
      </nav>
      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[60] bg-ink/50 p-4 backdrop-blur-sm md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="ml-auto min-h-[320px] w-full max-w-sm rounded-[28px] bg-cream p-5 shadow-2xl"
              initial={{ x: 80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 80, opacity: 0 }}
            >
              <div className="flex items-center justify-between">
                <span className="font-black">ARUVI</span>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  className="focus-ring grid h-10 w-10 place-items-center rounded-full bg-white"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="mt-8 grid gap-3">
                {navItems.map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setOpen(false)}
                    className="rounded-2xl bg-white px-4 py-4 text-lg font-black"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

function ProductPack({
  className = "",
  priority = false,
  src = "/images/aruvi-pack.svg",
  alt = "ARUVI Banana Chips product pack",
}: {
  className?: string;
  priority?: boolean;
  src?: string;
  alt?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });
  const shineX = useTransform(rotateY, [-10, 10], ["20%", "80%"]);

  function handleMove(event: MouseEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    rotateY.set(x * 16);
    rotateX.set(y * -12);
  }

  function resetTilt() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={resetTilt}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={cn("relative mx-auto aspect-[4/3] max-w-full", className)}
    >
      <motion.div
        className="pack-shine pointer-events-none absolute inset-[7%] z-10 rounded-[28px]"
        style={{ "--shine-x": shineX } as React.CSSProperties}
      />
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 78vw, 520px"
        priority={priority}
        className="object-contain drop-shadow-[0_36px_45px_rgba(21,88,41,0.28)]"
      />
    </motion.div>
  );
}

function ProductPackTrio() {
  const packs = [
    {
      src: "/images/aruvi-pack-blue.svg",
      alt: "ARUVI Banana Chips blue pack",
      className: "left-[1%] top-[17%] w-[43%] -rotate-8 sm:left-[3%] sm:w-[42%]",
      z: "z-10",
    },
    {
      src: "/images/aruvi-pack.svg",
      alt: "ARUVI Banana Chips green pack",
      className: "left-[28%] top-[2%] w-[48%] rotate-0 sm:w-[47%]",
      z: "z-20",
    },
    {
      src: "/images/aruvi-pack-red.svg",
      alt: "ARUVI Banana Chips red pack",
      className: "right-[1%] top-[17%] w-[43%] rotate-8 sm:right-[3%] sm:w-[42%]",
      z: "z-10",
    },
  ];

  return (
    <motion.div
      className="relative mx-auto aspect-[1.28/1] w-[min(94vw,700px)]"
      initial={{ opacity: 0, scale: 0.78, rotate: -4 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 1, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="absolute inset-x-12 bottom-5 h-24 rounded-full bg-leaf/25 blur-3xl" />
      {packs.map((pack, index) => (
        <motion.div
          key={pack.src}
          className={cn("absolute aspect-[4/3] transform-gpu", pack.className, pack.z)}
          animate={{ y: [0, index === 1 ? -10 : -7, 0] }}
          transition={{
            duration: 4.8 + index * 0.35,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Image
            src={pack.src}
            alt={pack.alt}
            fill
            sizes="(max-width: 768px) 42vw, 330px"
            priority
            className="object-contain drop-shadow-[0_34px_42px_rgba(21,88,41,0.28)]"
          />
        </motion.div>
      ))}
    </motion.div>
  );
}

function FloatingChips() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {chipParticles.map((chip) => (
        <motion.div
          key={chip.id}
          className="chip-shadow absolute"
          style={{ left: `${chip.left}%`, top: `${chip.top}%` }}
          animate={{
            y: [0, chip.drift, 0],
            x: [0, chip.drift * 0.4, 0],
            rotate: [0, chip.drift > 0 ? 22 : -22, 0],
          }}
          transition={{
            duration: 4.8 + (chip.id % 4),
            delay: chip.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Image src="/images/banana-chip.svg" alt="" width={chip.size} height={chip.size} />
        </motion.div>
      ))}
    </div>
  );
}

function Hero() {
  return (
    <section id="hero" className="hero-aura relative flex min-h-screen items-center overflow-hidden pt-24">
      <FloatingChips />
      <div className="section-shell relative z-10 grid items-center gap-8 pb-14 lg:grid-cols-[1fr_1.05fr] lg:pb-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="max-w-2xl text-center lg:text-left"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-leaf/15 bg-white/70 px-4 py-2 text-sm font-black text-leaf shadow-sm backdrop-blur">
            <Sparkles size={16} />
            Hot & Fresh Tamil Nadu Crunch
          </div>
          <h1 className="font-display text-[clamp(2.8rem,6.6vw,6.65rem)] font-black leading-[0.92] tracking-normal text-ink">
            Tamil Nadu&apos;s Favourite Crispy Banana Chips
          </h1>
          <p className="mt-6 text-xl font-black text-leaf sm:text-2xl">
            Fresh. Crunchy. Irresistible.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <a
              href="#contact"
              className="focus-ring group inline-flex items-center justify-center gap-3 rounded-full bg-ink px-7 py-4 font-black text-white shadow-xl shadow-ink/20 transition hover:-translate-y-1 hover:bg-leaf"
            >
              Become a Distributor
              <ArrowRight className="transition group-hover:translate-x-1" size={19} />
            </a>
            <a
              href="#contact"
              className="focus-ring inline-flex items-center justify-center rounded-full border border-leaf/20 bg-white/78 px-7 py-4 font-black text-ink shadow-lg shadow-leaf/10 backdrop-blur transition hover:-translate-y-1 hover:border-banana hover:bg-banana/25"
            >
              Contact Us
            </a>
          </div>
        </motion.div>
        <ProductPackTrio />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#fffdf6] to-transparent" />
    </section>
  );
}

function SectionHeading({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-sm font-black uppercase tracking-[0.28em] text-leaf">{eyebrow}</p>
      <h2 className="mt-3 font-display text-[clamp(2.3rem,5vw,5rem)] font-black leading-[0.95] tracking-normal text-ink">
        {title}
      </h2>
      <p className="mt-5 text-base leading-8 text-ink/68 sm:text-lg">{copy}</p>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="section-panel py-24 sm:py-32">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Our Story"
          title="Traditional taste in a shelf-ready premium pack."
          copy="ARUVI Banana Chips brings the familiar comfort of Tamil Nadu snack culture into a modern FMCG format, made for everyday retail shelves and memorable first bites."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {[
            ["Fresh ingredients", "Selected bananas, golden frying, and balanced seasoning for a clean crunch."],
            ["Traditional taste", "A flavour profile inspired by the snack counters people already love."],
            ["Modern packaging", "Bold ARUVI packs designed to stand out in busy retail environments."],
          ].map(([title, copy], index) => (
            <motion.article
              key={title}
              className="reveal-card group rounded-[24px] border border-leaf/12 bg-white/78 p-7 shadow-[0_24px_70px_rgba(46,139,87,0.10)] backdrop-blur transition duration-300 hover:-translate-y-2 hover:border-banana"
              whileHover={{ rotate: index === 1 ? 0 : index === 0 ? -1 : 1 }}
            >
              <div className="mb-7 grid h-13 w-13 place-items-center rounded-2xl bg-banana/25 text-leaf">
                <Leaf />
              </div>
              <h3 className="text-2xl font-black text-ink">{title}</h3>
              <p className="mt-4 leading-7 text-ink/64">{copy}</p>
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
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Built for repeat cravings and fast retail movement."
          copy="Every detail is tuned for distributors and customers: premium presentation, reliable packing, and a taste that feels instantly familiar."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {whyCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.article
                key={card.title}
                className="reveal-card group min-h-[260px] rounded-[24px] border border-white/80 bg-white p-5 shadow-[0_20px_60px_rgba(46,139,87,0.11)] transition hover:-translate-y-2 hover:shadow-glow"
                whileHover={{ scale: 1.03 }}
              >
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-ink text-banana transition group-hover:rotate-6 group-hover:bg-leaf group-hover:text-white">
                  <Icon size={22} />
                </div>
                <h3 className="mt-7 text-xl font-black text-ink">{card.title}</h3>
                <p className="mt-3 text-sm leading-6 text-ink/62">{card.copy}</p>
                <span className="mt-6 block h-1 w-12 rounded-full bg-banana transition group-hover:w-20" />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Products() {
  return (
    <section id="products" className="section-panel relative overflow-hidden py-24 sm:py-32">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Products"
          title="Two shelf-ready packs. One unmistakable crunch."
          copy="Clear pack sizes, attractive pricing, and a strong visual identity designed for impulse purchase and repeat orders."
        />
        <div className="mt-14 grid items-end gap-6 lg:grid-cols-2">
          {products.map((product, index) => (
            <motion.article
              key={product.size}
              className="product-card group relative overflow-hidden rounded-[30px] border border-leaf/12 bg-white p-6 shadow-[0_30px_90px_rgba(46,139,87,0.12)] transition hover:-translate-y-2 sm:p-9"
              whileHover={{ scale: 1.015 }}
            >
              <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-banana/35 blur-2xl" />
              <div className="grid items-center gap-7 sm:grid-cols-[0.85fr_1fr]">
                <div className="relative mx-auto grid min-h-[260px] place-items-center">
                  <motion.div
                    animate={{ y: [0, -12, 0], rotate: [index === 0 ? -4 : 4, 0, index === 0 ? -4 : 4] }}
                    transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut" }}
                    className={cn("relative aspect-[4/3]", product.scale)}
                  >
                    <Image
                      src={product.src}
                      alt={`${product.size} ARUVI Banana Chips pack`}
                      fill
                      sizes="280px"
                      className="object-contain drop-shadow-[0_25px_30px_rgba(46,139,87,0.28)]"
                    />
                  </motion.div>
                  <div className="absolute bottom-5 h-7 w-40 rounded-full bg-ink/12 blur-xl" />
                </div>
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-leaf">
                    ARUVI Banana Chips
                  </p>
                  <h3 className="mt-3 text-4xl font-black tracking-normal text-ink">{product.size}</h3>
                  <p className="mt-4 text-6xl font-black text-flame">
                    <span className="text-3xl align-top">&#8377;</span>
                    {product.price}
                  </p>
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
                  <a
                    href="#contact"
                    aria-label={`Enquire about ${product.size}`}
                    className="focus-ring mt-7 inline-flex items-center gap-2 rounded-full bg-leaf px-5 py-3 font-black text-white transition hover:-translate-y-1 hover:bg-ink"
                  >
                    Enquire This Pack
                    <ArrowRight size={18} />
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

function TamilNaduMap() {
  const markers = [
    ["Chennai", 74, 17],
    ["Coimbatore", 26, 60],
    ["Madurai", 47, 74],
    ["Trichy", 52, 54],
    ["Salem", 42, 42],
    ["Tirunelveli", 55, 90],
  ];

  return (
    <div className="relative mx-auto max-w-md">
      <svg viewBox="0 0 300 420" className="h-auto w-full drop-shadow-[0_30px_55px_rgba(46,139,87,0.18)]" role="img" aria-label="Tamil Nadu supply coverage map">
        <path
          d="M162 15C206 36 233 77 225 119C217 161 248 177 259 221C270 265 236 298 233 338C230 378 196 407 154 399C112 391 94 363 72 330C50 297 28 277 36 235C44 193 58 172 52 132C46 92 58 52 94 33C118 20 139 5 162 15Z"
          fill="#F4C430"
        />
        <path
          d="M162 15C206 36 233 77 225 119C217 161 248 177 259 221C270 265 236 298 233 338C230 378 196 407 154 399C112 391 94 363 72 330C50 297 28 277 36 235C44 193 58 172 52 132C46 92 58 52 94 33C118 20 139 5 162 15Z"
          fill="url(#tnGradient)"
          opacity=".86"
        />
        <path
          d="M90 80C131 94 183 94 223 74M54 167C106 182 190 180 245 156M41 250C97 268 183 265 256 238M77 330C117 318 186 324 229 350"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          opacity=".42"
        />
        <defs>
          <linearGradient id="tnGradient" x1="40" x2="256" y1="31" y2="394">
            <stop stopColor="#2E8B57" />
            <stop offset=".54" stopColor="#F4C430" />
            <stop offset="1" stopColor="#FF8C00" />
          </linearGradient>
        </defs>
      </svg>
      {markers.map(([label, left, top], index) => (
        <div
          key={label}
          className="tn-marker absolute"
          style={{ left: `${left}%`, top: `${top}%`, animationDelay: `${index * 0.18}s` }}
        >
          <span className="sr-only">{label}</span>
        </div>
      ))}
    </div>
  );
}

function Distribution() {
  return (
    <section id="distribution" className="section-panel overflow-hidden bg-ink py-24 text-white sm:py-32">
      <div className="section-shell grid items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.28em] text-banana">Distribution</p>
          <h2 className="mt-3 font-display text-[clamp(2.3rem,5vw,5.2rem)] font-black leading-[0.95] tracking-normal">
            Supply strength for ambitious Tamil Nadu distributors.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72">
            ARUVI is designed as a high-velocity snack line with attractive margins, reliable fulfilment, and pack recognition that helps stores sell faster.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {[
              ["Supply Across Tamil Nadu", MapPin],
              ["Distributor Margin: 20% from MRP", Star],
              ["Reliable Supply Chain", PackageCheck],
              ["Fast Delivery Support", Truck],
            ].map(([text, Icon]) => {
              const TypedIcon = Icon as typeof MapPin;
              return (
                <motion.div
                  key={text as string}
                  className="reveal-card rounded-[22px] border border-white/10 bg-white/8 p-5 backdrop-blur transition hover:-translate-y-1 hover:bg-white/12"
                  whileHover={{ scale: 1.02 }}
                >
                  <TypedIcon className="text-banana" />
                  <p className="mt-4 font-black">{text as string}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
        <TamilNaduMap />
      </div>
    </section>
  );
}

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const element = ref.current;
    const counter = { value: 0 };
    const trigger = ScrollTrigger.create({
      trigger: element,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(counter, {
          value,
          duration: 1.8,
          ease: "power3.out",
          onUpdate: () => {
            element.textContent = Math.round(counter.value).toLocaleString("en-IN");
          },
        });
      },
    });

    return () => trigger.kill();
  }, [value]);

  return (
    <>
      <span ref={ref}>0</span>
      {suffix}
    </>
  );
}

function Statistics() {
  return (
    <section className="section-panel bg-[#fff8db] py-20">
      <div className="section-shell grid gap-4 md:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="reveal-card rounded-[24px] border border-leaf/10 bg-white/80 p-6 text-center shadow-[0_20px_60px_rgba(255,140,0,0.09)]"
          >
            <p className="text-4xl font-black text-leaf sm:text-5xl">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-3 text-sm font-black uppercase tracking-[0.16em] text-ink/58">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % testimonials.length);
    }, 4700);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="section-panel py-24 sm:py-32">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Testimonials"
          title="Retail partners remember the crunch."
          copy="A premium snack brand grows when distributors and retailers can trust the product, pack, and supply rhythm."
        />
        <div className="relative mx-auto mt-14 max-w-4xl overflow-hidden rounded-[32px] border border-leaf/12 bg-white p-7 shadow-[0_28px_90px_rgba(46,139,87,0.12)] sm:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.45 }}
            >
              <div className="flex gap-1 text-banana">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} fill="currentColor" size={20} />
                ))}
              </div>
              <p className="mt-8 font-display text-3xl font-black leading-tight text-ink sm:text-5xl">
                &quot;{testimonials[active].quote}&quot;
              </p>
              <div className="mt-8 flex items-center justify-between gap-4">
                <div>
                  <p className="font-black text-ink">{testimonials[active].name}</p>
                  <p className="text-sm text-ink/58">{testimonials[active].role}</p>
                </div>
                <div className="flex gap-2">
                  {testimonials.map((testimonial, index) => (
                    <button
                      key={testimonial.name}
                      type="button"
                      aria-label={`Show testimonial ${index + 1}`}
                      onClick={() => setActive(index)}
                      className={cn(
                        "h-3 rounded-full transition-all",
                        active === index ? "w-9 bg-leaf" : "w-3 bg-leaf/20",
                      )}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
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
        <SectionHeading
          eyebrow="Gallery"
          title="A visual identity made for snack aisles."
          copy="Bold green, golden chips, and warm highlights give ARUVI a premium but instantly appetising shelf presence."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-3">
          {gallery.map((item, index) => (
            <button
              key={`${item.title}-${index}`}
              type="button"
              onClick={() => setActive(item)}
              className="reveal-card focus-ring group overflow-hidden rounded-[26px] border border-leaf/12 bg-white p-4 text-left shadow-[0_20px_70px_rgba(46,139,87,0.1)] transition hover:-translate-y-2"
            >
              <span className="relative grid aspect-[4/3] place-items-center overflow-hidden rounded-[20px] bg-radial-warm">
                <Image
                  src={item.src}
                  alt={item.title}
                  width={420}
                  height={320}
                  loading="lazy"
                  className={cn(
                    "max-h-[88%] w-auto object-contain transition duration-500 group-hover:scale-110",
                  )}
                />
              </span>
              <span className="mt-4 block font-black text-ink">{item.title}</span>
            </button>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {active ? (
          <motion.div
            className="fixed inset-0 z-[90] grid place-items-center bg-ink/78 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              className="relative w-full max-w-3xl rounded-[28px] bg-cream p-6 shadow-2xl"
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                aria-label="Close gallery preview"
                onClick={() => setActive(null)}
                className="focus-ring absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-white text-ink shadow"
              >
                <X size={18} />
              </button>
              <div className="grid min-h-[420px] place-items-center rounded-[22px] bg-radial-warm">
                <Image src={active.src} alt={active.title} width={760} height={560} className="max-h-[520px] w-auto object-contain" />
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <section id="contact" className="section-panel bg-ink py-24 text-white sm:py-32">
      <div className="section-shell grid gap-10 lg:grid-cols-[0.78fr_1fr]">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.28em] text-banana">Contact</p>
          <h2 className="mt-3 font-display text-[clamp(2.3rem,5vw,5rem)] font-black leading-[0.95] tracking-normal">
            Start your ARUVI distributor enquiry.
          </h2>
          <p className="mt-6 text-lg leading-8 text-white/70">
            Share your district and business details. The ARUVI team can use this form flow for distributor leads, retailer onboarding, and supply conversations.
          </p>
          <div className="mt-10 grid gap-4 text-white/82">
            <a href="tel:+919876543210" className="focus-ring flex items-center gap-3 rounded-2xl bg-white/8 p-4 transition hover:bg-white/12">
              <Phone className="text-banana" />
              +91 98765 43210
            </a>
            <a href="mailto:distributors@aruvi.example" className="focus-ring flex items-center gap-3 rounded-2xl bg-white/8 p-4 transition hover:bg-white/12">
              <Mail className="text-banana" />
              distributors@aruvi.example
            </a>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="rounded-[30px] border border-white/10 bg-white p-5 text-ink shadow-[0_30px_90px_rgba(0,0,0,0.2)] sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name" name="name" autoComplete="name" />
            <Field label="Phone" name="phone" type="tel" autoComplete="tel" />
            <Field label="District" name="district" />
            <label className="grid gap-2 text-sm font-black text-ink/72">
              Business Type
              <select
                name="businessType"
                className="focus-ring rounded-2xl border border-leaf/14 bg-cream px-4 py-4 text-base text-ink"
                defaultValue=""
                required
              >
                <option value="" disabled>
                  Select type
                </option>
                <option>Distributor</option>
                <option>Retailer</option>
                <option>Supermarket</option>
                <option>Wholesale</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm font-black text-ink/72 sm:col-span-2">
              Message
              <textarea
                name="message"
                rows={5}
                className="focus-ring resize-none rounded-2xl border border-leaf/14 bg-cream px-4 py-4 text-base font-medium text-ink"
                placeholder="Tell us about your location, monthly volume, or supply requirement."
                required
              />
            </label>
          </div>
          <button
            type="submit"
            className="focus-ring mt-6 inline-flex w-full items-center justify-center gap-3 rounded-full bg-leaf px-7 py-4 font-black text-white shadow-xl shadow-leaf/20 transition hover:-translate-y-1 hover:bg-ink sm:w-auto"
          >
            Send Enquiry
            <ArrowRight size={18} />
          </button>
          {sent ? (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-5 rounded-2xl bg-banana/25 px-4 py-3 text-sm font-black text-leaf"
            >
              Enquiry captured. Connect this form to your CRM or email provider before launch.
            </motion.p>
          ) : null}
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <label className="grid gap-2 text-sm font-black text-ink/72">
      {label}
      <input
        name={name}
        type={type}
        autoComplete={autoComplete}
        className="focus-ring rounded-2xl border border-leaf/14 bg-cream px-4 py-4 text-base font-medium text-ink"
        required
      />
    </label>
  );
}

function Footer() {
  return (
    <footer className="bg-[#10170e] px-4 py-12 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-banana text-base font-black text-ink">
              A
            </span>
            <div>
              <p className="font-black">ARUVI Banana Chips</p>
              <p className="text-sm text-white/55">Fresh. Crunchy. Irresistible.</p>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="focus-ring rounded-full bg-white/8 px-4 py-2 text-sm font-bold transition hover:bg-white/14">
              {item}
            </a>
          ))}
        </div>
        <div className="flex gap-2">
          {[Instagram, Mail, Phone].map((Icon, index) => (
            <a
              key={index}
              href={index === 0 ? "https://instagram.com" : index === 1 ? "mailto:distributors@aruvi.example" : "tel:+919876543210"}
              aria-label={index === 0 ? "ARUVI Instagram" : index === 1 ? "Email ARUVI" : "Call ARUVI"}
              className="focus-ring grid h-11 w-11 place-items-center rounded-full bg-white/8 transition hover:bg-banana hover:text-ink"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

function Marquee() {
  const items = useMemo(
    () => ["Premium Quality", "Freshly Packed", "Tamil Nadu Supply", "20% Distributor Margin", "Hot & Fresh"],
    [],
  );

  return (
    <div className="overflow-hidden border-y border-leaf/10 bg-white/70 py-4">
      <div className="marquee-track flex w-max gap-4">
        {[...items, ...items, ...items].map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="inline-flex items-center gap-3 rounded-full bg-banana/22 px-5 py-2 text-sm font-black uppercase tracking-[0.16em] text-ink"
          >
            <Sparkles size={15} className="text-leaf" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function AruviSite() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".section-panel").forEach((section) => {
        gsap.fromTo(
          section,
          { y: 50, opacity: 0.85 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 82%",
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>(".reveal-card").forEach((card) => {
        gsap.fromTo(
          card,
          { y: 34, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.72,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
            },
          },
        );
      });

      gsap.to(".hero-aura", {
        backgroundPosition: "60% 30%",
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-aura",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
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
