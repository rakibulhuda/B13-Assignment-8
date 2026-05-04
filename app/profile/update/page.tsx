"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSession, updateUser } from "@/lib/auth-client";
import Link from "next/link";
import toast from "react-hot-toast";

export default function UpdateProfile() {
    const { data: session, isPending } = useSession();
    const router = useRouter();
    const [form, setForm] = useState({ name: "", image: "" });
    const [loading, setLoading] = useState(false);

    // ✅ FIX: Use a ref to ensure we only initialize the form ONCE
    const hasInitialized = useRef(false);

    useEffect(() => {
        if (!isPending && !session?.user) {
            router.push("/login?redirect=/profile/update");
            return;
        }

        // Only run initialization logic if:
        // 1. We have a session
        // 2. We haven't initialized yet
        if (session?.user && !hasInitialized.current) {
            setForm({
                name: session.user.name || "",
                image: session.user.image || "",
            });
            hasInitialized.current = true; // Mark as initialized
        }
    }, [session, isPending, router]);

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name.trim()) {
            toast.error("Name required.");
            return;
        }
        setLoading(true);
        try {
            const r = await updateUser({ name: form.name, image: form.image || undefined });
            if (r.error) toast.error(r.error.message || "Update failed.");
            else {
                toast.success("Profile updated! ✨");
                router.push("/profile");
            }
        } catch {
            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    if (isPending)
        return (
            <div className="auth-wrap">
                <div
                    className="shimmer"
                    style={{ width: "100%", maxWidth: 440, height: 340, borderRadius: 18 }}
                />
            </div>
        );

    if (!session?.user) return null;

    return (
        <div className="auth-wrap">
            <div className="auth-box fade-up" style={{ maxWidth: 460 }}>
                <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
                    <div
                        className="grad-bg"
                        style={{
                            width: 48,
                            height: 48,
                            borderRadius: 12,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            margin: "0 auto 1rem",
                        }}
                    >
                        <svg
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#fff"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                    </div>
                    <h1
                        style={{
                            fontSize: "1.5rem",
                            fontWeight: 700,
                            color: "var(--c-text)",
                            marginBottom: 4,
                        }}
                    >
                        Update Profile
                    </h1>
                    <p style={{ color: "var(--c-muted)", fontSize: ".85rem" }}>
                        Update your name and profile photo
                    </p>
                </div>

                {/* Preview */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        padding: ".9rem 1rem",
                        borderRadius: 10,
                        background: "rgba(79,57,246,.07)",
                        border: "1px solid rgba(79,57,246,.2)",
                        marginBottom: "1.5rem",
                    }}
                >
                    {form.image ? (
                        <img
                            src={form.image}
                            onError={(e) => {
                                (e.currentTarget as HTMLImageElement).style.display = "none";
                            }}
                            style={{
                                width: 46,
                                height: 46,
                                borderRadius: 10,
                                objectFit: "cover",
                                flexShrink: 0,
                                border: "2px solid rgba(79,57,246,.35)",
                            }}
                            alt=""
                        />
                    ) : (
                        <div
                            className="grad-bg"
                            style={{
                                width: 46,
                                height: 46,
                                borderRadius: 10,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "1.25rem",
                                fontWeight: 700,
                                color: "#fff",
                                flexShrink: 0,
                            }}
                        >
                            {(form.name || "?")[0].toUpperCase()}
                        </div>
                    )}
                    <div>
                        <p style={{ color: "var(--c-text)", fontWeight: 600, fontSize: ".9rem" }}>
                            {form.name || "Your Name"}
                        </p>
                        <p style={{ color: "var(--c-muted)", fontSize: ".78rem" }}>
                            {session.user.email}
                        </p>
                    </div>
                </div>

                <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <div>
                        <label
                            style={{
                                display: "block",
                                fontSize: ".82rem",
                                fontWeight: 500,
                                color: "var(--c-muted)",
                                marginBottom: 5,
                            }}
                        >
                            Full Name <span style={{ color: "#f87171" }}>*</span>
                        </label>
                        <input
                            type="text"
                            required
                            placeholder="Your name"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="inp"
                        />
                    </div>
                    <div>
                        <label
                            style={{
                                display: "block",
                                fontSize: ".82rem",
                                fontWeight: 500,
                                color: "var(--c-muted)",
                                marginBottom: 5,
                            }}
                        >
                            Photo URL{" "}
                            <span style={{ color: "var(--c-faint)", fontWeight: 400 }}>(optional)</span>
                        </label>
                        <input
                            type="url"
                            placeholder="https://…"
                            value={form.image}
                            onChange={(e) => setForm({ ...form, image: e.target.value })}
                            className="inp"
                        />
                        <p style={{ color: "var(--c-faint)", fontSize: ".73rem", marginTop: 5 }}>
                            Paste a direct link to your image
                        </p>
                    </div>
                    <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                        <Link
                            href="/profile"
                            className="btn btn-ghost"
                            style={{ flex: 1, justifyContent: "center", padding: ".8rem" }}
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-fill"
                            style={{ flex: 1, justifyContent: "center", padding: ".8rem" }}
                        >
                            {loading ? (
                                <>
                                    <svg
                                        className="spin"
                                        width="15"
                                        height="15"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                                    </svg>
                                    Saving…
                                </>
                            ) : (
                                "Save Changes"
                            )}
                        </button>
                    </div>
                </form>
            </div>
            <style>{`@keyframes spin{to{transform:rotate(360deg);}}`}</style>
        </div>
    );
}