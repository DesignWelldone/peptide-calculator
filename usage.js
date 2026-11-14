// VialTrack: private, on-device usage (same format as the other DesignWelldone apps).
// Stores only screen names, visit counts, focused time and last-used dates in localStorage.
// Never doses, vials, notes or anything typed. Nothing is sent anywhere.
(function(){
  'use strict';
  var KEY='dwd-vialtrack-usage-v1', RETENTION_DAYS=90, DAY=86400000, MAX_COUNT=100000, MAX_SERIALIZED=512000, TICK=15000, IDLE_LIMIT=300000;
  var AREAS={
    home:{label:'Home',group:'Overview'}, board:{label:'Status board',group:'Overview'},
    calculator:{label:'Calculator',group:'Calculate'}, nasal:{label:'Nasal calculator',group:'Calculate'},
    tracker:{label:'Protocol tracker',group:'Track'}, inventory:{label:'Inventory',group:'Track'},
    weight:{label:'Weight',group:'Track'}, history:{label:'History',group:'Track'},
    more:{label:'Settings',group:'Settings'}, usage:{label:'Your usage',group:'Settings'}
  };
  function has(o,k){return Object.prototype.hasOwnProperty.call(o,k);}
  function dateKey(t){return new Date(t).toISOString().slice(0,10);}
  function oldestDay(now,days){return dateKey(now-((days||RETENTION_DAYS)-1)*DAY);}
  function isObj(v){return !!v&&typeof v==='object'&&!Array.isArray(v);}
  function count(v,max){return Number.isSafeInteger(v)&&v>0?Math.min(v,max||MAX_COUNT):0;}
  function stamp(v,now){return Number.isSafeInteger(v)&&v>0&&v<=now?v:0;}
  function emptyRow(){return {visits:0,activeMs:0,lastUsed:0,actions:{}};}
  function initial(){return {version:1,enabled:true,changedAt:0,days:{}};}
  function store(){try{return window.localStorage;}catch(e){return null;}}
  function normalize(raw,now){
    var u=initial(); if(!isObj(raw)||raw.version!==1) return u;
    u.enabled=raw.enabled!==false; u.changedAt=stamp(raw.changedAt,now); if(!isObj(raw.days)) return u;
    var cutoff=oldestDay(now), today=dateKey(now);
    Object.keys(raw.days).forEach(function(day){
      var entries=raw.days[day]; if(!/^\d{4}-\d{2}-\d{2}$/.test(day)||day<cutoff||day>today||!isObj(entries)) return;
      var kept={};
      Object.keys(entries).forEach(function(area){
        var e=entries[area]; if(!has(AREAS,area)||!isObj(e)) return;
        var r=emptyRow(); r.visits=count(e.visits); r.activeMs=count(e.activeMs,DAY); r.lastUsed=stamp(e.lastUsed,now);
        if(!r.lastUsed||dateKey(r.lastUsed)!==day) return;
        if(r.visits||r.activeMs) kept[area]=r;
      });
      if(Object.keys(kept).length) u.days[day]=kept;
    });
    return u;
  }
  function read(now){
    now=now||Date.now(); var s=store(); if(!s) return {available:false,data:initial()};
    try{var raw=s.getItem(KEY),d; if(raw&&raw.length<=MAX_SERIALIZED){try{d=JSON.parse(raw);}catch(e){}} return {available:true,data:normalize(d,now)};}
    catch(e){return {available:false,data:initial()};}
  }
  function save(d){try{var raw=JSON.stringify(d); if(raw.length>MAX_SERIALIZED) return false; store().setItem(KEY,raw); return true;}catch(e){return false;}}
  function configure(opts){var now=Date.now(),r=read(now); if(!r.available) return false; if(typeof opts.enabled==='boolean') r.data.enabled=opts.enabled; if(opts.clear) r.data.days={}; r.data.changedAt=now; return save(r.data);}
  function record(area,kind,from,until){
    var now=Date.now(); if(!has(AREAS,area)) return false; var r=read(now); if(!r.available||!r.data.enabled) return false; var d=r.data;
    function rowFor(t){var day=dateKey(t); d.days[day]=d.days[day]||{}; var row=d.days[day][area]=d.days[day][area]||emptyRow(); row.lastUsed=Math.max(row.lastUsed,t); return row;}
    if(kind==='active'){
      var end=until||now; if(!Number.isSafeInteger(from)||end>now) return false;
      var start=Math.max(from,d.changedAt,now-30000); if(start>=end) return false;
      var midnight=Math.floor(end/DAY)*DAY;
      if(start<midnight){var p=rowFor(midnight-1); p.activeMs=Math.min(DAY,p.activeMs+midnight-start);}
      if(end>Math.max(start,midnight)){var t=rowFor(end); t.activeMs=Math.min(DAY,t.activeMs+end-Math.max(start,midnight));}
    } else { var row=rowFor(now); row.visits=Math.min(MAX_COUNT,row.visits+1); }
    return save(d);
  }
  function summary(d,days){
    var now=Date.now(), cutoff=oldestDay(now,Math.max(1,Math.min(days,RETENTION_DAYS))), totals={};
    var n=normalize(d,now);
    Object.keys(n.days).forEach(function(day){ if(day<cutoff) return; Object.keys(n.days[day]).forEach(function(area){
      var r=n.days[day][area], t=totals[area]=totals[area]||{area:area,visits:0,activeMs:0,lastUsed:0};
      t.visits+=r.visits; t.activeMs+=r.activeMs; t.lastUsed=Math.max(t.lastUsed,r.lastUsed);
    });});
    return Object.keys(totals).map(function(k){return totals[k];}).sort(function(a,b){return b.visits-a.visits||b.activeMs-a.activeMs||a.area.localeCompare(b.area);});
  }
  // Tracking
  var visited=null,current=null,began=0,lastInput=0;
  function areaNow(){try{return has(AREAS,currentView)?currentView:null;}catch(e){return null;}}
  function focused(){return document.visibilityState==='visible'&&(document.hasFocus?document.hasFocus():true);}
  function flush(t){ if(current===null) return; var until=Math.min(t,lastInput+IDLE_LIMIT,began+2*TICK); if(until>began) record(current,'active',began,until); current=null; }
  function refresh(t,intent){ t=t||Date.now(); flush(t); if(intent) lastInput=t; if(!focused()) return; var a=areaNow(); if(a!==visited&&a!==null) record(a,'visit'); visited=a; current=a; began=t; }
  function noteInput(e){ if(!e.isTrusted||!focused()) return; var t=Date.now(); if(t-lastInput>IDLE_LIMIT||areaNow()!==current) refresh(t,true); else lastInput=t; }
  ['pointerdown','keydown','wheel','touchstart'].forEach(function(type){document.addEventListener(type,noteInput,{passive:true,capture:true});});
  document.addEventListener('visibilitychange',function(){refresh(Date.now(),focused());});
  ['focus','pageshow','popstate'].forEach(function(type){window.addEventListener(type,function(){refresh(Date.now(),true);});});
  ['pagehide','blur'].forEach(function(type){window.addEventListener(type,function(){flush(Date.now());});});
  setInterval(function(){refresh(Date.now());},TICK);
  // Screen
  var num=new Intl.NumberFormat();
  function duration(ms){ if(ms===0) return '0 min'; if(ms<60000) return '<1 min'; var m=Math.floor(ms/60000); return m<60?num.format(m)+' min':num.format(Math.floor(m/60))+' h '+(m%60)+' min'; }
  function el(tag,cls,text){var e=document.createElement(tag); if(cls) e.className=cls; if(text!==undefined) e.textContent=text; return e;}
  var confirmClear=false;
  function render(message){
    var list=document.getElementById('usageList'); if(!list) return;
    var r=read(), rangeEl=document.getElementById('usageRange'), days=Number(rangeEl?rangeEl.value:30)||30;
    var rows=summary(r.data,days), any=Object.keys(r.data.days).length>0, date=new Intl.DateTimeFormat(undefined,{dateStyle:'medium'});
    list.replaceChildren();
    if(!rows.length){ var empty=el('div','moreStaticRow'); var sp=el('span'); sp.append(el('strong','',any?'No activity in this time range.':'Use VialTrack for a bit to start seeing activity here.')); empty.append(sp); list.append(empty); }
    rows.forEach(function(row){ var item=el('div','moreStaticRow'), sp=el('span'); sp.append(el('strong','',AREAS[row.area].label), el('small','',AREAS[row.area].group+' · '+num.format(row.visits)+(row.visits===1?' visit · ':' visits · ')+duration(row.activeMs)+' · last used '+date.format(row.lastUsed))); item.append(sp); list.append(item); });
    var visits=rows.reduce(function(s,x){return s+x.visits;},0), time=rows.reduce(function(s,x){return s+x.activeMs;},0);
    var line=document.getElementById('usageSummaryLine'); if(line) line.textContent=rows.length?num.format(visits)+(visits===1?' visit · ':' visits · ')+duration(time)+' focused':'No activity yet.';
    var label=document.getElementById('usageToggleLabel'); if(label) label.textContent=r.data.enabled?'Pause Tracking':'Resume Tracking';
    var tg=document.getElementById('usageToggle'), cl=document.getElementById('usageClear');
    if(tg) tg.disabled=!r.available; if(cl){ cl.disabled=!r.available||!any; cl.querySelector('strong').textContent=confirmClear?'Tap again to clear usage data':'Clear Usage Data'; }
    var st=document.getElementById('usageStatus'); if(st) st.textContent=!r.available?"Usage can't be saved in this browser.":(message||(r.data.enabled?'':'Tracking is paused on this device.'));
  }
  function toggle(){var r=read(); configure({enabled:!r.data.enabled}); render(r.data.enabled?'Tracking paused on this device.':'Tracking resumed on this device.');}
  function clear(){ if(!confirmClear){ confirmClear=true; render(); setTimeout(function(){confirmClear=false; render();},5000); return; } confirmClear=false; configure({clear:true}); render('Usage data cleared from this device.'); }
  window.vtUsage={render:render,toggle:toggle,clear:clear,refresh:function(){refresh(Date.now(),true); if(areaNow()==='usage') render();}};
  refresh(Date.now(),true);
})();
