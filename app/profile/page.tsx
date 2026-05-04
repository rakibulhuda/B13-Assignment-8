"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import Link from "next/link";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session?.user) router.push("/login?redirect=/profile");
  }, [session, isPending, router]);

  const logout = async () => {
    await signOut();
    toast.success("Logged out");
    router.push("/");
  };

  if (isPending) return (
    <div className="wrap" style={{ paddingTop:"3rem", paddingBottom:"4rem", display:"flex", flexDirection:"column", gap:16 }}>
      <div className="shimmer" style={{height:180,borderRadius:14}}/>
      <div className="shimmer" style={{height:120,borderRadius:14}}/>
    </div>
  );

  if (!session?.user) return null;

  const u = session.user;
  const joined = new Date(u.createdAt || Date.now()).toLocaleDateString("en-US", { year:"numeric", month:"long", day:"numeric" });

  return (
    <div style={{ minHeight:"100vh", paddingBottom:"4rem" }}>
      <div className="wrap" style={{ paddingTop:"2.5rem", maxWidth:760, marginInline:"auto" }}>
        <div style={{ marginBottom:"2rem" }}>
          <span className="label" style={{ color:"var(--c-primary)" }}>Account</span>
          <h1 className="serif" style={{ fontSize:"clamp(1.8rem,4vw,2.4rem)", fontWeight:700, color:"var(--c-text)" }}>My Profile</h1>
        </div>

        {/* Main card */}
        <div className="card" style={{ padding:"1.75rem", marginBottom:"1rem" }}>
          <div style={{ display:"flex", flexWrap:"wrap", alignItems:"flex-start", gap:"1.5rem" }}>
            <div style={{ position:"relative", flexShrink:0 }}>
              {u.image
                ? <img src={u.image} style={{ width:80,height:80,borderRadius:14,objectFit:"cover",border:"2px solid rgba(79,57,246,.45)" }} alt="" />
                : <div className="grad-bg" style={{ width:80,height:80,borderRadius:14,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"2rem",fontWeight:700,color:"#fff" }}>
                    {(u.name||u.email||"U")[0].toUpperCase()}
                  </div>
              }
              <span style={{ position:"absolute",bottom:-4,right:-4,width:18,height:18,borderRadius:"50%",background:"#34d399",border:"3px solid var(--c-surface)" }}/>
            </div>

            <div style={{ flex:1, minWidth:160 }}>
              <h2 style={{ fontSize:"1.25rem", fontWeight:700, color:"var(--c-text)", marginBottom:3 }}>{u.name || "Anonymous Reader"}</h2>
              <p style={{ color:"var(--c-muted)", fontSize:".85rem", marginBottom:3 }}>{u.email}</p>
              <p style={{ color:"var(--c-faint)", fontSize:".78rem", marginBottom:"0.75rem" }}>Member since {joined}</p>
              <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                <span className="badge badge-tech">Active Reader</span>
                {u.emailVerified && <span className="badge badge-science">Verified ✓</span>}
              </div>
            </div>

            <div style={{ display:"flex", flexDirection:"column", gap:8, flexShrink:0 }}>
              <Link href="/profile/update" className="btn btn-fill" style={{ padding:".55rem 1.1rem", fontSize:".82rem" }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                Update Info
              </Link>
              <button onClick={logout} style={{ display:"inline-flex",alignItems:"center",gap:6,padding:".55rem 1.1rem",borderRadius:9,fontFamily:"Inter,sans-serif",fontSize:".82rem",fontWeight:600,cursor:"pointer",background:"transparent",border:"1.5px solid #f87171",color:"#f87171",transition:"all .2s" }}
                onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background="#f87171";(e.currentTarget as HTMLElement).style.color="#fff";}}
                onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background="transparent";(e.currentTarget as HTMLElement).style.color="#f87171";}}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Info */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(190px,1fr))", gap:10, marginBottom:"1rem" }}>
          {[["👤","Name",u.name||"Not set"],["✉️","Email",u.email],["🛡","Status",u.emailVerified?"Verified ✓":"Unverified"],["📅","Joined",joined]].map(([ic,l,v])=>(
            <div key={String(l)} className="glass" style={{ borderRadius:10, padding:".9rem 1rem" }}>
              <div style={{fontSize:"1.1rem",marginBottom:4}}>{ic}</div>
              <div style={{color:"var(--c-faint)",fontSize:".68rem",textTransform:"uppercase",letterSpacing:".06em",marginBottom:2}}>{l}</div>
              <div style={{color:"var(--c-text)",fontSize:".82rem",fontWeight:500,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{v}</div>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div className="card" style={{ padding:"1.5rem" }}>
          <h3 style={{ fontSize:".95rem", fontWeight:600, color:"var(--c-text)", marginBottom:"1rem" }}>Quick Actions</h3>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(130px,1fr))", gap:10 }}>
            {[["📚","Browse Library","/books","#7c6af7"],["✏️","Edit Profile","/profile/update","#06b6d4"],["💻","Tech Books","/books?category=Tech","#f59e0b"]].map(([ic,l,h,c])=>(
              <Link key={String(l)} href={String(h)} style={{ textDecoration:"none" }}>
                <div style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:7,padding:"1rem .75rem",borderRadius:10,background:`${c}0d`,border:`1px solid ${c}22`,cursor:"pointer",transition:"transform .2s,border-color .2s",textAlign:"center" }}
                  onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.transform="translateY(-3px)";(e.currentTarget as HTMLElement).style.borderColor=String(c);}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.transform="none";(e.currentTarget as HTMLElement).style.borderColor=`${c}22`;}}>
                  <span style={{fontSize:"1.6rem"}}>{ic}</span>
                  <span style={{fontSize:".75rem",fontWeight:500,color:String(c)}}>{l}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
