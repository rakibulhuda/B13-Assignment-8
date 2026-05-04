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
              {[
                {
                  name: "Facebook",
                  href: "#",
                  icon: (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                  ),
                },
                {
                  name: "Twitter",
                  href: "#",
                  icon: (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                  ),
                },
                {
                  name: "LinkedIn",
                  href: "#",
                  icon: (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                  ),
                },
              ].map((social) => (
                  <a
                      key={social.name}
                      href={social.href}
                      aria-label={social.name}
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 7,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "var(--c-surface2)",
                        border: "1px solid var(--c-border)",
                        color: "var(--c-muted)",
                        textDecoration: "none",
                        transition: "all .18s",
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = "var(--c-primary)";
                        el.style.color = "var(--c-primary)";
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = "var(--c-border)";
                        el.style.color = "var(--c-muted)";
                      }}
                  >
                    {social.icon}
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
