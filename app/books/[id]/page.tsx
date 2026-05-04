"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";
import Link from "next/link";
import { Book } from "@/types/book";

export default function BookDetail() {
  const { id } = useParams();
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [borrowing, setBorrowing] = useState(false);
  const [borrowed, setBorrowed] = useState(false);

  useEffect(() => {
    if (!isPending && !session?.user) { router.push(`/login?redirect=/books/${id}`); return; }
    fetch(`/api/books/${id}`).then(r=>r.json()).then(d=>{setBook(d);setLoading(false);}).catch(()=>setLoading(false));
  }, [id, session, isPending, router]);

  const borrow = async () => {
    if (!session?.user) { router.push("/login"); return; }
    if (book!.available_quantity === 0) { toast.error("Unavailable."); return; }
    setBorrowing(true);
    await new Promise(r=>setTimeout(r,1000));
    setBorrowing(false); setBorrowed(true);
    toast.success(`"${book!.title}" borrowed! 📚`, { duration: 4000 });
  };

  if (isPending || loading) return (
    <div className="wrap" style={{ paddingTop:"3rem", paddingBottom:"4rem" }}>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1.2fr", gap:"3rem" }} className="detail-grid">
        <div className="shimmer" style={{height:420,borderRadius:14}}/><div style={{display:"flex",flexDirection:"column",gap:14}}>{[...Array(5)].map((_,i)=><div key={i} className="shimmer" style={{height:30,borderRadius:8}}/>)}</div>
      </div>
    </div>
  );

  if (!book) return (
    <div style={{minHeight:"80vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"1.5rem"}}>
      <div style={{fontSize:"4rem"}}>📭</div>
      <h2 className="serif" style={{color:"var(--c-text)",fontSize:"1.6rem"}}>Book not found</h2>
      <Link href="/books" className="btn btn-fill">← Back to Library</Link>
    </div>
  );

  const qc = book.available_quantity >= 7 ? "#34d399" : book.available_quantity >= 4 ? "#f59e0b" : "#f87171";
  const ql = book.available_quantity >= 7 ? "Readily Available" : book.available_quantity >= 4 ? "Limited Copies" : "Low Stock";

  return (
    <div style={{ minHeight:"100vh", paddingBottom:"4rem" }}>
      <div className="wrap" style={{ paddingTop:"2.5rem" }}>
        {/* Breadcrumb */}
        <nav style={{ display:"flex", gap:8, fontSize:".8rem", color:"var(--c-faint)", marginBottom:"2rem", alignItems:"center" }}>
          {[["Home","/"],["Books","/books"],[book.title,""]].map(([l,h],i)=>(
            <span key={i} style={{ display:"flex", alignItems:"center", gap:8 }}>
              {i>0 && <span>/</span>}
              {h ? <Link href={h} style={{ color:"var(--c-faint)", textDecoration:"none" }} onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.color="#a78bfa";}} onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.color="var(--c-faint)";}}>{l}</Link>
                 : <span style={{ color:"var(--c-text)", maxWidth:200, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{l}</span>}
            </span>
          ))}
        </nav>

        <div style={{ display:"grid", gap:"3rem", alignItems:"start" }} className="detail-grid">
          {/* Cover */}
          <div style={{ position:"relative" }}>
            <div style={{ borderRadius:16, overflow:"hidden", border:"1px solid var(--c-border)", boxShadow:"0 32px 64px rgba(0,0,0,.5)", maxWidth:360 }}>
              <img src={book.image_url} alt={book.title} style={{ width:"100%", height:440, objectFit:"cover", display:"block" }} />
            </div>
            <div style={{ position:"absolute", bottom:-10, right:0, maxWidth:360, width:"100%", height:440, borderRadius:16, background:"var(--c-surface)", border:"1px solid var(--c-border)", zIndex:-1, transform:"rotate(3deg)" }} />
          </div>

          {/* Info */}
          <div>
            <span className={`badge badge-${book.category.toLowerCase()}`} style={{ marginBottom:"1rem", display:"inline-block" }}>{book.category}</span>
            <h1 className="serif" style={{ fontSize:"clamp(1.6rem,3.5vw,2.4rem)", fontWeight:700, color:"var(--c-text)", lineHeight:1.2, marginBottom:10 }}>{book.title}</h1>
            <p style={{ color:"var(--c-muted)", fontSize:"1rem", marginBottom:"1.25rem" }}>by <span style={{color:"var(--c-text)",fontWeight:500}}>{book.author}</span></p>
            <div style={{ height:1, background:"var(--c-border)", marginBottom:"1.25rem" }}/>
            <p style={{ color:"var(--c-muted)", fontSize:".9rem", lineHeight:1.8, marginBottom:"1.5rem" }}>{book.description}</p>

            {/* Qty */}
            <div className="glass" style={{ borderRadius:10, padding:"1rem", marginBottom:"1.5rem", display:"flex", alignItems:"center", gap:12 }}>
              <div style={{ width:34, height:34, borderRadius:9, display:"flex", alignItems:"center", justifyContent:"center", background:`${qc}18`, border:`1px solid ${qc}40`, flexShrink:0 }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={qc} strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
              </div>
              <div>
                <div style={{ fontWeight:600, fontSize:".875rem", color:qc }}>{book.available_quantity} {book.available_quantity===1?"copy":"copies"} available</div>
                <div style={{ color:"var(--c-faint)", fontSize:".75rem" }}>{ql}</div>
              </div>
            </div>

            {/* Meta */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:"1.5rem" }}>
              {[["Category",book.category],["Author",book.author],["Format","Digital"],["Language","English"]].map(([l,v])=>(
                <div key={String(l)} className="glass" style={{ borderRadius:9, padding:".75rem 1rem" }}>
                  <div style={{ color:"var(--c-faint)", fontSize:".68rem", marginBottom:2, textTransform:"uppercase", letterSpacing:".06em" }}>{l}</div>
                  <div style={{ color:"var(--c-text)", fontSize:".85rem", fontWeight:500 }}>{v}</div>
                </div>
              ))}
            </div>

            {borrowed ? (
              <div style={{ display:"flex", alignItems:"center", gap:12, padding:"1rem", borderRadius:10, background:"rgba(52,211,153,.07)", border:"1px solid rgba(52,211,153,.25)" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                <div>
                  <p style={{ color:"#34d399", fontWeight:600, fontSize:".875rem" }}>Successfully Borrowed!</p>
                  <p style={{ color:"var(--c-muted)", fontSize:".78rem" }}>Enjoy your reading.</p>
                </div>
              </div>
            ) : (
              <button onClick={borrow} disabled={borrowing||book.available_quantity===0} className="btn btn-fill"
                style={{ width:"100%", justifyContent:"center", padding:".85rem", opacity:book.available_quantity===0?.5:1, cursor:book.available_quantity===0?"not-allowed":"pointer" }}>
                {borrowing
                  ? <><svg className="spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>Processing…</>
                  : book.available_quantity===0 ? "Currently Unavailable" : "Borrow This Book"
                }
              </button>
            )}

            <Link href="/books" style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:6, color:"var(--c-faint)", fontSize:".82rem", textDecoration:"none", marginTop:"1rem", transition:"color .18s" }}
              onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.color="#a78bfa";}}
              onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.color="var(--c-faint)";}}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              Back to Library
            </Link>
          </div>
        </div>
      </div>
      <style>{`.detail-grid{grid-template-columns:1fr 1.15fr;}@media(max-width:768px){.detail-grid{grid-template-columns:1fr!important;}}`}</style>
    </div>
  );
}
