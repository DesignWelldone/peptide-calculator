/* Navigation owns no records and uses the app's existing view/history controller. */
let vialMenuOrigin = null;
let vialMenuScroll = 0;
let vialMenuRootAction = null;
function vialMenuPage(page){
  const dialog = q('vialNavigation');
  if(page !== 'main'){ vialMenuScroll = dialog.scrollTop; vialMenuRootAction=document.activeElement; }
  for(const name of ['main','vials','tools']) q('vialMenu'+name[0].toUpperCase()+name.slice(1)).hidden = name !== page;
  dialog.dataset.menuPage=page;
  q('vialMenuBack').hidden = page === 'main';
  q('vialMenuTitle').textContent = {main:'VialTrack',vials:'Vials',tools:'Tools'}[page];
  dialog.scrollTop = page === 'main' ? vialMenuScroll : 0;
  (page === 'main' ? (vialMenuRootAction || q('vialMenuMain').querySelector('button')) : q('vialMenuBack')).focus({preventScroll:true});
}
function openVialMenu(){
  const dialog=q('vialNavigation');
  if(dialog.open) return;
  vialMenuOrigin=document.activeElement;
  dialog.showModal(); vialMenuScroll=0; vialMenuRootAction=null; vialMenuPage('main');
  q('vialMenuButton').setAttribute('aria-expanded','true');
}
function closeVialMenu(){ q('vialNavigation').close(); }
function vialMenuGo(view){ closeVialMenu(); showView(view); }
function syncVialNavigation(view){
  const context=q('vialContext');
  context.classList.toggle('hidden', !['inventory','calculator','history'].includes(view));
  context.querySelectorAll('[data-vial-view]').forEach(button=>{
    if(button.dataset.vialView===view) button.setAttribute('aria-current','page'); else button.removeAttribute('aria-current');
  });
  document.querySelector('.vialDestinations [aria-current]')?.scrollIntoView({block:'nearest',inline:'nearest'});
}
q('vialNavigation').addEventListener('close',()=>{
  q('vialMenuButton').setAttribute('aria-expanded','false');
  if(vialMenuOrigin?.isConnected) vialMenuOrigin.focus({preventScroll:true});
});
q('vialNavigation').addEventListener('click',event=>{ if(event.target===q('vialNavigation') && event.clientX>q('vialNavigation').getBoundingClientRect().right) closeVialMenu(); });
document.body.dataset.vialView=currentView;
syncVialNavigation(currentView);

q('vialNavigation').addEventListener('cancel',event=>{event.preventDefault();if(q('vialNavigation').dataset.menuPage !== 'main') vialMenuPage('main');else closeVialMenu();});
