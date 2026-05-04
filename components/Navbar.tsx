"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { signOut, useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/books", label: "All Books" },
  { href: "/profile", label: "My Profile" },
];

export default function Navbar() {
  const { data: session, isPending } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const logout = async () => {
    await signOut();
    toast.success("Logged out");
    router.push("/");
    setOpen(false);
  };

  const initials = (session?.user?.name || session?.user?.email || "U")[0].toUpperCase();

  return (
      <header className="nav">
        <div className="wrap nav-inner">
          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 9, textDecoration: "none" }}>
            <div className="grad-bg" style={{ width: 34, height: 34, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
              </svg>
            </div>
            <span className="grad-text serif" style={{ fontSize: "1.15rem", fontWeight: 700 }}>BoiGhor</span>
          </Link>

          {/* Desktop links */}
          <nav className="hide-mobile" style={{ display: "flex", gap: 4, alignItems: "center" }}>
            {NAV.map(l => (
                <Link key={l.href} href={l.href} style={{
                  padding: "6px 14px", borderRadius: 8,
                  fontSize: ".875rem", fontWeight: 500,
                  textDecoration: "none",
                  color: pathname === l.href ? "#a78bfa" : "var(--c-muted)",
                  background: pathname === l.href ? "rgba(79,57,246,.1)" : "transparent",
                  transition: "all .18s",
                }}>{l.label}</Link>
            ))}
          </nav>

          {/* Desktop auth */}
          <div className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {isPending ? (
                <div className="shimmer" style={{ width: 80, height: 34 }} />
            ) : session?.user ? (
                <>
                  {/* ✅ Fixed: Removed 'group' from style */}
                  <Link href="/profile" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                    {session.user.image
                        ? <img src={session.user.image} style={{ width: 30, height: 30, borderRadius: "50%", objectFit: "cover", border: "2px solid rgba(79,57,246,.45)", transition: "border-color .2s" }} alt="" />
                        : <div className="grad-bg" style={{ width: 30, height: 30, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#fff" }}>{initials}</div>
                    }
                    <span style={{
                      fontSize: ".85rem",
                      color: "var(--c-muted)",
                      maxWidth: 120,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      transition: "color .2s"
                    }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = "#a78bfa")}
                          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--c-muted)")}
                    >
                  {session.user.name || session.user.email}
                </span>
                  </Link>

                  <button onClick={logout} className="btn btn-ghost" style={{ padding: "6px 14px", fontSize: ".85rem" }}>Logout</button>
                </>
            ) : (
                <Link href="/login" className="btn btn-fill" style={{ padding: "7px 20px", fontSize: ".875rem" }}>Login</Link>
            )}
          </div>

          {/* Mobile hamburger */}
          <button className="show-mobile" onClick={() => setOpen(!open)}
                  style={{ background: "none", border: "none", color: "var(--c-muted)", cursor: "pointer", padding: 4 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></> : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
            <div className="show-mobile" style={{ borderTop: "1px solid var(--c-border)", background: "var(--c-surface)" }}>
              <div className="wrap" style={{ paddingTop: 12, paddingBottom: 16, display: "flex", flexDirection: "column", gap: 4 }}>
                {NAV.map(l => (
                    <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
                          style={{ padding: "10px 12px", borderRadius: 8, fontSize: ".9rem", fontWeight: 500, textDecoration: "none", color: pathname === l.href ? "#a78bfa" : "var(--c-muted)", background: pathname === l.href ? "rgba(79,57,246,.1)" : "transparent" }}>
                      {l.label}
                    </Link>
                ))}
                <div style={{ marginTop: 8, paddingTop: 8, borderTop: "1px solid var(--c-border)" ,marginRight:8}}>
                  {session?.user ? (
                      <>
                        {/* ✅ MOBILE: WRAPPED IN LINK TO /profile */}
                        <Link href="/profile" onClick={() => setOpen(false)} style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          padding: "6px 12px",
                          textDecoration: "none",
                          marginBottom: "4px"
                        }}>
                          {session.user.image
                              ? <img src={session.user.image} style={{ width: 24, height: 24, borderRadius: "50%", objectFit: "cover" }} alt="" />
                              : <div className="grad-bg" style={{ width: 24, height: 24, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#fff" }}>{initials}</div>
                          }
                          <p style={{ fontSize: ".82rem", color: "var(--c-text)", fontWeight: 500 }}>{session.user.name || session.user.email}</p>
                        </Link>

                        <button onClick={logout} style={{ width: "100%", textAlign: "left", padding: "10px 12px", background: "none", border: "none", color: "#f87171", fontSize: ".9rem", fontWeight: 500, cursor: "pointer" }}>Logout</button>
                      </>
                  ) : (
                      <Link href="/login" onClick={() => setOpen(false)}
                            style={{ display: "block", padding: "10px 12px", color: "#a78bfa", fontSize: ".9rem", fontWeight: 600, textDecoration: "none" }}>Login →</Link>
                  )}
                </div>
              </div>
            </div>
        )}
      </header>
  );
}