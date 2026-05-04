import Link from "next/link";
import { Book } from "@/types/book";

export default function BookCard({ book, index = 0 }: { book: Book; index?: number }) {
  const qc = book.available_quantity >= 7 ? "#34d399" : book.available_quantity >= 4 ? "#f59e0b" : "#f87171";
  const ql = book.available_quantity >= 7 ? "Available" : book.available_quantity >= 4 ? "Limited" : "Low Stock";
  return (
    <div className="card fade-up" style={{ display: "flex", flexDirection: "column", animationDelay: `${index * 0.07}s` }}>
      <div style={{ position: "relative", height: 200, overflow: "hidden", flexShrink: 0 }}>
        <img src={book.image_url} alt={book.title}
          style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .45s ease", display: "block" }}
          loading="lazy"
          onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.06)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(0deg,rgba(9,9,15,.82) 0%,transparent 55%)", pointerEvents: "none" }} />
        <span className={`badge badge-${book.category.toLowerCase()}`} style={{ position: "absolute", top: 10, left: 10 }}>{book.category}</span>
      </div>
      <div style={{ padding: "1rem 1rem 1.1rem", flex: 1, display: "flex", flexDirection: "column" }}>
        <h3 style={{ color: "var(--c-text)", fontSize: ".9rem", fontWeight: 700, lineHeight: 1.4, marginBottom: 3, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{book.title}</h3>
        <p style={{ color: "var(--c-muted)", fontSize: ".78rem", marginBottom: "auto" }}>by {book.author}</p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 12 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: ".75rem", fontWeight: 600, color: qc }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: qc, display: "inline-block" }} />
            {book.available_quantity} {ql}
          </span>
          <Link href={`/books/${book.id}`} className="btn btn-fill" style={{ padding: "5px 12px", fontSize: ".75rem" }}>Details</Link>
        </div>
      </div>
    </div>
  );
}
