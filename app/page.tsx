"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import BookCard from "@/components/BookCard";
import { useSession } from "@/lib/auth-client";
import { Book } from "@/types/book";

/* ── Animated counter hook ── */
function useCounter(target: number, duration = 1800, start = false) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!start) return;
        let startTime: number | null = null;
        const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
            else setCount(target);
        };
        requestAnimationFrame(step);
    }, [start, target, duration]);
    return count;
}

/* ── Stat card ── */
function StatCard({ value, suffix, label, icon, delay }: { value: number; suffix: string; label: string; icon: string; delay: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    const count = useCounter(value, 1600, visible);

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.5 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    return (
        <div ref={ref} className="card fade-up" style={{ padding: "2rem 1.5rem", textAlign: "center", animationDelay: `${delay}s` }}>
            <div style={{ fontSize: "2.2rem", marginBottom: 12 }}>{icon}</div>
            <div className="grad-text" style={{ fontSize: "2.4rem", fontWeight: 800, lineHeight: 1, marginBottom: 6 }}>
                {count.toLocaleString()}{suffix}
            </div>
            <div style={{ color: "var(--c-muted)", fontSize: ".85rem" }}>{label}</div>
        </div>
    );
}

const MARQUEE = [
    "New Arrival: The Midnight Algorithm",
    "Special Discount on Annual Memberships",
    "New Arrival: Whispers of the Forgotten Shore",
    "Free First Borrow for New Members",
    "New Arrival: Quantum Minds",
    "Reading Club — Every Friday",
    "New Arrival: Origins: The Chemistry of Life",
    "1,200+ Titles Now Available",
];

const REVIEWS = [
    { name: "Areeba Siddiqui", role: "Graduate Student", text: "BoiGhor transformed my research. Access to Tech and Science titles is unparalleled.", avatar: "A", stars: 5 },
    { name: "James Thornton", role: "Fiction Enthusiast", text: "The Story collection is breathtaking. Discovered authors I never would have found otherwise.", avatar: "J", stars: 5 },
    { name: "Priya Nair", role: "Software Engineer", text: "Having everything digitized with such a clean interface is a genuine game changer for me.", avatar: "P", stars: 5 },
    { name: "Marco Esposito", role: "High School Teacher", text: "I recommend BoiGhor to all my students. The Science section is rich and always up to date.", avatar: "M", stars: 5 },
];

export default function Home() {
    const { data: session } = useSession();
    const router = useRouter();
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/books").then(r => r.json()).then(d => { setBooks(d.slice(0, 4)); setLoading(false); }).catch(() => setLoading(false));
    }, []);

    const smartHref = session?.user ? "/" : "/register";
    const smartLabel = session?.user ? "My Library" : "Join Free";

    return (
        <div style={{ fontFamily: "'Inter', sans-serif" }}>

            {/* ════════ HERO ════════ */}
            <section style={{
                position: "relative", overflow: "hidden",
                padding: "clamp(5rem, 12vw, 9rem) 0 clamp(4rem, 8vw, 7rem)",
                background: "radial-gradient(ellipse 90% 70% at 60% 0%, rgba(79,57,246,.18) 0%, transparent 65%), radial-gradient(ellipse 60% 50% at 10% 80%, rgba(149,20,250,.12) 0%, transparent 60%), var(--c-bg)",
            }}>
                {/* subtle grid */}
                <div style={{ position: "absolute", inset: 0, opacity: .035, backgroundImage: "linear-gradient(var(--c-border-purple) 1px,transparent 1px),linear-gradient(90deg,var(--c-border-purple) 1px,transparent 1px)", backgroundSize: "52px 52px", pointerEvents: "none" }} />

                <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "3rem", alignItems: "center" }} className="hero-grid">
                        {/* Left */}
                        <div style={{ maxWidth: 580 }}>
              <span className="fade-up" style={{
                  display: "inline-flex", alignItems: "center", gap: 7,
                  padding: "5px 13px", borderRadius: 99,
                  fontSize: ".72rem", fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase",
                  color: "#c4b5fd", background: "rgba(79,57,246,.14)", border: "1px solid rgba(79,57,246,.3)",
                  marginBottom: "1.4rem",
              }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#a78bfa" }} />
                Digital Library Platform
              </span>

                            <h1 className="serif fade-up d1" style={{
                                fontSize: "clamp(2.6rem, 5.5vw, 4.2rem)",
                                fontWeight: 800, lineHeight: 1.1,
                                color: "var(--c-text)", marginBottom: "1.25rem",
                            }}>
                                Find Your<br />
                                <span className="grad-text">Next Read</span>
                            </h1>

                            <p className="fade-up d2" style={{ color: "var(--c-muted)", fontSize: "1rem", lineHeight: 1.75, marginBottom: "2rem", maxWidth: 460 }}>
                                Explore thousands of titles across stories, technology, and science. Borrow digitally, read anywhere — your library, reimagined.
                            </p>

                            <div className="fade-up d3" style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: "2.5rem" }}>
                                <Link href="/books" className="btn btn-fill" style={{ padding: ".75rem 1.8rem" }}>
                                    Browse Now
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                                </Link>
                                <button onClick={() => router.push(smartHref)} className="btn btn-ghost" style={{ padding: ".75rem 1.8rem" }}>
                                    {smartLabel}
                                </button>
                            </div>

                            <div className="fade-up d4" style={{ display: "flex", gap: "2.5rem" }}>
                                {[["1,200+","Books"],["35K+","Readers"],["3","Categories"]].map(([v,l]) => (
                                    <div key={l}>
                                        <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--c-text)" }}>{v}</div>
                                        <div style={{ fontSize: ".75rem", color: "var(--c-muted)", marginTop: 2 }}>{l}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right — Floating cover */}
                        <div className="hide-mobile floats" style={{ position: "relative", flexShrink: 0 }}>
                            <div style={{ width: 240, height: 320, borderRadius: 18, overflow: "hidden", border: "1px solid rgba(79,57,246,.35)", boxShadow: "0 40px 80px rgba(0,0,0,.55)", transform: "rotate(-3deg)" }}>
                                <img src="https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=640&fit=crop" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(0deg,rgba(9,9,15,.8) 0%,transparent 55%)" }} />
                                <div style={{ position: "absolute", bottom: "1rem", left: "1rem", right: "1rem" }}>
                                    <p className="serif" style={{ color: "#fff", fontSize: ".9rem", fontWeight: 700, lineHeight: 1.3 }}>Whispers of the Forgotten Shore</p>
                                    <p style={{ color: "rgba(255,255,255,.6)", fontSize: ".75rem", marginTop: 3 }}>Elara Voss</p>
                                </div>
                            </div>
                            {/* Back shadow card */}
                            <div style={{ position: "absolute", inset: 0, borderRadius: 18, background: "var(--c-surface)", border: "1px solid var(--c-border)", zIndex: -1, transform: "rotate(4deg)" }} />
                            {/* Chip top */}
                            <div className="glass" style={{ position: "absolute", top: -14, right: -18, borderRadius: 10, padding: "8px 12px", textAlign: "center" }}>
                                <div className="grad-text" style={{ fontSize: ".95rem", fontWeight: 800 }}>4.9 ★</div>
                                <div style={{ fontSize: ".68rem", color: "var(--c-muted)" }}>Top Rated</div>
                            </div>
                            {/* Chip bottom */}
                            <div className="glass" style={{ position: "absolute", bottom: -16, left: -20, borderRadius: 10, padding: "8px 12px" }}>
                                <div style={{ fontSize: ".7rem", fontWeight: 700, color: "#06b6d4" }}>📖 New Arrival</div>
                                <div style={{ fontSize: ".67rem", color: "var(--c-muted)", marginTop: 2 }}>12 books this week</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ════════ MARQUEE ════════ */}
            <div className="marquee-outer">
                <div className="marquee-inner">
                    {[...MARQUEE, ...MARQUEE].map((t, i) => (
                        <span key={i} className="marquee-item">
              <span className="dot" />
                            {t}
            </span>
                    ))}
                </div>
            </div>



            {/* ════════ STATS ════════ */}
            <section className="section-sm" style={{ background: "var(--c-surface)", borderTop: "1px solid var(--c-border)", borderBottom: "1px solid var(--c-border)" }}>
                <div className="wrap">
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 16 }}>
                        <StatCard value={1200} suffix="+" label="Books Available" icon="📚" delay={0} />
                        <StatCard value={35000} suffix="+" label="Active Readers" icon="👥" delay={0.1} />
                        <StatCard value={3} suffix="" label="Categories" icon="🗂" delay={0.2} />
                        <StatCard value={99} suffix="%" label="Uptime" icon="⚡" delay={0.3} />
                    </div>
                </div>
            </section>

            {/* ════════ CATEGORIES ════════ */}
            <section className="section">
                <div className="wrap">
                    <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
                        <span className="label" style={{ color: "#f59e0b" }}>Browse by Genre</span>
                        <h2 className="serif" style={{ fontSize: "clamp(1.6rem,3.5vw,2.4rem)", fontWeight: 700, color: "var(--c-text)" }}>Explore Categories</h2>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 20 }}>
                        {[
                            { cat:"Story",  color:"#f59e0b", icon:"📖", desc:"Timeless narratives and worlds that stay with you long after the last page.", n:4 },
                            { cat:"Tech",   color:"#06b6d4", icon:"💻", desc:"From algorithms to AI — books shaping the digital future we're building.", n:4 },
                            { cat:"Science",color:"#a78bfa", icon:"🔬", desc:"Unravel the mysteries of the cosmos, life, and everything in between.", n:4 },
                        ].map(({ cat, color, icon, desc, n }) => (
                            <Link key={cat} href={`/books?category=${cat}`} style={{ textDecoration: "none" }}>
                                <div className="card" style={{ padding: "1.75rem", height: "100%", transition: "all .25s" }}
                                     onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = color; (e.currentTarget as HTMLElement).style.transform = "translateY(-5px)"; }}
                                     onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--c-border)"; (e.currentTarget as HTMLElement).style.transform = "none"; }}>
                                    <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{icon}</div>
                                    <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color, marginBottom: 8 }}>{cat}</h3>
                                    <p style={{ color: "var(--c-muted)", fontSize: ".85rem", lineHeight: 1.65, marginBottom: "1.25rem" }}>{desc}</p>
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                        <span style={{ fontSize: ".75rem", fontWeight: 600, color: "var(--c-faint)" }}>{n} titles</span>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>



            <style>{`
        @media (max-width: 820px) {
          .hero-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
        </div>
    );
}
