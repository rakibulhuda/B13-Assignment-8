"use client";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";

export default function Footer() {
  const { data: session } = useSession();
  const year = new Date().getFullYear();
  const accountLinks = session?.user
    ? [{ href: "/", l: "Home" }, { href: "/profile", l: "My Profile" }, { href: "/profile/update", l: "Update Info" }, { href: "/books", l: "Browse Books" }]
    : [{ href: "/login", l: "Sign In" }, { href: "/register", l: "Register" }, { href: "/books", l: "Browse Books" }, { href: "/profile", l: "My Profile" }];

  const linkStyle = { color: "var(--c-faint)", fontSize: ".85rem", textDecoration: "none", display: "flex", alignItems: "center", gap: 7, transition: "color .18s" };

  return (
    <footer style={{ background: "var(--c-surface)", borderTop: "1px solid var(--c-border)", fontFamily: "'Inter',sans-serif" }}>
      <div className="wrap" style={{ paddingTop: "3.5rem", paddingBottom: "3.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))", gap: "2.5rem" }}>

          {/* Brand */}
          <div>
            <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none", marginBottom: "1rem" }}>
              <div className="grad-bg" style={{ width: 30, height: 30, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                </svg>
              </div>
              <span className="grad-text serif" style={{ fontSize: "1rem", fontWeight: 700 }}>BoiGhor</span>
            </Link>
            <p style={{ color: "var(--c-faint)", fontSize: ".82rem", lineHeight: 1.7, marginBottom: "1.1rem" }}>Your digital sanctuary for books. Discover, borrow, and read anywhere.</p>
            <div style={{ display: "flex", gap: 8 }}>
              {["T","G","L"].map(s => (
                <a key={s} href="#" style={{ width: 30, height: 30, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--c-surface2)", border: "1px solid var(--c-border)", color: "var(--c-muted)", fontSize: ".7rem", fontWeight: 700, textDecoration: "none", transition: "border-color .18s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--c-primary)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--c-border)"; }}>
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <p style={{ color: "var(--c-text)", fontWeight: 600, fontSize: ".875rem", marginBottom: "1rem" }}>Explore</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              {[{ href:"/", l:"Home" }, { href:"/books", l:"All Books" }, { href:"/books?category=Story", l:"Stories" }, { href:"/books?category=Tech", l:"Technology" }, { href:"/books?category=Science", l:"Science" }].map(({ href, l }) => (
                <Link key={l} href={href} style={linkStyle}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#a78bfa"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--c-faint)"; }}>
                  <span style={{ width: 3, height: 3, borderRadius: "50%", background: "var(--c-primary)", flexShrink: 0 }} />{l}
                </Link>
              ))}
            </div>
          </div>

          {/* Account */}
          <div>
            <p style={{ color: "var(--c-text)", fontWeight: 600, fontSize: ".875rem", marginBottom: "1rem" }}>Account</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              {accountLinks.map(({ href, l }) => (
                <Link key={l} href={href} style={linkStyle}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#06b6d4"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--c-faint)"; }}>
                  <span style={{ width: 3, height: 3, borderRadius: "50%", background: "#06b6d4", flexShrink: 0 }} />{l}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p style={{ color: "var(--c-text)", fontWeight: 600, fontSize: ".875rem", marginBottom: "1rem" }}>Contact Us</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: "1.1rem" }}>
              {[["✉", "programminghero@boighor.io"], ["📞", "+880 (181) 115-5678"], ["📍", "Dhaka, Bangladesh"]].map(([ic, t]) => (
                <div key={String(t)} style={{ display: "flex", alignItems: "center", gap: 9 }}>
                  <span style={{ fontSize: ".85rem" }}>{ic}</span>
                  <span style={{ color: "var(--c-faint)", fontSize: ".82rem" }}>{t}</span>
                </div>
              ))}
            </div>
            <p style={{ color: "var(--c-faint)", fontSize: ".75rem", marginBottom: 6 }}>Newsletter</p>
            <div style={{ display: "flex", gap: 6 }}>
              <input type="email" placeholder="your@email.com" className="inp" style={{ minWidth: 0, fontSize: ".8rem", padding: ".55rem .75rem" }} />
              <button className="btn btn-fill" style={{ padding: ".55rem .9rem", fontSize: ".82rem", flexShrink: 0 }}>→</button>
            </div>
          </div>
        </div>

        <div style={{ marginTop: "2.5rem", paddingTop: "1.5rem", borderTop: "1px solid var(--c-border)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
          <p style={{ color: "var(--c-faint)", fontSize: ".78rem" }}>© {year} BoiGhor. All rights reserved.</p>
          <div style={{ display: "flex", gap: 16 }}>
            {["Privacy Policy", "Terms"].map(t => (
              <a key={t} href="#" style={{ color: "var(--c-faint)", fontSize: ".78rem", textDecoration: "none", transition: "color .18s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#a78bfa"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--c-faint)"; }}>{t}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
