import { useState } from "react";

// ============================================================
// DATA
// ============================================================
const DAYS = [
  { label: "L", date: 9 },
  { label: "M", date: 10, today: true },
  { label: "X", date: 11 },
  { label: "J", date: 12 },
  { label: "V", date: 13 },
  { label: "S", date: 14 },
  { label: "D", date: 15 },
];
const TIMES = ["07:00","08:00","09:10","18:00","19:00","20:00","21:00"];
const AVATARS = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&h=60&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=60&h=60&fit=crop&crop=face",
];
const COACH = "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=80&h=80&fit=crop&crop=face";
const USER_AVATAR = AVATARS[0];

const INITIAL_CLASSES = [
  { id:1, name:"Calistenia", time:"07:00", coach:"Guille", spots:10, taken:7, status:"finished", color:"#c8ff00", attendees:[AVATARS[0],AVATARS[1],AVATARS[2],AVATARS[3],null,null,null] },
  { id:2, name:"Calistenia", time:"08:00", coach:"Guille", spots:10, taken:3, status:"available", color:"#c8ff00", attendees:[AVATARS[4],AVATARS[5],null,null,null,null,null] },
  { id:3, name:"E. Híbrido", time:"09:10", coach:"Guille", spots:12, taken:9, status:"available", color:"#d4a5ff", attendees:[AVATARS[0],AVATARS[1],AVATARS[2],null,null,null] },
  { id:4, name:"Funcional", time:"18:00", coach:"Guille", spots:10, taken:10, status:"full", color:"#ff9d5c", attendees:[AVATARS[3],AVATARS[4],AVATARS[5]] },
  { id:5, name:"Calistenia", time:"20:00", coach:"Guille", spots:10, taken:6, status:"booked", color:"#c8ff00", attendees:[AVATARS[0],AVATARS[2],null,null] },
  { id:6, name:"Endurance", time:"21:00", coach:"Guille", spots:10, taken:4, status:"available", color:"#5ce1e6", attendees:[AVATARS[1],null,null,null] },
];

const USERS = [
  { id:1, name:"Sandra García", email:"sandra@email.com", avatar:AVATARS[0], plan:"Ilimitado", planColor:"#c8ff00", paid:true, reservations:5 },
  { id:2, name:"Carlos Martínez", email:"carlos@email.com", avatar:AVATARS[1], plan:"3 clases/sem", planColor:"#d4a5ff", paid:true, reservations:3 },
  { id:3, name:"Ana López", email:"ana@email.com", avatar:AVATARS[2], plan:"2 clases/sem", planColor:"#ff9d5c", paid:false, reservations:0 },
  { id:4, name:"Miguel Torres", email:"miguel@email.com", avatar:AVATARS[5], plan:"Ilimitado", planColor:"#c8ff00", paid:true, reservations:8 },
  { id:5, name:"Laura Sánchez", email:"laura@email.com", avatar:AVATARS[4], plan:"3 clases/sem", planColor:"#d4a5ff", paid:true, reservations:2 },
  { id:6, name:"Pedro Ruiz", email:"pedro@email.com", avatar:AVATARS[3], plan:"2 clases/sem", planColor:"#ff9d5c", paid:true, reservations:1 },
];

const PLANS = [
  { id:1, name:"Ilimitado", price:75, color:"#c8ff00", limit:"∞", desc:"Clases ilimitadas", users:12 },
  { id:2, name:"3 clases/sem", price:65, color:"#d4a5ff", limit:"3/sem", desc:"Máximo 3 reservas por semana", users:8 },
  { id:3, name:"2 clases/sem", price:50, color:"#ff9d5c", limit:"2/sem", desc:"Máximo 2 reservas por semana", users:5 },
];

const NOTIFICATIONS = [
  { id:1, text:"Se ha liberado una plaza en Calistenia 20:00", time:"Hace 5 min", read:false, type:"spot", color:"#c8ff00" },
  { id:2, text:"Tu clase de Funcional empieza en 1 hora", time:"Hace 45 min", read:false, type:"reminder", color:"#ff9d5c" },
  { id:3, text:"La clase de Endurance mañana 21:00 ha sido cancelada", time:"Hace 2h", read:false, type:"cancel", color:"#ff4d4d" },
  { id:4, text:"Nueva clase disponible: TGS sábado 08:30", time:"Ayer", read:true, type:"new", color:"#5ce1e6" },
  { id:5, text:"¡Has completado 5 clases este mes!", time:"Hace 2 días", read:true, type:"achievement", color:"#d4a5ff" },
];

const CLASS_TYPES = ["Calistenia","E. Híbrido","Funcional","Endurance","TGS"];

// ============================================================
// ICONS
// ============================================================
const Icons = {
  home: (c="#888") => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  calendar: (c="#888") => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  chart: (c="#888") => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="12" width="4" height="9" rx="1"/><rect x="10" y="6" width="4" height="15" rx="1"/><rect x="17" y="3" width="4" height="18" rx="1"/></svg>,
  user: (c="#888") => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  back: (c="#888") => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>,
  bell: (c="#888") => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  filter: (c="#c8ff00") => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/><circle cx="8" cy="6" r="2" fill={c}/><circle cx="16" cy="12" r="2" fill={c}/><circle cx="10" cy="18" r="2" fill={c}/></svg>,
  gear: (c="#888") => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  plus: (c="#c8ff00") => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  edit: (c="#666") => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  search: (c="#666") => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  chevron: (c="#555") => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>,
};

const LogoSVG = ({size=56}) => (
  <svg width={size} height={size*0.75} viewBox="0 0 140 100" fill="#c8ff00">
    <path d="M6 88 L42 12 L78 88 Z M42 30 L26 66 L58 66 Z" fillRule="evenodd"/>
    <path d="M52 88 L76 36 L100 88 Z M76 54 L66 74 L86 74 Z" fillRule="evenodd"/>
    <path d="M82 88 L106 36 L134 88 Z M106 54 L96 74 L116 74 Z" fillRule="evenodd"/>
  </svg>
);

// ============================================================
// SHARED COMPONENTS
// ============================================================
const StatusBar = () => (
  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 28px 0",fontSize:15,fontWeight:600,color:"#fff"}}>
    <span>9:41</span>
    <div style={{width:125,height:34,background:"#000",borderRadius:20,position:"absolute",top:8,left:"50%",transform:"translateX(-50%)"}}/>
    <div style={{display:"flex",gap:5,alignItems:"center"}}>
      <svg width="17" height="12" viewBox="0 0 17 12" fill="none"><rect x="0" y="7" width="3" height="5" rx="1" fill="#fff"/><rect x="4.5" y="4.5" width="3" height="7.5" rx="1" fill="#fff"/><rect x="9" y="2" width="3" height="10" rx="1" fill="#fff"/><rect x="13.5" y="0" width="3" height="12" rx="1" fill="#fff"/></svg>
      <svg width="27" height="13" viewBox="0 0 27 13" fill="none"><rect x="0.5" y="0.5" width="22" height="12" rx="3.5" stroke="#fff" strokeOpacity="0.35"/><rect x="2" y="2" width="19" height="9" rx="2" fill="#c8ff00"/><rect x="24" y="4" width="2.5" height="5" rx="1.25" fill="#fff" fillOpacity="0.4"/></svg>
    </div>
  </div>
);

const BottomNav = ({active, onNav, isAdmin=false}) => {
  const items = isAdmin
    ? [{key:"admin-home",icon:Icons.home},{key:"admin-classes",icon:Icons.calendar},{key:"admin-users",icon:Icons.user},{key:"admin-plans",icon:Icons.chart}]
    : [{key:"home",icon:Icons.home},{key:"reservations",icon:Icons.calendar},{key:"notifications",icon:Icons.bell},{key:"profile",icon:Icons.user}];
  return (
    <div style={{position:"absolute",bottom:20,left:"50%",transform:"translateX(-50%)",background:"#1a1a1a",borderRadius:28,padding:"12px 24px",display:"flex",gap:24,alignItems:"center",border:"1px solid #252525"}}>
      {items.map(it=>(
        <div key={it.key} onClick={()=>onNav(it.key)} style={{cursor:"pointer",position:"relative",display:"flex",alignItems:"center",justifyContent:"center"}}>
          {it.icon(active===it.key?"#c8ff00":"#555")}
          {active===it.key&&<div style={{position:"absolute",top:-8,width:4,height:4,borderRadius:"50%",background:"#c8ff00"}}/>}
        </div>
      ))}
    </div>
  );
};

const Pill = ({label,active,onClick,color="#c8ff00"}) => (
  <button onClick={onClick} style={{padding:"7px 14px",borderRadius:20,border:`1.5px solid ${active?color:"#2a2a2a"}`,background:active?color+"18":"transparent",color:active?color:"#666",fontSize:12,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap",transition:"all 0.2s",fontFamily:"inherit"}}>
    {label}
  </button>
);

const MetricCard = ({label,value,accent=false}) => (
  <div style={{flex:1,background:"#161616",borderRadius:14,padding:"12px 14px",border:"1px solid #1e1e1e"}}>
    <div style={{fontSize:10,color:"#666",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.5px",marginBottom:4}}>{label}</div>
    <div style={{fontSize:15,fontWeight:700,color:accent?"#c8ff00":"#fff"}}>{value}</div>
  </div>
);

const SpotRing = ({taken,spots,size=36}) => {
  const pct=(taken/spots)*100;const full=taken>=spots;
  return (
    <div style={{width:size,height:size,borderRadius:"50%",background:`conic-gradient(${full?"#ff4d4d":"#c8ff00"} ${pct}%, #2a2a2a ${pct}%)`,display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{width:size-10,height:size-10,borderRadius:"50%",background:"#161616",display:"flex",alignItems:"center",justifyContent:"center",fontSize:size>30?10:8,fontWeight:700,color:full?"#ff4d4d":"#c8ff00"}}>{taken}/{spots}</div>
    </div>
  );
};

// ============================================================
// SCREEN: LOGIN
// ============================================================
const LoginScreen = ({onLogin}) => {
  const [email,setEmail]=useState("");const [pw,setPw]=useState("");const [show,setShow]=useState(false);const [focused,setFocused]=useState(null);const [err,setErr]=useState("");const [loading,setLoading]=useState(false);
  const go=()=>{if(!email||!pw){setErr("Introduce tu email y contraseña");return;}setErr("");setLoading(true);setTimeout(()=>{setLoading(false);onLogin();},1200);};
  const Field=({icon,placeholder,value,onChange,type="text",name})=>(
    <div style={{background:"#161616",borderRadius:14,padding:"0 16px",display:"flex",alignItems:"center",gap:12,height:54,border:`1.5px solid ${focused===name?"#c8ff00":err&&!value?"#ff4d4d44":"#222"}`,transition:"border-color .25s"}}>
      <div style={{flexShrink:0}}>{icon}</div>
      <input type={name==="pw"&&!show?"password":type} placeholder={placeholder} value={value} onChange={e=>{onChange(e.target.value);setErr("");}} onFocus={()=>setFocused(name)} onBlur={()=>setFocused(null)} style={{background:"transparent",border:"none",outline:"none",color:"#fff",fontSize:15,fontWeight:500,width:"100%",fontFamily:"inherit"}}/>
      {name==="pw"&&<div onClick={()=>setShow(!show)} style={{cursor:"pointer",flexShrink:0}}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{show?<><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>:<><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></>}</svg></div>}
    </div>
  );
  const mailIcon=<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={focused==="email"?"#c8ff00":"#444"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{transition:"stroke .25s"}}><rect x="2" y="4" width="20" height="16" rx="3"/><polyline points="22,4 12,13 2,4"/></svg>;
  const lockIcon=<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={focused==="pw"?"#c8ff00":"#444"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{transition:"stroke .25s"}}><rect x="3" y="11" width="18" height="11" rx="3"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;
  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"space-between",height:"100%",padding:"0 28px 40px"}}>
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",width:"100%",marginTop:50}}>
        <div style={{width:100,height:100,borderRadius:"50%",background:"#161616",border:"2px solid #2a2a2a",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:22,position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",width:60,height:60,borderRadius:"50%",background:"radial-gradient(circle,rgba(200,255,0,0.08) 0%,transparent 70%)",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}}/>
          <LogoSVG size={56}/>
        </div>
        <div style={{fontSize:11,fontWeight:600,color:"#c8ff00",letterSpacing:5,textTransform:"uppercase",marginBottom:4}}>Center</div>
        <div style={{fontSize:24,fontWeight:800,color:"#fff",letterSpacing:"0.5px",marginBottom:6}}>Athlete Center</div>
        <div style={{fontSize:13,color:"#555",fontWeight:500,marginBottom:44}}>Tu entreno, tu ritmo</div>
        <div style={{width:"100%",display:"flex",flexDirection:"column",gap:12}}>
          <Field icon={mailIcon} placeholder="Email" value={email} onChange={setEmail} name="email"/>
          <Field icon={lockIcon} placeholder="Contraseña" value={pw} onChange={setPw} name="pw"/>
          {err&&<div style={{fontSize:12,color:"#ff4d4d",fontWeight:500,textAlign:"center"}}>{err}</div>}
          <button onClick={go} disabled={loading} style={{width:"100%",height:54,borderRadius:14,border:"none",background:loading?"#8a9900":"#c8ff00",color:"#111",fontSize:15,fontWeight:700,letterSpacing:"1.5px",textTransform:"uppercase",cursor:loading?"wait":"pointer",marginTop:6,transition:"all .25s",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"inherit",boxShadow:loading?"none":"0 4px 20px rgba(200,255,0,0.15)"}}>
            {loading?<div style={{width:20,height:20,border:"2.5px solid #111",borderTopColor:"transparent",borderRadius:"50%",animation:"spin .8s linear infinite"}}/>:"Entrar"}
          </button>
          <div style={{textAlign:"center",marginTop:4}}><span style={{fontSize:13,color:"#555",fontWeight:500,cursor:"pointer",borderBottom:"1px solid #333",paddingBottom:1}}>¿Olvidaste tu contraseña?</span></div>
        </div>
      </div>
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:16}}>
        <div style={{display:"flex",alignItems:"center",gap:14,width:"100%",padding:"0 20px"}}><div style={{flex:1,height:1,background:"#222"}}/><span style={{fontSize:11,color:"#444",fontWeight:500,textTransform:"uppercase",letterSpacing:1}}>o continúa con</span><div style={{flex:1,height:1,background:"#222"}}/></div>
        <div style={{display:"flex",gap:12}}>
          {[<svg key="g" width="20" height="20" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>,
            <svg key="a" width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
          ].map((ic,i)=><div key={i} style={{width:52,height:52,borderRadius:16,background:"#161616",border:"1.5px solid #222",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>{ic}</div>)}
        </div>
        <div style={{fontSize:11,color:"#333",fontWeight:500,letterSpacing:"0.3px"}}>Powered by <span style={{color:"#c8ff00",fontWeight:600,opacity:0.4}}>madebydiego.ai</span></div>
      </div>
    </div>
  );
};

// ============================================================
// SCREEN: HOME
// ============================================================
const HomeScreen = ({onNav,classes}) => {
  const booked = classes.find(c=>c.status==="booked");
  return (
    <div style={{padding:"20px 20px",overflowY:"auto",height:"100%",paddingBottom:100}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <img src={USER_AVATAR} alt="" style={{width:48,height:48,borderRadius:"50%",objectFit:"cover",border:"2px solid #2a2a2a"}}/>
          <div><div style={{fontSize:18,fontWeight:700,color:"#fff",letterSpacing:"-0.3px"}}>Hola, Sandra</div><div style={{fontSize:13,color:"#666",fontWeight:500}}>martes 10 de marzo</div></div>
        </div>
        <div onClick={()=>onNav("notifications")} style={{width:42,height:42,borderRadius:14,background:"#1a1a1a",border:"1px solid #2a2a2a",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",position:"relative"}}>
          {Icons.bell("#888")}
          <div style={{position:"absolute",top:8,right:8,width:8,height:8,borderRadius:"50%",background:"#c8ff00"}}/>
        </div>
      </div>
      {booked&&(
        <div onClick={()=>onNav("reservations")} style={{background:"#161616",borderRadius:20,padding:"18px 18px",borderLeft:"4px solid #c8ff00",marginBottom:20,cursor:"pointer"}}>
          <div style={{fontSize:10,fontWeight:600,color:"#c8ff00",textTransform:"uppercase",letterSpacing:2,marginBottom:6}}>Próxima clase</div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div>
              <div style={{fontSize:22,fontWeight:800,color:"#fff",textTransform:"uppercase"}}>{booked.name}</div>
              <div style={{fontSize:13,color:"#888",marginTop:2}}>{booked.time} — {booked.coach}</div>
            </div>
            <SpotRing taken={booked.taken} spots={booked.spots} size={44}/>
          </div>
        </div>
      )}
      <div style={{display:"flex",gap:8,marginBottom:20}}>
        <MetricCard label="Tu tarifa" value="Ilimitado" accent/>
        <MetricCard label="Esta semana" value={<>3 <span style={{color:"#444",fontWeight:500}}>clases</span></>}/>
        <MetricCard label="Este mes" value={<>5 <span style={{color:"#444",fontWeight:500}}>total</span></>}/>
      </div>
      <button onClick={()=>onNav("reservations")} style={{width:"100%",height:54,borderRadius:14,border:"none",background:"#c8ff00",color:"#111",fontSize:15,fontWeight:700,letterSpacing:"1px",textTransform:"uppercase",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8,fontFamily:"inherit",boxShadow:"0 4px 20px rgba(200,255,0,0.15)",marginBottom:24}}>
        {Icons.calendar("#111")} Reservar Clase
      </button>
      <div style={{fontSize:10,fontWeight:600,color:"#555",textTransform:"uppercase",letterSpacing:1,marginBottom:10}}>Clases de hoy</div>
      {classes.filter(c=>c.status!=="finished").map(c=>(
        <div key={c.id} onClick={()=>onNav("reservations")} style={{background:"#161616",borderRadius:14,padding:"12px 14px",marginBottom:8,display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer",borderLeft:`3px solid ${c.color}`}}>
          <div><div style={{fontSize:14,fontWeight:700,color:"#fff"}}>{c.name}</div><div style={{fontSize:12,color:"#666"}}>{c.time}</div></div>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <SpotRing taken={c.taken} spots={c.spots} size={30}/>
            {c.status==="booked"&&<div style={{fontSize:10,fontWeight:600,color:"#c8ff00",background:"#c8ff0018",padding:"3px 8px",borderRadius:8}}>✓ Reservada</div>}
            {c.status==="full"&&<div style={{fontSize:10,fontWeight:600,color:"#ff4d4d",background:"#ff4d4d18",padding:"3px 8px",borderRadius:8}}>Llena</div>}
          </div>
        </div>
      ))}
    </div>
  );
};

// ============================================================
// SCREEN: RESERVATIONS
// ============================================================
const ReservationsScreen = ({classes,setClasses}) => {
  const [day,setDay]=useState(10);const [time,setTime]=useState(null);
  const filtered=time?classes.filter(c=>c.time===time):classes;
  const book=id=>setClasses(prev=>prev.map(c=>{if(c.id!==id)return c;if(c.status==="available")return{...c,status:"booked",taken:c.taken+1};if(c.status==="booked")return{...c,status:"available",taken:c.taken-1};return c;}));
  const statusCfg={finished:{label:"Finalizada",bg:"#2a2a2a",color:"#666",border:"#333"},available:{label:"Reservar",bg:"#c8ff00",color:"#111",border:"#c8ff00"},full:{label:"Lista de espera",bg:"#2a2a2a",color:"#ff9d5c",border:"#ff9d5c"},booked:{label:"Cancelar reserva",bg:"#1a1a2e",color:"#ff4d4d",border:"#ff4d4d44"}};
  return (
    <div style={{overflowY:"auto",height:"100%",paddingBottom:100}}>
      <div style={{padding:"20px 20px 0",display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
        <div><div style={{fontSize:11,color:"#c8ff00",fontWeight:600,textTransform:"uppercase",letterSpacing:2,marginBottom:2}}>Reservas</div><div style={{fontSize:26,fontWeight:800,color:"#fff",letterSpacing:"-0.5px"}}>Hoy, martes 10/03</div></div>
        <div style={{width:42,height:42,borderRadius:14,background:"#1a1a1a",border:"1px solid #2a2a2a",display:"flex",alignItems:"center",justifyContent:"center"}}>{Icons.filter()}</div>
      </div>
      <div style={{display:"flex",alignItems:"center",padding:"12px 12px",margin:"0 16px",background:"#161616",borderRadius:18,marginBottom:12}}>
        <button style={{background:"none",border:"none",color:"#555",fontSize:18,cursor:"pointer",padding:"0 4px"}}>‹</button>
        {DAYS.map(d=>(
          <div key={d.date} onClick={()=>setDay(d.date)} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4,cursor:"pointer",padding:"6px 0",borderRadius:14,background:day===d.date?"#c8ff00":"transparent",transition:"all .25s"}}>
            <span style={{fontSize:11,fontWeight:600,color:day===d.date?"#111":"#666",textTransform:"uppercase"}}>{d.label}</span>
            <span style={{fontSize:16,fontWeight:700,color:day===d.date?"#111":"#fff"}}>{d.date}</span>
            {d.today&&day!==d.date&&<div style={{width:4,height:4,borderRadius:"50%",background:"#c8ff00",marginTop:-2}}/>}
          </div>
        ))}
        <button style={{background:"none",border:"none",color:"#555",fontSize:18,cursor:"pointer",padding:"0 4px"}}>›</button>
      </div>
      <div style={{display:"flex",gap:6,padding:"0 20px",marginBottom:18,overflowX:"auto"}}>
        <Pill label="Todas" active={!time} onClick={()=>setTime(null)}/>
        {TIMES.map(t=><Pill key={t} label={t} active={time===t} onClick={()=>setTime(time===t?null:t)}/>)}
      </div>
      <div style={{display:"flex",gap:8,padding:"0 20px",marginBottom:16}}>
        <MetricCard label="Tu tarifa" value="Ilimitado" accent/>
        <MetricCard label="Reservas hoy" value={<>1 <span style={{color:"#444",fontWeight:500}}>clase</span></>}/>
        <MetricCard label="Este mes" value={<>5 <span style={{color:"#444",fontWeight:500}}>total</span></>}/>
      </div>
      <div style={{padding:"0 20px",display:"flex",flexDirection:"column",gap:10}}>
        <div style={{fontSize:14,fontWeight:600,color:"#555",textTransform:"uppercase",letterSpacing:1,marginBottom:2}}>{filtered.length} clase{filtered.length!==1?"s":""}</div>
        {filtered.map(cls=>{const s=statusCfg[cls.status];return(
          <div key={cls.id} style={{background:"#161616",borderRadius:20,padding:"18px 18px 14px",border:`1px solid ${cls.status==="finished"?"#222":cls.color+"33"}`,opacity:cls.status==="finished"?0.5:1}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <div style={{width:4,height:40,borderRadius:4,background:cls.color}}/>
                <div>
                  <div style={{fontSize:20,fontWeight:800,color:"#fff",letterSpacing:"-0.5px",textTransform:"uppercase"}}>{cls.name}</div>
                  <div style={{display:"flex",alignItems:"center",gap:6,marginTop:3}}><img src={COACH} alt="" style={{width:18,height:18,borderRadius:"50%",objectFit:"cover"}}/><span style={{fontSize:12,color:"#888",fontWeight:500}}>{cls.coach}</span></div>
                </div>
              </div>
              <div style={{textAlign:"right"}}><div style={{fontSize:28,fontWeight:800,color:cls.color,letterSpacing:"-1px",lineHeight:1}}>{cls.time}</div><SpotRing taken={cls.taken} spots={cls.spots}/></div>
            </div>
            <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:14}}>
              {cls.attendees.map((url,i)=>url?<img key={i} src={url} alt="" style={{width:34,height:34,borderRadius:10,objectFit:"cover",border:"2px solid #222"}}/>:<div key={i} style={{width:34,height:34,borderRadius:10,background:"#1e1e1e",border:"1px dashed #333"}}/>)}
            </div>
            <button onClick={()=>book(cls.id)} disabled={cls.status==="finished"} style={{width:"100%",padding:"10px 0",borderRadius:12,border:`1.5px solid ${s.border}`,background:s.bg,color:s.color,fontSize:13,fontWeight:700,cursor:cls.status==="finished"?"default":"pointer",letterSpacing:"0.3px",textTransform:"uppercase",fontFamily:"inherit",transition:"all .2s"}}>
              {cls.status==="booked"&&"✓ "}{s.label}
            </button>
          </div>
        );})}
      </div>
    </div>
  );
};

// ============================================================
// SCREEN: PROFILE
// ============================================================
const ProfileScreen = ({onBack}) => {
  const classTypes=[{name:"Calistenia",color:"#4466FF"},{name:"E. Híbrido",color:"#34a853"},{name:"Funcional",color:"#d946ef"},{name:"Endurance",color:"#eab308"},{name:"TGS",color:"#ff9d5c"},{name:"Train your coach",color:"#1a1a1a",border:"#666"}];
  const calDays=Array.from({length:31},(_, i)=>i+1);
  const reservedDays={3:{time:"20:00",color:"#c8ff00"},4:{time:"21:00",color:"#d4a5ff"},5:{time:"20:00",color:"#c8ff00"},7:{time:"08:30",color:"#1a1a1a"},10:{time:"08:00",color:"#c8ff00"},11:{time:"21:00",color:"#d946ef"}};
  return (
    <div style={{overflowY:"auto",height:"100%",paddingBottom:100}}>
      <div style={{padding:"20px 20px 0",display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <div onClick={onBack} style={{cursor:"pointer"}}>{Icons.back("#888")}</div>
        <div style={{fontSize:16,fontWeight:700,color:"#fff"}}>Mi Perfil</div>
        <div style={{cursor:"pointer"}}>{Icons.gear()}</div>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:14,padding:"0 20px",marginBottom:20}}>
        <img src={USER_AVATAR} alt="" style={{width:64,height:64,borderRadius:"50%",objectFit:"cover",border:"2px solid #c8ff00"}}/>
        <div><div style={{fontSize:18,fontWeight:700,color:"#fff"}}>Sandra García</div><div style={{fontSize:13,color:"#666"}}>sandra@email.com</div></div>
      </div>
      <div style={{margin:"0 20px",background:"#161616",borderRadius:20,padding:"18px",marginBottom:16}}>
        <div style={{fontSize:10,fontWeight:600,color:"#c8ff00",textTransform:"uppercase",letterSpacing:2,marginBottom:10}}>Tu tarifa</div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <div style={{fontSize:24,fontWeight:800,color:"#fff"}}>Ilimitado</div>
          <div style={{fontSize:32,color:"#c8ff00",fontWeight:300}}>∞</div>
        </div>
        <div style={{fontSize:13,color:"#666",marginBottom:4}}>Pagado hasta: <span style={{color:"#fff",fontWeight:600}}>31/3/2026</span></div>
        <div style={{fontSize:12,color:"#555"}}>Periodo: 1/3/2026 - 31/3/2026</div>
        <div style={{height:1,background:"#222",margin:"14px 0"}}/>
        <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:10}}>
          {classTypes.map(ct=><span key={ct.name} style={{fontSize:11,fontWeight:600,padding:"4px 10px",borderRadius:8,background:ct.color+"22",color:ct.color,border:ct.border?`1px solid ${ct.border}`:undefined}}>{ct.name}</span>)}
        </div>
        <div style={{fontSize:12,color:"#666"}}>Has reservado <span style={{color:"#c8ff00",fontWeight:600}}>5</span> este mes</div>
      </div>
      <div style={{margin:"0 20px",background:"#161616",borderRadius:20,padding:"18px"}}>
        <div style={{fontSize:14,fontWeight:700,color:"#fff",marginBottom:12}}>marzo</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:4,textAlign:"center"}}>
          {["L","M","X","J","V","S","D"].map(d=><div key={d} style={{fontSize:10,fontWeight:600,color:"#555",paddingBottom:6}}>{d}</div>)}
          {Array(5).fill(null).map((_,i)=><div key={`e${i}`}/>)}
          {calDays.map(d=>(
            <div key={d} style={{padding:"4px 0",borderRadius:8,position:"relative",border:d===10?"1px solid #c8ff00":"1px solid transparent"}}>
              <div style={{fontSize:12,fontWeight:d===10?700:500,color:d===10?"#c8ff00":reservedDays[d]?"#fff":"#555"}}>{d}</div>
              {reservedDays[d]&&<div style={{width:6,height:6,borderRadius:"50%",background:reservedDays[d].color,margin:"2px auto 0"}}/>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================================
// SCREEN: NOTIFICATIONS
// ============================================================
const NotificationsScreen = () => {
  const [notifs,setNotifs]=useState(NOTIFICATIONS);
  const typeIcon={spot:"✓",reminder:"⏰",cancel:"✕",new:"+",achievement:"★"};
  return (
    <div style={{overflowY:"auto",height:"100%",paddingBottom:100}}>
      <div style={{padding:"20px 20px 16px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{fontSize:22,fontWeight:800,color:"#fff"}}>Notificaciones</div>
        <div style={{background:"#c8ff00",color:"#111",fontSize:11,fontWeight:700,padding:"3px 10px",borderRadius:10}}>{notifs.filter(n=>!n.read).length}</div>
      </div>
      <div style={{padding:"0 20px",display:"flex",flexDirection:"column",gap:8}}>
        {notifs.map(n=>(
          <div key={n.id} onClick={()=>setNotifs(prev=>prev.map(x=>x.id===n.id?{...x,read:true}:x))} style={{background:"#161616",borderRadius:16,padding:"14px 16px",display:"flex",gap:12,alignItems:"flex-start",cursor:"pointer",border:n.read?"1px solid #1e1e1e":`1px solid ${n.color}22`}}>
            {!n.read&&<div style={{width:6,height:6,borderRadius:"50%",background:"#c8ff00",flexShrink:0,marginTop:6}}/>}
            <div style={{width:36,height:36,borderRadius:12,background:n.color+"22",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:n.color,fontWeight:700,flexShrink:0}}>{typeIcon[n.type]}</div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:13,fontWeight:n.read?500:600,color:n.read?"#888":"#fff",lineHeight:1.4}}>{n.text}</div>
              <div style={{fontSize:11,color:"#555",marginTop:4}}>{n.time}</div>
            </div>
            {n.type==="spot"&&!n.read&&<div style={{fontSize:11,fontWeight:600,color:"#c8ff00",border:"1px solid #c8ff00",padding:"4px 10px",borderRadius:8,whiteSpace:"nowrap",flexShrink:0,marginTop:2}}>Reservar</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================================
// SCREEN: ADMIN HOME
// ============================================================
const AdminHomeScreen = ({classes,onNav}) => {
  const totalReservations=classes.reduce((a,c)=>a+c.taken,0);
  const totalSpots=classes.reduce((a,c)=>a+c.spots,0);
  const occ=Math.round(totalReservations/totalSpots*100);
  return (
    <div style={{overflowY:"auto",height:"100%",paddingBottom:100}}>
      <div style={{padding:"20px 20px 0",marginBottom:16}}>
        <div style={{fontSize:11,color:"#c8ff00",fontWeight:600,textTransform:"uppercase",letterSpacing:2,marginBottom:2}}>Admin</div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{fontSize:24,fontWeight:800,color:"#fff"}}>Panel de control</div>
          <img src={COACH} alt="" style={{width:38,height:38,borderRadius:12,objectFit:"cover",border:"2px solid #2a2a2a"}}/>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,padding:"0 20px",marginBottom:20}}>
        <MetricCard label="Clases hoy" value={<span style={{color:"#c8ff00"}}>{classes.length}</span>}/>
        <MetricCard label="Reservas hoy" value={totalReservations}/>
        <div style={{background:"#161616",borderRadius:14,padding:"12px 14px",border:"1px solid #1e1e1e"}}>
          <div style={{fontSize:10,color:"#666",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.5px",marginBottom:6}}>Ocupación media</div>
          <div style={{fontSize:15,fontWeight:700,color:"#c8ff00",marginBottom:6}}>{occ}%</div>
          <div style={{height:4,borderRadius:2,background:"#2a2a2a"}}><div style={{height:4,borderRadius:2,background:"#c8ff00",width:`${occ}%`}}/></div>
        </div>
        <MetricCard label="Alumnos activos" value={USERS.length}/>
      </div>
      <div style={{padding:"0 20px"}}>
        <div style={{fontSize:10,fontWeight:600,color:"#c8ff00",textTransform:"uppercase",letterSpacing:1,marginBottom:10}}>Clases de hoy</div>
        {classes.map(c=>{const pct=Math.round(c.taken/c.spots*100);const full=pct>=100;return(
          <div key={c.id} style={{background:"#161616",borderRadius:12,padding:"12px 14px",marginBottom:6,border:"1px solid #1e1e1e"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
              <div style={{display:"flex",alignItems:"center",gap:8}}><div style={{width:3,height:20,borderRadius:3,background:c.color}}/><span style={{fontSize:13,fontWeight:700,color:"#fff"}}>{c.name} {c.time}</span></div>
              <span style={{fontSize:12,fontWeight:600,color:full?"#ff4d4d":"#888"}}>{full?"LLENA":c.taken+"/"+c.spots}</span>
            </div>
            <div style={{height:4,borderRadius:2,background:"#2a2a2a"}}><div style={{height:4,borderRadius:2,background:full?"#ff4d4d":c.color,width:`${pct}%`,transition:"width .3s"}}/></div>
          </div>
        );})}
        <div style={{background:"#161616",borderRadius:14,padding:"14px",marginTop:12,border:"1px solid #ff9d5c33",display:"flex",alignItems:"center",gap:10}}>
          <div style={{fontSize:18}}>⚠️</div>
          <div style={{fontSize:13,color:"#fff"}}><span style={{fontWeight:700,color:"#ff9d5c"}}>3 pagos pendientes</span> de renovación</div>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// SCREEN: ADMIN CLASSES
// ============================================================
const AdminClassesScreen = ({classes,onBack}) => {
  const [activeDay,setActiveDay]=useState("L");
  return (
    <div style={{overflowY:"auto",height:"100%",paddingBottom:100}}>
      <div style={{padding:"20px 20px 0",display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
        <div onClick={onBack} style={{cursor:"pointer"}}>{Icons.back("#888")}</div>
        <div style={{fontSize:16,fontWeight:700,color:"#fff"}}>Clases y Horarios</div>
        <div style={{width:36,height:36,borderRadius:12,background:"#c8ff00",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>{Icons.plus("#111")}</div>
      </div>
      <div style={{display:"flex",gap:6,padding:"0 20px",marginBottom:16}}>
        {["L","M","X","J","V","S"].map(d=><Pill key={d} label={d} active={activeDay===d} onClick={()=>setActiveDay(d)}/>)}
      </div>
      <div style={{padding:"0 20px",display:"flex",flexDirection:"column",gap:8}}>
        {classes.map(c=>(
          <div key={c.id} style={{background:"#161616",borderRadius:16,padding:"16px",borderLeft:`4px solid ${c.color}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div>
              <div style={{fontSize:16,fontWeight:700,color:"#fff",textTransform:"uppercase"}}>{c.name}</div>
              <div style={{fontSize:13,color:"#666",marginTop:2}}>{c.time} — {parseInt(c.time.split(":")[0])+1}:00</div>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <div style={{fontSize:13,fontWeight:600,color:c.color}}>{c.spots} plazas</div>
              <div style={{cursor:"pointer"}}>{Icons.edit()}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================================
// SCREEN: ADMIN USERS
// ============================================================
const AdminUsersScreen = ({onBack}) => {
  const [search,setSearch]=useState("");const [filter,setFilter]=useState("Todos");
  const filtered=USERS.filter(u=>{
    if(search&&!u.name.toLowerCase().includes(search.toLowerCase()))return false;
    if(filter==="Pendiente")return!u.paid;if(filter!=="Todos")return u.plan===filter;return true;
  });
  return (
    <div style={{overflowY:"auto",height:"100%",paddingBottom:100}}>
      <div style={{padding:"20px 20px 0",display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
        <div onClick={onBack} style={{cursor:"pointer"}}>{Icons.back("#888")}</div>
        <div style={{display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:16,fontWeight:700,color:"#fff"}}>Usuarios</span><span style={{background:"#c8ff00",color:"#111",fontSize:11,fontWeight:700,padding:"2px 8px",borderRadius:8}}>{USERS.length}</span></div>
        <div style={{width:22}}/>
      </div>
      <div style={{margin:"0 20px 12px",background:"#161616",borderRadius:14,padding:"0 14px",display:"flex",alignItems:"center",gap:10,height:44,border:"1px solid #222"}}>
        {Icons.search()}
        <input placeholder="Buscar alumno..." value={search} onChange={e=>setSearch(e.target.value)} style={{background:"transparent",border:"none",outline:"none",color:"#fff",fontSize:14,fontWeight:500,width:"100%",fontFamily:"inherit"}}/>
      </div>
      <div style={{display:"flex",gap:6,padding:"0 20px",marginBottom:14,overflowX:"auto"}}>
        {["Todos","Ilimitado","3 clases/sem","2 clases/sem","Pendiente"].map(f=><Pill key={f} label={f} active={filter===f} onClick={()=>setFilter(f)} color={f==="Pendiente"?"#ff4d4d":"#c8ff00"}/>)}
      </div>
      <div style={{padding:"0 20px",display:"flex",flexDirection:"column",gap:6}}>
        {filtered.map(u=>(
          <div key={u.id} style={{background:"#161616",borderRadius:14,padding:"12px 14px",display:"flex",alignItems:"center",gap:12}}>
            <img src={u.avatar} alt="" style={{width:40,height:40,borderRadius:"50%",objectFit:"cover",border:"2px solid #222"}}/>
            <div style={{flex:1,minWidth:0}}>
              <div style={{display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:14,fontWeight:600,color:"#fff"}}>{u.name}</span><span style={{fontSize:10,fontWeight:600,padding:"2px 8px",borderRadius:6,background:u.planColor+"22",color:u.planColor}}>{u.plan}</span></div>
              <div style={{fontSize:12,color:"#555",marginTop:2}}>{u.reservations} reservas</div>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:6}}>
              <div style={{width:8,height:8,borderRadius:"50%",background:u.paid?"#34a853":"#ff4d4d"}}/>
              {Icons.chevron()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================================
// SCREEN: ADMIN PLANS
// ============================================================
const AdminPlansScreen = ({onBack}) => (
  <div style={{overflowY:"auto",height:"100%",paddingBottom:100}}>
    <div style={{padding:"20px 20px 0",display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
      <div onClick={onBack} style={{cursor:"pointer"}}>{Icons.back("#888")}</div>
      <div style={{fontSize:16,fontWeight:700,color:"#fff"}}>Tarifas</div>
      <div style={{width:36,height:36,borderRadius:12,background:"#c8ff00",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>{Icons.plus("#111")}</div>
    </div>
    <div style={{padding:"0 20px",display:"flex",flexDirection:"column",gap:12}}>
      {PLANS.map(p=>(
        <div key={p.id} style={{background:"#161616",borderRadius:20,padding:"20px",borderTop:`4px solid ${p.color}`}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
            <div>
              <div style={{fontSize:20,fontWeight:800,color:p.color,textTransform:"uppercase"}}>{p.name}</div>
              <div style={{fontSize:24,fontWeight:700,color:"#fff",marginTop:4}}>{p.price}€<span style={{fontSize:14,color:"#666",fontWeight:500}}>/mes</span></div>
            </div>
            <div style={{fontSize:36,fontWeight:300,color:p.color,opacity:0.3}}>{p.limit==="∞"?"∞":""}</div>
          </div>
          <div style={{fontSize:13,color:"#888",marginBottom:14}}>{p.desc}</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:14}}>
            {CLASS_TYPES.map(ct=><span key={ct} style={{fontSize:10,fontWeight:600,padding:"3px 8px",borderRadius:6,background:"#2a2a2a",color:"#888"}}>{ct}</span>)}
          </div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div style={{fontSize:12,color:"#666"}}><span style={{color:"#fff",fontWeight:600}}>{p.users}</span> alumnos</div>
            <div style={{fontSize:12,fontWeight:600,color:"#888",border:"1px solid #333",padding:"6px 14px",borderRadius:10,cursor:"pointer"}}>Editar</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ============================================================
// MAIN APP
// ============================================================
export default function GymApp() {
  const [screen,setScreen]=useState("login");
  const [classes,setClasses]=useState(INITIAL_CLASSES);
  const [isAdmin,setIsAdmin]=useState(false);

  const nav=(s)=>setScreen(s);
  const activeNav = screen;

  const renderScreen=()=>{
    switch(screen){
      case "login": return <LoginScreen onLogin={()=>setScreen("home")}/>;
      case "home": return <HomeScreen onNav={nav} classes={classes}/>;
      case "reservations": return <ReservationsScreen classes={classes} setClasses={setClasses}/>;
      case "profile": return <ProfileScreen onBack={()=>nav("home")}/>;
      case "notifications": return <NotificationsScreen/>;
      case "admin-home": return <AdminHomeScreen classes={classes} onNav={nav}/>;
      case "admin-classes": return <AdminClassesScreen classes={classes} onBack={()=>nav("admin-home")}/>;
      case "admin-users": return <AdminUsersScreen onBack={()=>nav("admin-home")}/>;
      case "admin-plans": return <AdminPlansScreen onBack={()=>nav("admin-home")}/>;
      default: return <HomeScreen onNav={nav} classes={classes}/>;
    }
  };

  const showNav = screen!=="login";
  const adminScreens = ["admin-home","admin-classes","admin-users","admin-plans"];
  const currentIsAdmin = adminScreens.includes(screen);

  return (
    <div style={{background:"#0a0a0a",minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",fontFamily:"'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif",padding:20,gap:16}}>
      {/* Mode switcher */}
      {screen!=="login"&&(
        <div style={{display:"flex",gap:8}}>
          <button onClick={()=>{setIsAdmin(false);setScreen("home");}} style={{padding:"8px 20px",borderRadius:12,border:"none",background:!currentIsAdmin?"#c8ff00":"#1a1a1a",color:!currentIsAdmin?"#111":"#666",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>
            Usuario
          </button>
          <button onClick={()=>{setIsAdmin(true);setScreen("admin-home");}} style={{padding:"8px 20px",borderRadius:12,border:"none",background:currentIsAdmin?"#c8ff00":"#1a1a1a",color:currentIsAdmin?"#111":"#666",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>
            Admin
          </button>
        </div>
      )}

      {/* Phone */}
      <div style={{width:393,height:852,background:"#111",borderRadius:44,overflow:"hidden",position:"relative",boxShadow:"0 0 60px rgba(200,255,0,0.04),0 25px 80px rgba(0,0,0,0.5)",border:"6px solid #1a1a1a"}}>
        <StatusBar/>
        <div style={{height:"calc(100% - 48px)"}}>
          {renderScreen()}
        </div>
        {showNav&&<BottomNav active={activeNav} onNav={nav} isAdmin={currentIsAdmin}/>}
      </div>

      <style>{`
        *{-ms-overflow-style:none;scrollbar-width:none;}
        *::-webkit-scrollbar{display:none;}
        @keyframes spin{to{transform:rotate(360deg);}}
        input::placeholder{color:#444;}
      `}</style>
    </div>
  );
}
