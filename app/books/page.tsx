"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import BookCard from "@/components/BookCard";
import { Book, Category } from "@/types/book";

const CATS: Category[] = ["All","Story","Tech","Science"];
const ICONS: Record<Category,string> = { All:"📚", Story:"📖", Tech:"💻", Science:"🔬" };

function BooksContent() {
  const sp = useSearchParams();
  const router = useRouter();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState<Category>((sp.get("category") as Category) || "All");

  useEffect(() => {
    fetch("/api/books").then(r=>r.json()).then(d=>{setBooks(d);setLoading(false);}).catch(()=>setLoading(false));
  },[]);
  useEffect(() => {
    const c = sp.get("category") as Category;
    if (c && CATS.includes(c)) setCat(c);
  }, [sp]);

  const setCategory = (c: Category) => {
    setCat(c);
    router.push(c === "All" ? "/books" : `/books?category=${c}`);
  };

  const filtered = books.filter(b =>
    (cat === "All" || b.category === cat) &&
    (b.title.toLowerCase().includes(search.toLowerCase()) || b.author.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div style={{ minHeight: "100vh" }}>
      <div className="wrap" style={{ paddingTop: "3rem", paddingBottom: "4rem" }}>
        {/* Header */}
        <div style={{ marginBottom: "2rem" }}>
          <span className="label" style={{ color: "var(--c-primary)" }}>Collection</span>
          <h1 className="serif" style={{ fontSize: "clamp(1.8rem,4vw,2.6rem)", fontWeight: 700, color: "var(--c-text)" }}>All Books</h1>
          <p style={{ color: "var(--c-muted)", fontSize: ".9rem", marginTop: 4 }}>Browse our complete library of {books.length} titles.</p>
        </div>

        {/* Search */}
        <div style={{ position: "relative", marginBottom: "2rem" }}>
          <svg style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: "var(--c-faint)", pointerEvents: "none" }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input value={search} onChange={e=>setSearch(e.target.value)}
            placeholder="Search by title or author…" className="inp"
            style={{ paddingLeft: 40, paddingTop: ".82rem", paddingBottom: ".82rem" }} />
          {search && <button onClick={()=>setSearch("")} style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", color:"var(--c-muted)", cursor:"pointer", display:"flex" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>}
        </div>

        <div style={{ display: "flex", gap: "1.75rem" }} className="books-layout">
          {/* Sidebar */}
          <aside className="hide-mobile" style={{ width: 195, flexShrink: 0 }}>
            <div style={{ position: "sticky", top: 76, background: "var(--c-surface)", border: "1px solid var(--c-border)", borderRadius: 12, padding: "1rem", overflow: "hidden" }}>
              <p style={{ fontSize: ".7rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--c-faint)", marginBottom: 8, padding: "0 4px" }}>Categories</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {CATS.map(c => {
                  const n = c === "All" ? books.length : books.filter(b=>b.category===c).length;
                  return (
                    <button key={c} onClick={()=>setCategory(c)} className={`filter-btn ${cat===c?"active":""}`}>
                      <span>{ICONS[c]}</span><span style={{flex:1}}>{c}</span>
                      <span style={{ fontSize:".7rem", padding:"1px 6px", borderRadius:99, background: cat===c?"rgba(79,57,246,.2)":"rgba(255,255,255,.05)", color: cat===c?"#a78bfa":"var(--c-faint)" }}>{n}</span>
                    </button>
                  );
                })}
              </div>
              <div style={{ marginTop:"1rem", paddingTop:"1rem", borderTop:"1px solid var(--c-border)" }}>
                <p style={{ fontSize:".7rem", color:"var(--c-faint)", textTransform:"uppercase", letterSpacing:".08em", marginBottom:8 }}>Stats</p>
                {[["Total", books.length, "#a78bfa"],["Showing", filtered.length, "#06b6d4"]].map(([l,v,c])=>(
                  <div key={String(l)} style={{ display:"flex", justifyContent:"space-between", fontSize:".8rem", marginBottom:4 }}>
                    <span style={{color:"var(--c-muted)"}}>{l}</span>
                    <span style={{color:String(c),fontWeight:600}}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Mobile pills */}
          <div className="show-mobile" style={{ width:"100%", marginBottom:"1rem", display:"flex", gap:8, overflowX:"auto", paddingBottom:4 }}>
            {CATS.map(c=>(
              <button key={c} onClick={()=>setCategory(c)} style={{ flexShrink:0, padding:"6px 14px", borderRadius:99, fontSize:".8rem", fontWeight:500, cursor:"pointer", border:"none", background: cat===c?"linear-gradient(87.40deg,#4f39f6,#9514fa)":"var(--c-surface2)", color: cat===c?"#fff":"var(--c-muted)", transition:"all .18s" }}>
                {ICONS[c]} {c}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div style={{ flex:1, minWidth:0 }}>
            {loading ? (
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(190px,1fr))", gap:18 }}>
                {[...Array(9)].map((_,i)=><div key={i} className="shimmer" style={{height:280}}/>)}
              </div>
            ) : filtered.length === 0 ? (
              <div style={{ textAlign:"center", padding:"5rem 0" }}>
                <div style={{fontSize:"3.5rem",marginBottom:"1rem"}}>🔍</div>
                <h3 className="serif" style={{fontSize:"1.4rem",color:"var(--c-text)",marginBottom:8}}>No books found</h3>
                <p style={{color:"var(--c-muted)",marginBottom:"1.25rem",fontSize:".9rem"}}>Try adjusting your search or filter.</p>
                <button onClick={()=>{setSearch("");setCategory("All");}} className="btn btn-fill" style={{padding:".6rem 1.4rem"}}>Reset</button>
              </div>
            ) : (
              <>
                <p style={{color:"var(--c-faint)",fontSize:".8rem",marginBottom:"1rem"}}>
                  Showing <span style={{color:"#a78bfa",fontWeight:600}}>{filtered.length}</span> result{filtered.length!==1?"s":""}
                  {search && <> for <em style={{color:"var(--c-text)"}}> "{search}"</em></>}
                  {cat!=="All" && <> in <span style={{color:"#06b6d4"}}>{cat}</span></>}
                </p>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(190px,1fr))", gap:18 }}>
                  {filtered.map((b,i)=><BookCard key={b.id} book={b} index={i}/>)}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width:767px){.books-layout{flex-direction:column!important;}}
      `}</style>
    </div>
  );
}

export default function BooksPage() {
  return (
    <Suspense fallback={<div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{color:"var(--c-muted)"}}>Loading…</span></div>}>
      <BooksContent />
    </Suspense>
  );
}
