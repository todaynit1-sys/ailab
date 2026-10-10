const services={
  "lecture": {
    "title": "실무 중심 AI 강의 문의",
    "label": "AI EDUCATION",
    "description": "AI 기본·활용·업무 특화 강의를 대상과 실습 여건에 맞춰 진행합니다.",
    "preparation": [
      "AI 기본: AI 이해·도구 사용·안전한 활용",
      "AI 활용: 문서·자료 조사·콘텐츠 제작 실습",
      "업무 특화: 공공행정·기획·홍보 맞춤 실습"
    ],
    "template": "[AI 교육 프로그램 문의]\n기관 / 기업명: \n교육 대상과 인원: \n희망 분야 (AI 기본 / AI 활용 / 업무 특화): \n다루고 싶은 업무 / 실습 여부: \n희망 일정 / 시간 / 장소: "
  },
  "website": {
    "title": "홈페이지 제작·협업 문의",
    "label": "WEB PROJECT",
    "description": "기관·브랜드·개인 홈페이지를 기획부터 공개까지 함께 만듭니다.",
    "preparation": [
      "소개·서비스·갤러리·프로필 구성",
      "반응형 화면·문의 연결·검색과 공유 설정",
      "시안 확인·수정, 공개 주소·소스 코드 전달"
    ],
    "template": "[홈페이지 제작·협업 문의]\n기관 / 브랜드 / 활동명: \n소개할 내용과 이용 대상: \n필요한 페이지 / 기능 (문의·지도·갤러리 등): \n참고 사이트: \n보유 자료 (로고·사진·원고): \n도메인 / 공개 방식: \n희망 일정: "
  },
  "video": {
    "title": "AI 영상·교육 콘텐츠 문의",
    "label": "AI CONTENT",
    "description": "소개 영상과 장면을 선택해 보는 교육 콘텐츠를 만듭니다.",
    "preparation": [
      "소개 영상·홍보 영상·숏폼",
      "시나리오·AI 이미지·음성",
      "애니메이션·자막·장면 선택"
    ],
    "template": "[AI 영상·교육 콘텐츠 협업 문의]\n형태 (영상 / 교육 애니메이션 / 장면 선택형 웹 콘텐츠): \n전달할 내용 / 대상: \n사용할 채널: \n희망 길이 / 연출 방향: \n참고 영상: \n보유 자료 / 희망 일정: "
  },
  "career": {
    "title": "바이브코딩 취업용 앱 문의",
    "label": "VIBE CODING",
    "description": "AI와 대화하며 앱을 만들고, 포트폴리오로 정리합니다.",
    "preparation": [
      "지원 직무에 맞는 앱 주제 기획",
      "웹앱 제작·공개와 소스 코드 정리",
      "포트폴리오·면접 설명 정리"
    ],
    "template": "[바이브코딩 취업용 앱 프로젝트 문의]\n지원 직무 / 채용 공고: \n만들고 싶은 앱 / 해결할 문제: \n현재 경험과 배우고 싶은 내용: \n희망 일정: "
  }
};
const dialog=document.querySelector('#inquiry-dialog');
const inquiry=document.querySelector('#inquiry');
const status=document.querySelector('#copy-status');
const error=document.querySelector('#inquiry-error');
let opener;
document.querySelectorAll('[data-service]').forEach(button=>button.addEventListener('click',()=>{
const service=services[button.dataset.service];opener=button;
document.querySelector('#dialog-title').textContent=service.title;
document.querySelector('#dialog-label').textContent=service.label;
document.querySelector('#dialog-description').textContent=service.description;
const list=document.querySelector('#dialog-preparation');list.replaceChildren();
service.preparation.forEach(text=>{const li=document.createElement('li');li.textContent=text;list.append(li);});
inquiry.value='AI전략연구소 이선영 소장·신현준 소장님께\n\n'+service.template;
error.hidden=true;inquiry.removeAttribute('aria-invalid');status.textContent='';
dialog.dataset.service=button.dataset.service;dialog.showModal();
dialog.scrollTop=0;document.querySelector('.close-dialog').focus({preventScroll:true});
}));
document.querySelector('.close-dialog').addEventListener('click',()=>dialog.close());
dialog.addEventListener('close',()=>{if(opener)opener.focus({preventScroll:true});});
dialog.addEventListener('click',event=>{
if(event.target!==dialog)return;
const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();
});
inquiry.addEventListener('input',()=>{error.hidden=true;inquiry.removeAttribute('aria-invalid');status.textContent='';});
document.querySelector('#inquiry-form').addEventListener('submit',async event=>{
event.preventDefault();error.hidden=true;inquiry.removeAttribute('aria-invalid');
if(!inquiry.value.trim()){error.textContent='문의할 내용을 적어주세요.';error.hidden=false;inquiry.setAttribute('aria-invalid','true');inquiry.focus();return;}
try{
if(!navigator.clipboard)throw new Error('Clipboard unavailable');
await navigator.clipboard.writeText(inquiry.value.trim());
status.textContent=services[dialog.dataset.service].title+' 내용을 복사했습니다. 카카오톡에서 붙여넣어 보내주세요.';
}catch{inquiry.focus();inquiry.select();status.textContent='자동 복사를 사용할 수 없습니다. 선택된 문의 내용을 직접 복사해주세요.';}
});

/* One motion switch governs decorative effects and the original lab explainer. */
const motionPreference=matchMedia('(prefers-reduced-motion: reduce)');
const finePointer=matchMedia('(hover: hover) and (pointer: fine)');
const root=document.documentElement;
const motionToggle=document.querySelector('.motion-toggle');
const motionLabel=document.querySelector('.motion-label');
const hero=document.querySelector('.hero');
const demo=document.querySelector('.lab-demo');
const stage=document.querySelector('.demo-stage');
const demoScreens=[...document.querySelectorAll('[data-scene]')];
const stepButtons=[...document.querySelectorAll('[data-demo-step]')];
const playButton=document.querySelector('.demo-play');
const playLabel=document.querySelector('.demo-play-label');
const demoTime=document.querySelector('.demo-time');
const demoAnnouncement=document.querySelector('.demo-announcement');
let effectsPaused=false,motionEnabled=false,heroVisible=true,demoVisible=false;
let demoRunning=false,demoElapsed=0,currentStep=0;
const duration=32000;
const sceneNames=['문제 발견','기능 설계','앱 구현','과정 설명'];
function selectScene(step,announce=false){
  currentStep=step;
  stage.dataset.step=String(step);
  demoScreens.forEach((screen,index)=>{screen.hidden=index!==step;});
  stepButtons.forEach((button,index)=>button.setAttribute('aria-pressed',String(index===step)));
  if(announce)demoAnnouncement.textContent=(step+1)+'번째 장면: '+sceneNames[step];
}
function updateDemoControls(){
  playButton.setAttribute('aria-pressed',String(demoRunning));
  playButton.disabled=!motionEnabled;
  playLabel.textContent=!motionEnabled?'장면을 선택해 살펴보세요':demoRunning?'재생 일시 정지':demoElapsed>=duration?'처음부터 다시 재생':demoElapsed>0?'이어서 재생':'전체 과정 재생';
  playButton.firstElementChild.textContent=demoRunning?'Ⅱ':'▷';
  demoTime.textContent=demoElapsed>0?Math.floor(demoElapsed/1000)+' / 32초':'4개 장면 · 32초';
}
const revealTargets=[...document.querySelectorAll('.education-panel,.section-heading,.project,.lab-intro,.demo-console,.lab-outro,.book,.contact')];
revealTargets.forEach((item,index)=>{item.classList.add('reveal-item');if(item.classList.contains('book'))item.style.setProperty('--reveal-delay',(index%4)*65+'ms');});
const revealObserver='IntersectionObserver' in window?new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.remove('reveal-waiting');revealObserver.unobserve(entry.target);}});
},{threshold:.08}):null;
const viewObserver='IntersectionObserver' in window?new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    entry.target.dataset.inView=String(entry.isIntersecting);
    if(entry.target===hero)heroVisible=entry.isIntersecting;
    if(entry.target===demo)demoVisible=entry.isIntersecting;
  });
  scheduleAnimation();
},{threshold:0}):null;
document.querySelectorAll('.hero,.education,.projects,.lab-demo').forEach(section=>{section.dataset.inView='true';if(viewObserver)viewObserver.observe(section);});
const canvas=document.querySelector('.constellation');
const context=canvas.getContext('2d');
let particles=[],canvasWidth=0,canvasHeight=0,animationFrame=0,lastFrame=0,lastPaint=0;
function resizeNetwork(){
  if(!context)return;
  const bounds=hero.getBoundingClientRect();
  canvasWidth=bounds.width;canvasHeight=bounds.height;
  const scale=Math.min(devicePixelRatio||1,1.5);
  canvas.width=Math.round(canvasWidth*scale);canvas.height=Math.round(canvasHeight*scale);
  context.setTransform(scale,0,0,scale,0,0);
  const count=canvasWidth<760?28:65;
  particles=Array.from({length:count},()=>({x:Math.random()*canvasWidth,y:Math.random()*canvasHeight,vx:(Math.random()-.5)*.14,vy:(Math.random()-.5)*.12,r:Math.random()*1.3+.4}));
  drawNetwork(0);
}
function drawNetwork(delta){
  if(!context)return;
  context.clearRect(0,0,canvasWidth,canvasHeight);
  for(const point of particles){
    point.x=(point.x+point.vx*delta+canvasWidth)%canvasWidth;
    point.y=(point.y+point.vy*delta+canvasHeight)%canvasHeight;
    context.beginPath();context.arc(point.x,point.y,point.r,0,Math.PI*2);context.fillStyle='#8ebaff';context.fill();
  }
  for(let i=0;i<particles.length;i++)for(let j=i+1;j<particles.length;j++){
    const a=particles[i],b=particles[j],distance=Math.hypot(a.x-b.x,a.y-b.y);
    if(distance<125){context.strokeStyle='rgba(110,166,255,'+((1-distance/125)*.18)+')';context.beginPath();context.moveTo(a.x,a.y);context.lineTo(b.x,b.y);context.stroke();}
  }
}
function animationTick(time){
  animationFrame=0;
  const delta=lastFrame?Math.min(time-lastFrame,50):0;lastFrame=time;
  if(motionEnabled&&!document.hidden&&heroVisible&&time-lastPaint>32){
    drawNetwork(delta/16.67*2);lastPaint=time;
  }
  if(motionEnabled&&!document.hidden&&demoRunning&&demoVisible){
    demoElapsed=Math.min(duration,demoElapsed+delta);
    const next=Math.min(3,Math.floor(demoElapsed/8000));
    if(next!==currentStep)selectScene(next);
    stage.parentElement.style.setProperty('--demo-progress',(demoElapsed/duration).toFixed(4));
    const seconds=Math.floor(demoElapsed/1000);
    if(demoTime.textContent!==seconds+' / 32초')demoTime.textContent=seconds+' / 32초';
    if(demoElapsed>=duration){demoRunning=false;updateDemoControls();demoAnnouncement.textContent='전체 과정 재생이 끝났습니다. 장면을 선택해 다시 살펴볼 수 있습니다.';}
  }
  scheduleAnimation();
}
function scheduleAnimation(){
  const needed=motionEnabled&&!document.hidden&&(heroVisible||demoRunning&&demoVisible);
  if(needed&&!animationFrame)animationFrame=requestAnimationFrame(animationTick);
  else if(!needed){cancelAnimationFrame(animationFrame);animationFrame=0;lastFrame=0;}
}
function applyMotion(){
  motionEnabled=!effectsPaused&&!motionPreference.matches;
  root.dataset.motion=motionEnabled&&!document.hidden?'on':'off';
  motionToggle.hidden=false;
  motionToggle.disabled=motionPreference.matches;
  motionToggle.setAttribute('aria-pressed',String(effectsPaused||motionPreference.matches));
  motionLabel.textContent=motionPreference.matches?'움직임 줄이기 적용 중':effectsPaused?'효과 다시 켜기':'효과 일시 정지';
  if(!motionEnabled){
    demoRunning=false;
    revealTargets.forEach(item=>item.classList.remove('reveal-waiting'));
    document.querySelectorAll('.tilt-surface').forEach(item=>{item.style.removeProperty('--tilt-x');item.style.removeProperty('--tilt-y');});
  }
  updateDemoControls();scheduleAnimation();
}
motionToggle.addEventListener('click',()=>{effectsPaused=!effectsPaused;applyMotion();});
motionPreference.addEventListener('change',applyMotion);
document.addEventListener('visibilitychange',applyMotion);
playButton.addEventListener('click',()=>{
  if(!motionEnabled)return;
  if(demoElapsed>=duration){demoElapsed=0;selectScene(0);stage.parentElement.style.setProperty('--demo-progress','0');}
  demoRunning=!demoRunning;
  updateDemoControls();scheduleAnimation();
});
stepButtons.forEach(button=>button.addEventListener('click',()=>{
  const step=Number(button.dataset.demoStep);
  demoElapsed=step*8000;
  selectScene(step,true);
  stage.parentElement.style.setProperty('--demo-progress',(demoElapsed/duration).toFixed(4));
  updateDemoControls();scheduleAnimation();
}));
resizeNetwork();applyMotion();
if(motionEnabled&&revealObserver)revealTargets.forEach(item=>{
  if(item.getBoundingClientRect().top>innerHeight){item.classList.add('reveal-waiting');revealObserver.observe(item);}
});
document.querySelectorAll('.hero-copy>*').forEach((item,index)=>item.style.setProperty('--intro-delay',(index*85)+'ms'));
document.addEventListener('focusin',event=>{
  const target=event.target.closest('.reveal-waiting');
  if(target){target.classList.remove('reveal-waiting');revealObserver?.unobserve(target);}
});
document.querySelectorAll('.tilt-surface').forEach(surface=>{
  let pending=0;
  surface.addEventListener('pointermove',event=>{
    if(!motionEnabled||!finePointer.matches||event.pointerType==='touch')return;
    const bounds=surface.getBoundingClientRect();
    const x=Math.max(-1,Math.min(1,(event.clientX-bounds.left)/bounds.width*2-1));
    const y=Math.max(-1,Math.min(1,(event.clientY-bounds.top)/bounds.height*2-1));
    cancelAnimationFrame(pending);pending=requestAnimationFrame(()=>{
      if(!motionEnabled)return;
      surface.style.setProperty('--tilt-x',(-y*4).toFixed(2)+'deg');surface.style.setProperty('--tilt-y',(x*4).toFixed(2)+'deg');
    });
  },{passive:true});
  surface.addEventListener('pointerleave',()=>{cancelAnimationFrame(pending);surface.style.removeProperty('--tilt-x');surface.style.removeProperty('--tilt-y');});
});
let progressFrame=0;
function updateReadingProgress(){
  const distance=root.scrollHeight-innerHeight;
  root.style.setProperty('--reading-progress',String(distance>0?Math.max(0,Math.min(1,scrollY/distance)):0));
  progressFrame=0;
}
function scheduleProgress(){if(!progressFrame)progressFrame=requestAnimationFrame(updateReadingProgress);}
window.addEventListener('scroll',scheduleProgress,{passive:true});
window.addEventListener('resize',()=>{resizeNetwork();scheduleProgress();},{passive:true});
updateReadingProgress();
if('IntersectionObserver' in window){
  const sectionObserver=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{if(entry.isIntersecting)document.querySelectorAll('.site-header nav a').forEach(link=>{
      if(link.getAttribute('href')==='#'+entry.target.id)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');
    });});
  },{rootMargin:'-20% 0px -55% 0px',threshold:0});
  document.querySelectorAll('main>section[id]').forEach(section=>sectionObserver.observe(section));
}
