import { useState } from "react";

// ============================================================
// DATA
// ============================================================
const DAYS=[{label:"L",date:9},{label:"M",date:10,today:true},{label:"X",date:11},{label:"J",date:12},{label:"V",date:13},{label:"S",date:14},{label:"D",date:15}];
const TIMES=["07:00","08:00","09:10","18:00","19:00","20:00","21:00"];
const AV=["https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop&crop=face","https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face","https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face","https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&h=60&fit=crop&crop=face","https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop&crop=face","https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=60&h=60&fit=crop&crop=face"];
const COACH="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=80&h=80&fit=crop&crop=face";
const UA=AV[0];

const INIT_CLASSES=[
  {id:1,name:"Calistenia",time:"07:00",coach:"Guille",spots:10,taken:7,status:"finished",color:"#c8ff00",attendees:[AV[0],AV[1],AV[2],AV[3],null,null,null]},
  {id:2,name:"Calistenia",time:"08:00",coach:"Guille",spots:10,taken:3,status:"available",color:"#c8ff00",attendees:[AV[4],AV[5],null,null,null,null,null]},
  {id:3,name:"E. Híbrido",time:"09:10",coach:"Guille",spots:12,taken:9,status:"available",color:"#d4a5ff",attendees:[AV[0],AV[1],AV[2],null,null,null]},
  {id:4,name:"Funcional",time:"18:00",coach:"Guille",spots:10,taken:10,status:"full",color:"#ff9d5c",attendees:[AV[3],AV[4],AV[5]]},
  {id:5,name:"Calistenia",time:"20:00",coach:"Guille",spots:10,taken:6,status:"booked",color:"#c8ff00",attendees:[AV[0],AV[2],null,null]},
  {id:6,name:"Endurance",time:"21:00",coach:"Guille",spots:10,taken:4,status:"available",color:"#5ce1e6",attendees:[AV[1],null,null,null]},
];

const INIT_USERS=[
  {id:1,name:"Sandra García",email:"sandra@email.com",avatar:AV[0],plan:"Ilimitado",planColor:"#c8ff00",price:75,paid:true,paidUntil:"31/3/2026",reservations:5,phone:"612 345 678",since:"Sep 2024"},
  {id:2,name:"Carlos Martínez",email:"carlos@email.com",avatar:AV[1],plan:"3 clases/sem",planColor:"#d4a5ff",price:65,paid:true,paidUntil:"31/3/2026",reservations:3,phone:"623 456 789",since:"Ene 2025"},
  {id:3,name:"Ana López",email:"ana@email.com",avatar:AV[2],plan:"2 clases/sem",planColor:"#ff9d5c",price:50,paid:false,paidUntil:"28/2/2026",reservations:0,phone:"634 567 890",since:"Nov 2024"},
  {id:4,name:"Miguel Torres",email:"miguel@email.com",avatar:AV[5],plan:"Ilimitado",planColor:"#c8ff00",price:75,paid:true,paidUntil:"31/3/2026",reservations:8,phone:"645 678 901",since:"Mar 2024"},
  {id:5,name:"Laura Sánchez",email:"laura@email.com",avatar:AV[4],plan:"3 clases/sem",planColor:"#d4a5ff",price:65,paid:true,paidUntil:"31/3/2026",reservations:2,phone:"656 789 012",since:"Jul 2025"},
  {id:6,name:"Pedro Ruiz",email:"pedro@email.com",avatar:AV[3],plan:"2 clases/sem",planColor:"#ff9d5c",price:50,paid:true,paidUntil:"31/3/2026",reservations:1,phone:"667 890 123",since:"Feb 2026"},
];

const PLANS=[{id:1,name:"Ilimitado",price:75,color:"#c8ff00",limit:"∞",desc:"Clases ilimitadas",users:12},{id:2,name:"3 clases/sem",price:65,color:"#d4a5ff",limit:"3/sem",desc:"Máximo 3 reservas por semana",users:8},{id:3,name:"2 clases/sem",price:50,color:"#ff9d5c",limit:"2/sem",desc:"Máximo 2 reservas por semana",users:5}];
const NOTIFS=[{id:1,text:"Se ha liberado una plaza en Calistenia 20:00",time:"Hace 5 min",read:false,type:"spot",color:"#c8ff00"},{id:2,text:"Tu clase de Funcional empieza en 1 hora",time:"Hace 45 min",read:false,type:"reminder",color:"#ff9d5c"},{id:3,text:"La clase de Endurance mañana 21:00 ha sido cancelada",time:"Hace 2h",read:false,type:"cancel",color:"#ff4d4d"},{id:4,text:"Nueva clase disponible: TGS sábado 08:30",time:"Ayer",read:true,type:"new",color:"#5ce1e6"},{id:5,text:"¡Has completado 5 clases este mes!",time:"Hace 2 días",read:true,type:"achievement",color:"#d4a5ff"}];
const CTYPES=["Calistenia","E. Híbrido","Funcional","Endurance","TGS"];

const SCHEDULE={
  L:[{type:"Calistenia",time:"07:00",spots:10,color:"#c8ff00"},{type:"Calistenia",time:"08:00",spots:10,color:"#c8ff00"},{type:"E. Híbrido",time:"09:10",spots:12,color:"#d4a5ff"},{type:"Funcional",time:"18:00",spots:10,color:"#ff9d5c"},{type:"Calistenia",time:"20:00",spots:10,color:"#c8ff00"},{type:"Endurance",time:"21:00",spots:10,color:"#5ce1e6"}],
  M:[{type:"Calistenia",time:"07:00",spots:10,color:"#c8ff00"},{type:"Funcional",time:"09:10",spots:10,color:"#ff9d5c"},{type:"Calistenia",time:"20:00",spots:10,color:"#c8ff00"},{type:"Calistenia",time:"21:00",spots:10,color:"#c8ff00"}],
  X:[{type:"Calistenia",time:"07:00",spots:10,color:"#c8ff00"},{type:"E. Híbrido",time:"08:00",spots:12,color:"#d4a5ff"},{type:"TGS",time:"09:10",spots:10,color:"#34a853"},{type:"Funcional",time:"20:00",spots:10,color:"#ff9d5c"}],
  J:[{type:"Calistenia",time:"07:00",spots:10,color:"#c8ff00"},{type:"Calistenia",time:"08:00",spots:10,color:"#c8ff00"},{type:"Funcional",time:"18:00",spots:10,color:"#ff9d5c"},{type:"Calistenia",time:"20:00",spots:10,color:"#c8ff00"},{type:"Endurance",time:"21:00",spots:10,color:"#5ce1e6"}],
  V:[{type:"Calistenia",time:"07:00",spots:10,color:"#c8ff00"},{type:"E. Híbrido",time:"09:10",spots:12,color:"#d4a5ff"},{type:"Calistenia",time:"20:00",spots:10,color:"#c8ff00"}],
  S:[{type:"TGS",time:"08:30",spots:10,color:"#34a853"},{type:"Calistenia",time:"10:00",spots:10,color:"#c8ff00"}],
};

// ============================================================
// ICONS
// ============================================================
const I={
  home:(c="#888")=><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  cal:(c="#888")=><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  chart:(c="#888")=><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="12" width="4" height="9" rx="1"/><rect x="10" y="6" width="4" height="15" rx="1"/><rect x="17" y="3" width="4" height="18" rx="1"/></svg>,
  user:(c="#888")=><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  back:(c="#888")=><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>,
  bell:(c="#888")=><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  filter:(c="#c8ff00")=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/><circle cx="8" cy="6" r="2" fill={c}/><circle cx="16" cy="12" r="2" fill={c}/><circle cx="10" cy="18" r="2" fill={c}/></svg>,
  gear:(c="#888")=><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  plus:(c="#c8ff00")=><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  edit:(c="#666")=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  search:(c="#666")=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  chev:(c="#555")=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>,
  euro:(c="#c8ff00")=><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8.5a6.5 6.5 0 0 0-12 0v0a6.5 6.5 0 0 0 12 7"/><line x1="4" y1="10" x2="14" y2="10"/><line x1="4" y1="14" x2="14" y2="14"/></svg>,
  x:(c="#ff4d4d")=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  check:(c="#34a853")=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  userPlus:(c="#c8ff00")=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>,
  trash:(c="#ff4d4d")=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>,
};

const Logo=({s=56})=><svg width={s} height={s*0.75} viewBox="0 0 140 100" fill="#c8ff00"><path d="M6 88 L42 12 L78 88 Z M42 30 L26 66 L58 66 Z" fillRule="evenodd"/><path d="M52 88 L76 36 L100 88 Z M76 54 L66 74 L86 74 Z" fillRule="evenodd"/><path d="M82 88 L106 36 L134 88 Z M106 54 L96 74 L116 74 Z" fillRule="evenodd"/></svg>;

// ============================================================
// SHARED
// ============================================================
const SBar=()=><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 28px 0",fontSize:15,fontWeight:600,color:"#fff"}}><span>9:41</span><div style={{width:125,height:34,background:"#000",borderRadius:20,position:"absolute",top:8,left:"50%",transform:"translateX(-50%)"}}/><div style={{display:"flex",gap:5,alignItems:"center"}}><svg width="17" height="12" viewBox="0 0 17 12" fill="none"><rect x="0" y="7" width="3" height="5" rx="1" fill="#fff"/><rect x="4.5" y="4.5" width="3" height="7.5" rx="1" fill="#fff"/><rect x="9" y="2" width="3" height="10" rx="1" fill="#fff"/><rect x="13.5" y="0" width="3" height="12" rx="1" fill="#fff"/></svg><svg width="27" height="13" viewBox="0 0 27 13" fill="none"><rect x="0.5" y="0.5" width="22" height="12" rx="3.5" stroke="#fff" strokeOpacity="0.35"/><rect x="2" y="2" width="19" height="9" rx="2" fill="#c8ff00"/><rect x="24" y="4" width="2.5" height="5" rx="1.25" fill="#fff" fillOpacity="0.4"/></svg></div></div>;

const BNav=({active,onNav,admin=false})=>{
  const items=admin?[{k:"a-home",i:I.home},{k:"a-schedule",i:I.cal},{k:"a-users",i:I.user},{k:"a-payments",i:I.euro},{k:"a-plans",i:I.chart}]:[{k:"home",i:I.home},{k:"reservations",i:I.cal},{k:"notifications",i:I.bell},{k:"profile",i:I.user}];
  return <div style={{position:"absolute",bottom:20,left:"50%",transform:"translateX(-50%)",background:"#1a1a1a",borderRadius:28,padding:"12px 20px",display:"flex",gap:admin?18:24,alignItems:"center",border:"1px solid #252525"}}>{items.map(it=><div key={it.k} onClick={()=>onNav(it.k)} style={{cursor:"pointer",position:"relative",display:"flex",alignItems:"center",justifyContent:"center"}}>{it.i(active===it.k?"#c8ff00":"#555")}{active===it.k&&<div style={{position:"absolute",top:-8,width:4,height:4,borderRadius:"50%",background:"#c8ff00"}}/>}</div>)}</div>;
};

const Pill=({l,a,onClick,c="#c8ff00"})=><button onClick={onClick} style={{padding:"7px 14px",borderRadius:20,border:`1.5px solid ${a?c:"#2a2a2a"}`,background:a?c+"18":"transparent",color:a?c:"#666",fontSize:12,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap",transition:"all .2s",fontFamily:"inherit"}}>{l}</button>;
const MC=({l,v,a=false})=><div style={{flex:1,background:"#161616",borderRadius:14,padding:"12px 14px",border:"1px solid #1e1e1e"}}><div style={{fontSize:10,color:"#666",fontWeight:600,textTransform:"uppercase",letterSpacing:".5px",marginBottom:4}}>{l}</div><div style={{fontSize:15,fontWeight:700,color:a?"#c8ff00":"#fff"}}>{v}</div></div>;
const Ring=({t,s,sz=36})=>{const p=(t/s)*100;const f=t>=s;return <div style={{width:sz,height:sz,borderRadius:"50%",background:`conic-gradient(${f?"#ff4d4d":"#c8ff00"} ${p}%,#2a2a2a ${p}%)`,display:"flex",alignItems:"center",justifyContent:"center"}}><div style={{width:sz-10,height:sz-10,borderRadius:"50%",background:"#161616",display:"flex",alignItems:"center",justifyContent:"center",fontSize:sz>30?10:8,fontWeight:700,color:f?"#ff4d4d":"#c8ff00"}}>{t}/{s}</div></div>;};
const Header=({left,title,right})=><div style={{padding:"20px 20px 0",display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>{left||<div style={{width:22}}/>}<div style={{fontSize:16,fontWeight:700,color:"#fff"}}>{title}</div>{right||<div style={{width:22}}/>}</div>;

// ============================================================
// LOGIN
// ============================================================
const Login=({onLogin})=>{
  const [loading,setLoading]=useState(false);
  const go=()=>{setLoading(true);setTimeout(()=>{setLoading(false);onLogin();},800);};
  return <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"space-between",height:"100%",padding:"0 28px 40px"}}>
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",width:"100%",marginTop:50}}>
      <div style={{width:100,height:100,borderRadius:"50%",background:"#161616",border:"2px solid #2a2a2a",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:22,position:"relative",overflow:"hidden"}}><div style={{position:"absolute",width:60,height:60,borderRadius:"50%",background:"radial-gradient(circle,rgba(200,255,0,.08) 0%,transparent 70%)",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}}/><Logo s={56}/></div>
      <div style={{fontSize:11,fontWeight:600,color:"#c8ff00",letterSpacing:5,textTransform:"uppercase",marginBottom:4}}>Center</div>
      <div style={{fontSize:24,fontWeight:800,color:"#fff",letterSpacing:".5px",marginBottom:6}}>Athlete Center</div>
      <div style={{fontSize:13,color:"#555",fontWeight:500,marginBottom:44}}>Tu entreno, tu ritmo</div>
      <div style={{width:"100%",display:"flex",flexDirection:"column",gap:12}}>
        <div style={{background:"#161616",borderRadius:14,padding:"0 16px",display:"flex",alignItems:"center",gap:12,height:54,border:"1.5px solid #222"}}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="3"/><polyline points="22,4 12,13 2,4"/></svg><input placeholder="Email" style={{background:"transparent",border:"none",outline:"none",color:"#fff",fontSize:15,fontWeight:500,width:"100%",fontFamily:"inherit"}}/></div>
        <div style={{background:"#161616",borderRadius:14,padding:"0 16px",display:"flex",alignItems:"center",gap:12,height:54,border:"1.5px solid #222"}}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="3"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg><input type="password" placeholder="Contraseña" style={{background:"transparent",border:"none",outline:"none",color:"#fff",fontSize:15,fontWeight:500,width:"100%",fontFamily:"inherit"}}/></div>
        <button onClick={go} disabled={loading} style={{width:"100%",height:54,borderRadius:14,border:"none",background:loading?"#8a9900":"#c8ff00",color:"#111",fontSize:15,fontWeight:700,letterSpacing:"1.5px",textTransform:"uppercase",cursor:"pointer",marginTop:6,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"inherit",boxShadow:"0 4px 20px rgba(200,255,0,.15)",transition:"all .25s"}}>{loading?<div style={{width:20,height:20,border:"2.5px solid #111",borderTopColor:"transparent",borderRadius:"50%",animation:"spin .8s linear infinite"}}/>:"Entrar"}</button>
        <div style={{textAlign:"center",marginTop:4}}><span style={{fontSize:13,color:"#555",fontWeight:500,cursor:"pointer",borderBottom:"1px solid #333",paddingBottom:1}}>¿Olvidaste tu contraseña?</span></div>
      </div>
    </div>
    <div style={{fontSize:11,color:"#333",fontWeight:500,letterSpacing:".3px"}}>Powered by <span style={{color:"#c8ff00",fontWeight:600,opacity:.4}}>madebydiego.ai</span></div>
  </div>;
};

// ============================================================
// USER: HOME
// ============================================================
const Home=({nav,cls})=>{
  const b=cls.find(c=>c.status==="booked");
  return <div style={{padding:"20px",overflowY:"auto",height:"100%",paddingBottom:100}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24}}>
      <div style={{display:"flex",alignItems:"center",gap:12}}><img src={UA} alt="" style={{width:48,height:48,borderRadius:"50%",objectFit:"cover",border:"2px solid #2a2a2a"}}/><div><div style={{fontSize:18,fontWeight:700,color:"#fff"}}>Hola, Sandra</div><div style={{fontSize:13,color:"#666"}}>martes 10 de marzo</div></div></div>
      <div onClick={()=>nav("notifications")} style={{width:42,height:42,borderRadius:14,background:"#1a1a1a",border:"1px solid #2a2a2a",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",position:"relative"}}>{I.bell("#888")}<div style={{position:"absolute",top:8,right:8,width:8,height:8,borderRadius:"50%",background:"#c8ff00"}}/></div>
    </div>
    {b&&<div onClick={()=>nav("reservations")} style={{background:"#161616",borderRadius:20,padding:"18px",borderLeft:"4px solid #c8ff00",marginBottom:20,cursor:"pointer"}}><div style={{fontSize:10,fontWeight:600,color:"#c8ff00",textTransform:"uppercase",letterSpacing:2,marginBottom:6}}>Próxima clase</div><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div><div style={{fontSize:22,fontWeight:800,color:"#fff",textTransform:"uppercase"}}>{b.name}</div><div style={{fontSize:13,color:"#888",marginTop:2}}>{b.time} — {b.coach}</div></div><Ring t={b.taken} s={b.spots} sz={44}/></div></div>}
    <div style={{display:"flex",gap:8,marginBottom:20}}><MC l="Tu tarifa" v="Ilimitado" a/><MC l="Esta semana" v={<>3 <span style={{color:"#444",fontWeight:500}}>clases</span></>}/><MC l="Este mes" v={<>5 <span style={{color:"#444",fontWeight:500}}>total</span></>}/></div>
    <button onClick={()=>nav("reservations")} style={{width:"100%",height:54,borderRadius:14,border:"none",background:"#c8ff00",color:"#111",fontSize:15,fontWeight:700,letterSpacing:"1px",textTransform:"uppercase",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8,fontFamily:"inherit",boxShadow:"0 4px 20px rgba(200,255,0,.15)",marginBottom:24}}>{I.cal("#111")} Reservar Clase</button>
    <div style={{fontSize:10,fontWeight:600,color:"#555",textTransform:"uppercase",letterSpacing:1,marginBottom:10}}>Clases de hoy</div>
    {cls.filter(c=>c.status!=="finished").map(c=><div key={c.id} onClick={()=>nav("reservations")} style={{background:"#161616",borderRadius:14,padding:"12px 14px",marginBottom:8,display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer",borderLeft:`3px solid ${c.color}`}}><div><div style={{fontSize:14,fontWeight:700,color:"#fff"}}>{c.name}</div><div style={{fontSize:12,color:"#666"}}>{c.time}</div></div><div style={{display:"flex",alignItems:"center",gap:8}}><Ring t={c.taken} s={c.spots} sz={30}/>{c.status==="booked"&&<div style={{fontSize:10,fontWeight:600,color:"#c8ff00",background:"#c8ff0018",padding:"3px 8px",borderRadius:8}}>✓</div>}{c.status==="full"&&<div style={{fontSize:10,fontWeight:600,color:"#ff4d4d",background:"#ff4d4d18",padding:"3px 8px",borderRadius:8}}>Llena</div>}</div></div>)}
  </div>;
};

// ============================================================
// USER: RESERVATIONS
// ============================================================
const Reservations=({cls,setCls})=>{
  const [day,setDay]=useState(10);const [time,setTime]=useState(null);
  const fl=time?cls.filter(c=>c.time===time):cls;
  const book=id=>setCls(p=>p.map(c=>{if(c.id!==id)return c;if(c.status==="available")return{...c,status:"booked",taken:c.taken+1};if(c.status==="booked")return{...c,status:"available",taken:c.taken-1};return c;}));
  const sc={finished:{l:"Finalizada",bg:"#2a2a2a",c:"#666",b:"#333"},available:{l:"Reservar",bg:"#c8ff00",c:"#111",b:"#c8ff00"},full:{l:"Lista de espera",bg:"#2a2a2a",c:"#ff9d5c",b:"#ff9d5c"},booked:{l:"Cancelar reserva",bg:"#1a1a2e",c:"#ff4d4d",b:"#ff4d4d44"}};
  return <div style={{overflowY:"auto",height:"100%",paddingBottom:100}}>
    <div style={{padding:"20px 20px 0",display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}><div><div style={{fontSize:11,color:"#c8ff00",fontWeight:600,textTransform:"uppercase",letterSpacing:2,marginBottom:2}}>Reservas</div><div style={{fontSize:26,fontWeight:800,color:"#fff"}}>Hoy, martes 10/03</div></div><div style={{width:42,height:42,borderRadius:14,background:"#1a1a1a",border:"1px solid #2a2a2a",display:"flex",alignItems:"center",justifyContent:"center"}}>{I.filter()}</div></div>
    <div style={{display:"flex",alignItems:"center",padding:"12px",margin:"0 16px",background:"#161616",borderRadius:18,marginBottom:12}}><button style={{background:"none",border:"none",color:"#555",fontSize:18,cursor:"pointer",padding:"0 4px"}}>‹</button>{DAYS.map(d=><div key={d.date} onClick={()=>setDay(d.date)} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4,cursor:"pointer",padding:"6px 0",borderRadius:14,background:day===d.date?"#c8ff00":"transparent",transition:"all .25s"}}><span style={{fontSize:11,fontWeight:600,color:day===d.date?"#111":"#666"}}>{d.label}</span><span style={{fontSize:16,fontWeight:700,color:day===d.date?"#111":"#fff"}}>{d.date}</span>{d.today&&day!==d.date&&<div style={{width:4,height:4,borderRadius:"50%",background:"#c8ff00",marginTop:-2}}/>}</div>)}<button style={{background:"none",border:"none",color:"#555",fontSize:18,cursor:"pointer",padding:"0 4px"}}>›</button></div>
    <div style={{display:"flex",gap:6,padding:"0 20px",marginBottom:18,overflowX:"auto"}}><Pill l="Todas" a={!time} onClick={()=>setTime(null)}/>{TIMES.map(t=><Pill key={t} l={t} a={time===t} onClick={()=>setTime(time===t?null:t)}/>)}</div>
    <div style={{display:"flex",gap:8,padding:"0 20px",marginBottom:16}}><MC l="Tu tarifa" v="Ilimitado" a/><MC l="Reservas hoy" v={<>1 <span style={{color:"#444",fontWeight:500}}>clase</span></>}/><MC l="Este mes" v={<>5 <span style={{color:"#444",fontWeight:500}}>total</span></>}/></div>
    <div style={{padding:"0 20px",display:"flex",flexDirection:"column",gap:10}}><div style={{fontSize:14,fontWeight:600,color:"#555",textTransform:"uppercase",letterSpacing:1,marginBottom:2}}>{fl.length} clase{fl.length!==1?"s":""}</div>
    {fl.map(c=>{const s=sc[c.status];return <div key={c.id} style={{background:"#161616",borderRadius:20,padding:"18px 18px 14px",border:`1px solid ${c.status==="finished"?"#222":c.color+"33"}`,opacity:c.status==="finished"?.5:1}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:10}}><div style={{width:4,height:40,borderRadius:4,background:c.color}}/><div><div style={{fontSize:20,fontWeight:800,color:"#fff",textTransform:"uppercase"}}>{c.name}</div><div style={{display:"flex",alignItems:"center",gap:6,marginTop:3}}><img src={COACH} alt="" style={{width:18,height:18,borderRadius:"50%",objectFit:"cover"}}/><span style={{fontSize:12,color:"#888"}}>{c.coach}</span></div></div></div><div style={{textAlign:"right"}}><div style={{fontSize:28,fontWeight:800,color:c.color,letterSpacing:"-1px",lineHeight:1}}>{c.time}</div><Ring t={c.taken} s={c.spots}/></div></div>
      <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:14}}>{c.attendees.map((u,i)=>u?<img key={i} src={u} alt="" style={{width:34,height:34,borderRadius:10,objectFit:"cover",border:"2px solid #222"}}/>:<div key={i} style={{width:34,height:34,borderRadius:10,background:"#1e1e1e",border:"1px dashed #333"}}/>)}</div>
      <button onClick={()=>book(c.id)} disabled={c.status==="finished"} style={{width:"100%",padding:"10px 0",borderRadius:12,border:`1.5px solid ${s.b}`,background:s.bg,color:s.c,fontSize:13,fontWeight:700,cursor:c.status==="finished"?"default":"pointer",textTransform:"uppercase",fontFamily:"inherit",transition:"all .2s"}}>{c.status==="booked"?"✓ ":""}{s.l}</button>
    </div>})}</div>
  </div>;
};

// ============================================================
// USER: PROFILE
// ============================================================
const Profile=({onBack})=>{
  const ct=[{n:"Calistenia",c:"#4466FF"},{n:"E. Híbrido",c:"#34a853"},{n:"Funcional",c:"#d946ef"},{n:"Endurance",c:"#eab308"},{n:"TGS",c:"#ff9d5c"}];
  const rd={3:{c:"#c8ff00"},5:{c:"#c8ff00"},7:{c:"#1a1a1a"},10:{c:"#c8ff00"},11:{c:"#d946ef"}};
  return <div style={{overflowY:"auto",height:"100%",paddingBottom:100}}>
    <Header left={<div onClick={onBack} style={{cursor:"pointer"}}>{I.back()}</div>} title="Mi Perfil" right={<div style={{cursor:"pointer"}}>{I.gear()}</div>}/>
    <div style={{display:"flex",alignItems:"center",gap:14,padding:"0 20px",marginBottom:20}}><img src={UA} alt="" style={{width:64,height:64,borderRadius:"50%",objectFit:"cover",border:"2px solid #c8ff00"}}/><div><div style={{fontSize:18,fontWeight:700,color:"#fff"}}>Sandra García</div><div style={{fontSize:13,color:"#666"}}>sandra@email.com</div></div></div>
    <div style={{margin:"0 20px",background:"#161616",borderRadius:20,padding:18,marginBottom:16}}>
      <div style={{fontSize:10,fontWeight:600,color:"#c8ff00",textTransform:"uppercase",letterSpacing:2,marginBottom:10}}>Tu tarifa</div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}><div style={{fontSize:24,fontWeight:800,color:"#fff"}}>Ilimitado</div><div style={{fontSize:32,color:"#c8ff00",fontWeight:300}}>∞</div></div>
      <div style={{fontSize:13,color:"#666",marginBottom:4}}>Pagado hasta: <span style={{color:"#fff",fontWeight:600}}>31/3/2026</span></div>
      <div style={{height:1,background:"#222",margin:"14px 0"}}/>
      <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:10}}>{ct.map(x=><span key={x.n} style={{fontSize:11,fontWeight:600,padding:"4px 10px",borderRadius:8,background:x.c+"22",color:x.c}}>{x.n}</span>)}</div>
      <div style={{fontSize:12,color:"#666"}}>Has reservado <span style={{color:"#c8ff00",fontWeight:600}}>5</span> este mes</div>
    </div>
    <div style={{margin:"0 20px",background:"#161616",borderRadius:20,padding:18}}>
      <div style={{fontSize:14,fontWeight:700,color:"#fff",marginBottom:12}}>marzo</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:4,textAlign:"center"}}>
        {["L","M","X","J","V","S","D"].map(d=><div key={d} style={{fontSize:10,fontWeight:600,color:"#555",paddingBottom:6}}>{d}</div>)}
        {Array(5).fill(null).map((_,i)=><div key={`e${i}`}/>)}
        {Array.from({length:31},(_,i)=>i+1).map(d=><div key={d} style={{padding:"4px 0",borderRadius:8,border:d===10?"1px solid #c8ff00":"1px solid transparent"}}><div style={{fontSize:12,fontWeight:d===10?700:500,color:d===10?"#c8ff00":rd[d]?"#fff":"#555"}}>{d}</div>{rd[d]&&<div style={{width:6,height:6,borderRadius:"50%",background:rd[d].c,margin:"2px auto 0"}}/>}</div>)}
      </div>
    </div>
  </div>;
};

// ============================================================
// USER: NOTIFICATIONS
// ============================================================
const Notifs=()=>{const [n,sN]=useState(NOTIFS);const ti={spot:"✓",reminder:"⏰",cancel:"✕",new:"+",achievement:"★"};
  return <div style={{overflowY:"auto",height:"100%",paddingBottom:100}}>
    <div style={{padding:"20px 20px 16px",display:"flex",justifyContent:"space-between",alignItems:"center"}}><div style={{fontSize:22,fontWeight:800,color:"#fff"}}>Notificaciones</div><div style={{background:"#c8ff00",color:"#111",fontSize:11,fontWeight:700,padding:"3px 10px",borderRadius:10}}>{n.filter(x=>!x.read).length}</div></div>
    <div style={{padding:"0 20px",display:"flex",flexDirection:"column",gap:8}}>{n.map(x=><div key={x.id} onClick={()=>sN(p=>p.map(y=>y.id===x.id?{...y,read:true}:y))} style={{background:"#161616",borderRadius:16,padding:"14px 16px",display:"flex",gap:12,alignItems:"flex-start",cursor:"pointer",border:x.read?"1px solid #1e1e1e":`1px solid ${x.color}22`}}>{!x.read&&<div style={{width:6,height:6,borderRadius:"50%",background:"#c8ff00",flexShrink:0,marginTop:6}}/>}<div style={{width:36,height:36,borderRadius:12,background:x.color+"22",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:x.color,fontWeight:700,flexShrink:0}}>{ti[x.type]}</div><div style={{flex:1}}><div style={{fontSize:13,fontWeight:x.read?500:600,color:x.read?"#888":"#fff",lineHeight:1.4}}>{x.text}</div><div style={{fontSize:11,color:"#555",marginTop:4}}>{x.time}</div></div>{x.type==="spot"&&!x.read&&<div style={{fontSize:11,fontWeight:600,color:"#c8ff00",border:"1px solid #c8ff00",padding:"4px 10px",borderRadius:8,whiteSpace:"nowrap",flexShrink:0}}>Reservar</div>}</div>)}</div>
  </div>;
};

// ============================================================
// ADMIN: HOME
// ============================================================
const AHome=({cls,nav})=>{
  const tr=cls.reduce((a,c)=>a+c.taken,0);const ts=cls.reduce((a,c)=>a+c.spots,0);const occ=Math.round(tr/ts*100);
  const unpaid=INIT_USERS.filter(u=>!u.paid).length;const income=INIT_USERS.filter(u=>u.paid).reduce((a,u)=>a+u.price,0);
  return <div style={{overflowY:"auto",height:"100%",paddingBottom:100}}>
    <div style={{padding:"20px 20px 0",marginBottom:16}}><div style={{fontSize:11,color:"#c8ff00",fontWeight:600,textTransform:"uppercase",letterSpacing:2,marginBottom:2}}>Admin</div><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div style={{fontSize:24,fontWeight:800,color:"#fff"}}>Panel de control</div><img src={COACH} alt="" style={{width:38,height:38,borderRadius:12,objectFit:"cover",border:"2px solid #2a2a2a"}}/></div></div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,padding:"0 20px",marginBottom:16}}>
      <MC l="Clases hoy" v={<span style={{color:"#c8ff00"}}>{cls.length}</span>}/>
      <MC l="Reservas hoy" v={tr}/>
      <div style={{background:"#161616",borderRadius:14,padding:"12px 14px",border:"1px solid #1e1e1e"}}><div style={{fontSize:10,color:"#666",fontWeight:600,textTransform:"uppercase",letterSpacing:".5px",marginBottom:6}}>Ocupación media</div><div style={{fontSize:15,fontWeight:700,color:"#c8ff00",marginBottom:6}}>{occ}%</div><div style={{height:4,borderRadius:2,background:"#2a2a2a"}}><div style={{height:4,borderRadius:2,background:"#c8ff00",width:`${occ}%`}}/></div></div>
      <MC l="Ingresos mes" v={<span style={{color:"#c8ff00"}}>{income}€</span>}/>
    </div>
    <div style={{padding:"0 20px",marginBottom:16}}><div style={{fontSize:10,fontWeight:600,color:"#c8ff00",textTransform:"uppercase",letterSpacing:1,marginBottom:10}}>Clases de hoy</div>
    {cls.map(c=>{const p=Math.round(c.taken/c.spots*100);const f=p>=100;return <div key={c.id} style={{background:"#161616",borderRadius:12,padding:"12px 14px",marginBottom:6,border:"1px solid #1e1e1e"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}><div style={{display:"flex",alignItems:"center",gap:8}}><div style={{width:3,height:20,borderRadius:3,background:c.color}}/><span style={{fontSize:13,fontWeight:700,color:"#fff"}}>{c.name} {c.time}</span></div><span style={{fontSize:12,fontWeight:600,color:f?"#ff4d4d":"#888"}}>{f?"LLENA":c.taken+"/"+c.spots}</span></div><div style={{height:4,borderRadius:2,background:"#2a2a2a"}}><div style={{height:4,borderRadius:2,background:f?"#ff4d4d":c.color,width:`${p}%`}}/></div></div>})}</div>
    {unpaid>0&&<div style={{margin:"0 20px",background:"#161616",borderRadius:14,padding:14,border:"1px solid #ff9d5c33",display:"flex",alignItems:"center",gap:10,cursor:"pointer"}} onClick={()=>nav("a-payments")}><div style={{fontSize:18}}>⚠️</div><div style={{fontSize:13,color:"#fff"}}><span style={{fontWeight:700,color:"#ff9d5c"}}>{unpaid} pago{unpaid>1?"s":""} pendiente{unpaid>1?"s":""}</span> de renovación</div>{I.chev()}</div>}
  </div>;
};

// ============================================================
// ADMIN: SCHEDULE
// ============================================================
const ASchedule=({nav})=>{
  const [day,setDay]=useState("L");
  const slots=SCHEDULE[day]||[];
  return <div style={{overflowY:"auto",height:"100%",paddingBottom:100}}>
    <Header left={<div/>} title="Horarios Semanal" right={<div style={{width:36,height:36,borderRadius:12,background:"#c8ff00",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>{I.plus("#111")}</div>}/>
    <div style={{display:"flex",gap:6,padding:"0 20px",marginBottom:16,overflowX:"auto"}}>{Object.keys(SCHEDULE).map(d=><Pill key={d} l={d} a={day===d} onClick={()=>setDay(d)}/>)}</div>
    <div style={{padding:"0 20px"}}>
      <div style={{fontSize:12,color:"#666",marginBottom:10}}>{slots.length} clases el {day==="L"?"lunes":day==="M"?"martes":day==="X"?"miércoles":day==="J"?"jueves":day==="V"?"viernes":"sábado"}</div>
      {slots.map((s,i)=><div key={i} style={{background:"#161616",borderRadius:16,padding:16,marginBottom:8,borderLeft:`4px solid ${s.color}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div><div style={{fontSize:16,fontWeight:700,color:"#fff",textTransform:"uppercase"}}>{s.type}</div><div style={{fontSize:13,color:"#666",marginTop:2}}>{s.time} — {parseInt(s.time.split(":")[0])+1}:{s.time.split(":")[1]}</div></div>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{fontSize:13,fontWeight:600,color:s.color}}>{s.spots} plazas</div>
          <div style={{display:"flex",gap:6}}><div style={{cursor:"pointer"}}>{I.edit()}</div><div style={{cursor:"pointer"}}>{I.trash()}</div></div>
        </div>
      </div>)}
      {slots.length===0&&<div style={{textAlign:"center",padding:40,color:"#444"}}>No hay clases configuradas</div>}
    </div>
  </div>;
};

// ============================================================
// ADMIN: USERS (list + detail)
// ============================================================
const AUsers=({nav,users,setUsers})=>{
  const [search,setSearch]=useState("");const [filter,setFilter]=useState("Todos");const [sel,setSel]=useState(null);
  const fl=users.filter(u=>{if(search&&!u.name.toLowerCase().includes(search.toLowerCase()))return false;if(filter==="Pendiente")return!u.paid;if(filter!=="Todos")return u.plan===filter;return true;});

  if(sel){
    const u=users.find(x=>x.id===sel);
    if(!u)return null;
    const togglePaid=()=>setUsers(p=>p.map(x=>x.id===sel?{...x,paid:!x.paid}:x));
    const changePlan=(plan,price,color)=>setUsers(p=>p.map(x=>x.id===sel?{...x,plan,price,planColor:color}:x));
    return <div style={{overflowY:"auto",height:"100%",paddingBottom:100}}>
      <Header left={<div onClick={()=>setSel(null)} style={{cursor:"pointer"}}>{I.back()}</div>} title="Ficha de usuario" right={<div/>}/>
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"0 20px",marginBottom:20}}>
        <img src={u.avatar} alt="" style={{width:80,height:80,borderRadius:"50%",objectFit:"cover",border:`3px solid ${u.planColor}`,marginBottom:12}}/>
        <div style={{fontSize:20,fontWeight:800,color:"#fff"}}>{u.name}</div>
        <div style={{fontSize:13,color:"#666",marginTop:2}}>{u.email}</div>
        <div style={{fontSize:12,color:"#555",marginTop:2}}>{u.phone} · Desde {u.since}</div>
      </div>
      {/* Payment status */}
      <div style={{margin:"0 20px",background:"#161616",borderRadius:16,padding:16,marginBottom:12,border:`1px solid ${u.paid?"#34a85333":"#ff4d4d33"}`}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div><div style={{fontSize:10,fontWeight:600,color:"#666",textTransform:"uppercase",letterSpacing:1,marginBottom:4}}>Estado de pago</div><div style={{display:"flex",alignItems:"center",gap:6}}><div style={{width:8,height:8,borderRadius:"50%",background:u.paid?"#34a853":"#ff4d4d"}}/><span style={{fontSize:15,fontWeight:700,color:u.paid?"#34a853":"#ff4d4d"}}>{u.paid?"Al día":"Pendiente"}</span></div><div style={{fontSize:12,color:"#666",marginTop:4}}>Pagado hasta: {u.paidUntil}</div></div>
          <button onClick={togglePaid} style={{padding:"8px 14px",borderRadius:10,border:`1.5px solid ${u.paid?"#ff4d4d":"#34a853"}`,background:"transparent",color:u.paid?"#ff4d4d":"#34a853",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>{u.paid?"Marcar pendiente":"Marcar pagado"}</button>
        </div>
      </div>
      {/* Tariff */}
      <div style={{margin:"0 20px",background:"#161616",borderRadius:16,padding:16,marginBottom:12}}>
        <div style={{fontSize:10,fontWeight:600,color:"#666",textTransform:"uppercase",letterSpacing:1,marginBottom:10}}>Tarifa asignada</div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:18,fontWeight:800,color:u.planColor}}>{u.plan}</span></div>
          <div style={{fontSize:20,fontWeight:700,color:"#fff"}}>{u.price}€<span style={{fontSize:12,color:"#666"}}>/mes</span></div>
        </div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
          {PLANS.map(p=><button key={p.id} onClick={()=>changePlan(p.name,p.price,p.color)} style={{padding:"8px 14px",borderRadius:10,border:`1.5px solid ${u.plan===p.name?p.color:"#2a2a2a"}`,background:u.plan===p.name?p.color+"18":"transparent",color:u.plan===p.name?p.color:"#666",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>{p.name} — {p.price}€</button>)}
        </div>
      </div>
      {/* Stats */}
      <div style={{margin:"0 20px",display:"flex",gap:8,marginBottom:12}}>
        <MC l="Reservas mes" v={u.reservations}/>
        <MC l="Tarifa" v={u.price+"€"} a/>
      </div>
      {/* Enrolled classes */}
      <div style={{margin:"0 20px",background:"#161616",borderRadius:16,padding:16}}>
        <div style={{fontSize:10,fontWeight:600,color:"#c8ff00",textTransform:"uppercase",letterSpacing:1,marginBottom:10}}>Clases con acceso</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
          {CTYPES.map(ct=><span key={ct} style={{fontSize:11,fontWeight:600,padding:"4px 10px",borderRadius:8,background:"#2a2a2a",color:"#888"}}>{ct}</span>)}
        </div>
      </div>
    </div>;
  }

  return <div style={{overflowY:"auto",height:"100%",paddingBottom:100}}>
    <Header left={<div/>} title={<div style={{display:"flex",alignItems:"center",gap:8}}>Usuarios <span style={{background:"#c8ff00",color:"#111",fontSize:11,fontWeight:700,padding:"2px 8px",borderRadius:8}}>{users.length}</span></div>} right={<div style={{width:36,height:36,borderRadius:12,background:"#c8ff00",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>{I.userPlus("#111")}</div>}/>
    <div style={{margin:"0 20px 12px",background:"#161616",borderRadius:14,padding:"0 14px",display:"flex",alignItems:"center",gap:10,height:44,border:"1px solid #222"}}>{I.search()}<input placeholder="Buscar alumno..." value={search} onChange={e=>setSearch(e.target.value)} style={{background:"transparent",border:"none",outline:"none",color:"#fff",fontSize:14,fontWeight:500,width:"100%",fontFamily:"inherit"}}/></div>
    <div style={{display:"flex",gap:6,padding:"0 20px",marginBottom:14,overflowX:"auto"}}>{["Todos","Ilimitado","3 clases/sem","2 clases/sem","Pendiente"].map(f=><Pill key={f} l={f} a={filter===f} onClick={()=>setFilter(f)} c={f==="Pendiente"?"#ff4d4d":"#c8ff00"}/>)}</div>
    <div style={{padding:"0 20px",display:"flex",flexDirection:"column",gap:6}}>{fl.map(u=><div key={u.id} onClick={()=>setSel(u.id)} style={{background:"#161616",borderRadius:14,padding:"12px 14px",display:"flex",alignItems:"center",gap:12,cursor:"pointer"}}>
      <img src={u.avatar} alt="" style={{width:40,height:40,borderRadius:"50%",objectFit:"cover",border:"2px solid #222"}}/>
      <div style={{flex:1}}><div style={{display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:14,fontWeight:600,color:"#fff"}}>{u.name}</span><span style={{fontSize:10,fontWeight:600,padding:"2px 8px",borderRadius:6,background:u.planColor+"22",color:u.planColor}}>{u.plan}</span></div><div style={{display:"flex",alignItems:"center",gap:8,marginTop:3}}><span style={{fontSize:12,color:"#555"}}>{u.reservations} reservas</span><span style={{fontSize:12,color:"#555"}}>·</span><span style={{fontSize:12,fontWeight:600,color:u.paid?"#34a853":"#ff4d4d"}}>{u.price}€</span></div></div>
      <div style={{display:"flex",alignItems:"center",gap:6}}><div style={{width:8,height:8,borderRadius:"50%",background:u.paid?"#34a853":"#ff4d4d"}}/>{I.chev()}</div>
    </div>)}</div>
  </div>;
};

// ============================================================
// ADMIN: PAYMENTS
// ============================================================
const APayments=({users})=>{
  const paid=users.filter(u=>u.paid);const unpaid=users.filter(u=>!u.paid);
  const total=paid.reduce((a,u)=>a+u.price,0);const pending=unpaid.reduce((a,u)=>a+u.price,0);
  return <div style={{overflowY:"auto",height:"100%",paddingBottom:100}}>
    <Header left={<div/>} title="Cobros y Pagos" right={<div/>}/>
    <div style={{display:"flex",gap:8,padding:"0 20px",marginBottom:16}}>
      <div style={{flex:1,background:"#161616",borderRadius:14,padding:"14px",border:"1px solid #34a85333"}}><div style={{fontSize:10,color:"#34a853",fontWeight:600,textTransform:"uppercase",letterSpacing:".5px",marginBottom:4}}>Cobrado</div><div style={{fontSize:22,fontWeight:800,color:"#34a853"}}>{total}€</div><div style={{fontSize:11,color:"#666",marginTop:2}}>{paid.length} alumnos</div></div>
      <div style={{flex:1,background:"#161616",borderRadius:14,padding:"14px",border:"1px solid #ff4d4d33"}}><div style={{fontSize:10,color:"#ff4d4d",fontWeight:600,textTransform:"uppercase",letterSpacing:".5px",marginBottom:4}}>Pendiente</div><div style={{fontSize:22,fontWeight:800,color:"#ff4d4d"}}>{pending}€</div><div style={{fontSize:11,color:"#666",marginTop:2}}>{unpaid.length} alumno{unpaid.length!==1?"s":""}</div></div>
    </div>
    <div style={{display:"flex",gap:8,padding:"0 20px",marginBottom:20}}>
      <div style={{flex:1,background:"#161616",borderRadius:14,padding:"14px",border:"1px solid #1e1e1e"}}><div style={{fontSize:10,color:"#666",fontWeight:600,textTransform:"uppercase",letterSpacing:".5px",marginBottom:4}}>Total esperado</div><div style={{fontSize:22,fontWeight:800,color:"#fff"}}>{total+pending}€</div></div>
      <div style={{flex:1,background:"#161616",borderRadius:14,padding:"14px",border:"1px solid #1e1e1e"}}><div style={{fontSize:10,color:"#666",fontWeight:600,textTransform:"uppercase",letterSpacing:".5px",marginBottom:4}}>% cobrado</div><div style={{fontSize:22,fontWeight:800,color:"#c8ff00"}}>{Math.round(total/(total+pending)*100)}%</div></div>
    </div>
    {unpaid.length>0&&<><div style={{padding:"0 20px",marginBottom:10}}><div style={{fontSize:10,fontWeight:600,color:"#ff4d4d",textTransform:"uppercase",letterSpacing:1}}>Pagos pendientes</div></div>
    <div style={{padding:"0 20px",display:"flex",flexDirection:"column",gap:6,marginBottom:20}}>{unpaid.map(u=><div key={u.id} style={{background:"#161616",borderRadius:14,padding:"12px 14px",display:"flex",alignItems:"center",gap:12,border:"1px solid #ff4d4d22"}}>
      <img src={u.avatar} alt="" style={{width:40,height:40,borderRadius:"50%",objectFit:"cover",border:"2px solid #ff4d4d44"}}/>
      <div style={{flex:1}}><div style={{fontSize:14,fontWeight:600,color:"#fff"}}>{u.name}</div><div style={{fontSize:12,color:"#ff4d4d"}}>Vencido: {u.paidUntil}</div></div>
      <div style={{textAlign:"right"}}><div style={{fontSize:16,fontWeight:700,color:"#ff4d4d"}}>{u.price}€</div><div style={{fontSize:10,color:"#666"}}>{u.plan}</div></div>
    </div>)}</div></>}
    <div style={{padding:"0 20px",marginBottom:10}}><div style={{fontSize:10,fontWeight:600,color:"#34a853",textTransform:"uppercase",letterSpacing:1}}>Al día ({paid.length})</div></div>
    <div style={{padding:"0 20px",display:"flex",flexDirection:"column",gap:6}}>{paid.map(u=><div key={u.id} style={{background:"#161616",borderRadius:14,padding:"12px 14px",display:"flex",alignItems:"center",gap:12}}>
      <img src={u.avatar} alt="" style={{width:36,height:36,borderRadius:"50%",objectFit:"cover",border:"2px solid #222"}}/>
      <div style={{flex:1}}><div style={{fontSize:13,fontWeight:600,color:"#fff"}}>{u.name}</div><div style={{fontSize:11,color:"#555"}}>{u.plan}</div></div>
      <div style={{fontSize:14,fontWeight:600,color:"#34a853"}}>{u.price}€</div>
    </div>)}</div>
  </div>;
};

// ============================================================
// ADMIN: PLANS
// ============================================================
const APlans=({users})=>{
  return <div style={{overflowY:"auto",height:"100%",paddingBottom:100}}>
    <Header left={<div/>} title="Tarifas" right={<div style={{width:36,height:36,borderRadius:12,background:"#c8ff00",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>{I.plus("#111")}</div>}/>
    <div style={{padding:"0 20px",display:"flex",flexDirection:"column",gap:12}}>{PLANS.map(p=>{
      const count=users.filter(u=>u.plan===p.name).length;
      const income=count*p.price;
      return <div key={p.id} style={{background:"#161616",borderRadius:20,padding:20,borderTop:`4px solid ${p.color}`}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}><div><div style={{fontSize:20,fontWeight:800,color:p.color,textTransform:"uppercase"}}>{p.name}</div><div style={{fontSize:24,fontWeight:700,color:"#fff",marginTop:4}}>{p.price}€<span style={{fontSize:14,color:"#666",fontWeight:500}}>/mes</span></div></div>{p.limit==="∞"&&<div style={{fontSize:36,fontWeight:300,color:p.color,opacity:.3}}>∞</div>}</div>
        <div style={{fontSize:13,color:"#888",marginBottom:14}}>{p.desc}</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:14}}>{CTYPES.map(ct=><span key={ct} style={{fontSize:10,fontWeight:600,padding:"3px 8px",borderRadius:6,background:"#2a2a2a",color:"#888"}}>{ct}</span>)}</div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{fontSize:12,color:"#666"}}><span style={{color:"#fff",fontWeight:600}}>{count}</span> alumnos · <span style={{color:p.color,fontWeight:600}}>{income}€</span>/mes</div>
          <div style={{fontSize:12,fontWeight:600,color:"#888",border:"1px solid #333",padding:"6px 14px",borderRadius:10,cursor:"pointer"}}>Editar</div>
        </div>
      </div>})}</div>
  </div>;
};

// ============================================================
// MAIN APP
// ============================================================
export default function GymApp(){
  const [screen,setScreen]=useState("login");
  const [cls,setCls]=useState(INIT_CLASSES);
  const [users,setUsers]=useState(INIT_USERS);
  const nav=s=>setScreen(s);
  const admin=["a-home","a-schedule","a-users","a-payments","a-plans"].includes(screen);

  const getScreen = () => {
    switch (screen) {
      case "login": return <Login onLogin={() => nav("home")} />;
      case "home": return <Home nav={nav} cls={cls} />;
      case "reservations": return <Reservations cls={cls} setCls={setCls} />;
      case "profile": return <Profile onBack={() => nav("home")} />;
      case "notifications": return <Notifs />;
      case "a-home": return <AHome cls={cls} nav={nav} />;
      case "a-schedule": return <ASchedule nav={nav} />;
      case "a-users": return <AUsers nav={nav} users={users} setUsers={setUsers} />;
      case "a-payments": return <APayments users={users} />;
      case "a-plans": return <APlans users={users} />;
      default: return <Home nav={nav} cls={cls} />;
    }
  };

  const currentScreen = getScreen();

  return (
    <div style={{background:"#0a0a0a",minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",fontFamily:"'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif",padding:20,gap:16}}>
      {screen !== "login" && (
        <div style={{display:"flex",gap:8}}>
          <button onClick={() => setScreen("home")} style={{padding:"8px 20px",borderRadius:12,border:"none",background:!admin?"#c8ff00":"#1a1a1a",color:!admin?"#111":"#666",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>Usuario</button>
          <button onClick={() => setScreen("a-home")} style={{padding:"8px 20px",borderRadius:12,border:"none",background:admin?"#c8ff00":"#1a1a1a",color:admin?"#111":"#666",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>Admin</button>
        </div>
      )}
      <div style={{width:393,height:852,background:"#111",borderRadius:44,overflow:"hidden",position:"relative",boxShadow:"0 0 60px rgba(200,255,0,.04),0 25px 80px rgba(0,0,0,.5)",border:"6px solid #1a1a1a"}}>
        <SBar />
        <div style={{height:"calc(100% - 48px)"}}>{currentScreen}</div>
        {screen !== "login" && <BNav active={screen} onNav={nav} admin={admin} />}
      </div>
      <style>{`*{-ms-overflow-style:none;scrollbar-width:none;}*::-webkit-scrollbar{display:none;}@keyframes spin{to{transform:rotate(360deg);}}input::placeholder{color:#444;}`}</style>
    </div>
  );
}
