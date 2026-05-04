"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUp, signIn } from "@/lib/auth-client";
import toast from "react-hot-toast";

const GoogleIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", photoUrl: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [gLoading, setGLoading] = useState(false);
  const [show, setShow] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password.length < 8) { toast.error("Password must be at least 8 characters."); return; }
    setLoading(true);
    try {
      const r = await signUp.email({
        name: form.name,
        email: form.email,
        password: form.password,
        image: form.photoUrl || undefined,
      });
      if (r.error) {
        toast.error(r.error.message || "Registration failed. Email may already be in use.");
      } else {
        toast.success("Account created! Please sign in. 🎉");
        router.push("/login");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setGLoading(true);
    try {
      await signIn.social({ provider: "google", callbackURL: "/" });
    } catch {
      toast.error("Google sign-in failed.");
      setGLoading(false);
    }
  };

  const strength = !form.password ? 0 : form.password.length < 6 ? 1 : form.password.length < 10 ? 2 : form.password.length < 14 ? 3 : 4;
  const strColors = ["transparent", "#f87171", "#f59e0b", "#34d399", "#4f39f6"];

  return (
    <div className="auth-wrap">
      <div className="auth-box fade-up" style={{ maxWidth: 460 }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none", marginBottom: "1.25rem" }}>
            <div className="grad-bg" style={{ width: 34, height: 34, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
              </svg>
            </div>
            <span className="grad-text serif" style={{ fontSize: "1.1rem", fontWeight: 700 }}>BoiGhor</span>
          </Link>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--c-text)", marginBottom: 4 }}>Create Account</h1>
          <p style={{ color: "var(--c-muted)", fontSize: ".85rem" }}>Join thousands of readers today</p>
        </div>

        {/* Google */}
        <button onClick={handleGoogle} disabled={gLoading} className="btn-social" style={{ marginBottom: "1rem" }}>
          {gLoading
            ? <svg className="spin" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
            : <GoogleIcon />
          }
          Continue with Google
        </button>

        <div className="or-divider">or register with email</div>

        <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: ".9rem" }}>
          <div>
            <label style={{ display: "block", fontSize: ".82rem", fontWeight: 500, color: "var(--c-muted)", marginBottom: 5 }}>Full Name</label>
            <input type="text" required placeholder="John Doe"
              value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="inp" />
          </div>
          <div>
            <label style={{ display: "block", fontSize: ".82rem", fontWeight: 500, color: "var(--c-muted)", marginBottom: 5 }}>Email Address</label>
            <input type="email" required placeholder="you@example.com"
              value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="inp" />
          </div>
          <div>
            <label style={{ display: "block", fontSize: ".82rem", fontWeight: 500, color: "var(--c-muted)", marginBottom: 5 }}>
              Photo URL <span style={{ color: "var(--c-faint)", fontWeight: 400 }}>(optional)</span>
            </label>
            <input type="url" placeholder="https://example.com/photo.jpg"
              value={form.photoUrl} onChange={e => setForm({ ...form, photoUrl: e.target.value })} className="inp" />
          </div>
          <div>
            <label style={{ display: "block", fontSize: ".82rem", fontWeight: 500, color: "var(--c-muted)", marginBottom: 5 }}>Password</label>
            <div style={{ position: "relative" }}>
              <input type={show ? "text" : "password"} required placeholder="Min. 8 characters"
                value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
                className="inp" style={{ paddingRight: 42 }} />
              <button type="button" onClick={() => setShow(!show)}
                style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "var(--c-faint)", cursor: "pointer", display: "flex" }}>
                {show
                  ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                  : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                }
              </button>
            </div>
            {form.password && (
              <div style={{ display: "flex", gap: 3, marginTop: 7 }}>
                {[1,2,3,4].map(n => (
                  <div key={n} style={{ height: 3, flex: 1, borderRadius: 99, background: strength >= n ? strColors[strength] : "var(--c-surface2)", transition: "background .3s" }} />
                ))}
              </div>
            )}
          </div>

          <button type="submit" disabled={loading} className="btn btn-fill"
            style={{ justifyContent: "center", padding: ".8rem", marginTop: 4 }}>
            {loading
              ? <><svg className="spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>Creating Account…</>
              : "Create Account →"
            }
          </button>
        </form>

        <p style={{ textAlign: "center", color: "var(--c-muted)", fontSize: ".82rem", marginTop: "1.25rem" }}>
          Have an account?{" "}
          <Link href="/login" style={{ color: "#a78bfa", fontWeight: 600, textDecoration: "none" }}>Sign in</Link>
        </p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
