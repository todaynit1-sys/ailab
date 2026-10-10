const services={
  "lecture": {
    "title": "실무 중심 AI 강의 문의",
    "label": "AI EDUCATION",
    "description": "AI 기본·AI 활용·업무 특화 교육을 진행합니다. 공공기관과 기업의 교육 대상, 업무 환경, 실습 여건에 맞춰 내용을 구성합니다.",
    "preparation": [
      "AI 기본: 생성형 AI 이해, 주요 도구 사용법, 안전한 활용",
      "AI 활용: 문서 작성, 자료 조사, 콘텐츠 제작과 프롬프트 실습",
      "업무 특화: 공공행정·기획·홍보 등 담당 업무에 맞춘 사례와 실습"
    ],
    "template": "[AI 교육 프로그램 문의]\n기관 / 기업명: \n교육 대상과 인원: \n희망 분야 (AI 기본 / AI 활용 / 업무 특화): \n다루고 싶은 업무 / 실습 여부: \n희망 일정 / 시간 / 장소: "
  },
  "website": {
    "title": "웹사이트 제작·협업 문의",
    "label": "WEB PROJECT",
    "description": "브랜드·기관·개인 홈페이지를 목적에 맞게 기획하고 제작합니다. 모바일과 PC에 맞춘 화면, 필요한 연결 기능, 공개와 활용 방식까지 함께 정합니다.",
    "preparation": [
      "소개·서비스·갤러리·프로필 등 콘텐츠와 페이지 구성",
      "카카오톡·전화·지도·SNS 연결, 검색·공유 기본 정보 설정",
      "시안 확인과 수정, 배포 주소·소스 전달 및 활용 안내"
    ],
    "template": "[웹사이트 제작·협업 문의]\n기관 / 브랜드 / 활동명: \n소개할 내용과 이용 대상: \n필요한 페이지 / 기능 (문의·지도·갤러리 등): \n참고 사이트: \n보유 자료 (로고·사진·원고): \n도메인 / 공개 방식: \n희망 일정: "
  },
  "video": {
    "title": "AI 영상·콘텐츠 협업 문의",
    "label": "AI CONTENT",
    "description": "AI를 활용한 소개 영상과 세로형 콘텐츠를 제작합니다. 전달할 메시지부터 시나리오, 화면·음성 연출, 자막과 편집까지 사용 목적에 맞춰 구성합니다.",
    "preparation": [
      "기관·브랜드 소개, 홍보 영상, 세로형 숏폼",
      "시나리오·대사와 AI 이미지·음성 연출",
      "자막·배경음·썸네일 및 채널에 맞춘 편집"
    ],
    "template": "[AI 영상·콘텐츠 협업 문의]\n전달할 내용 / 대상: \n사용할 채널: \n희망 길이 / 연출 방향: \n참고 영상: \n보유 자료 / 희망 일정: "
  },
  "career": {
    "title": "바이브코딩 프로젝트 문의",
    "label": "VIBE CODING",
    "description": "지원 직무와 연결되는 앱을 직접 만들고 설명할 수 있도록 함께합니다. 주제 기획부터 바이브코딩 실습, 작동하는 웹앱과 포트폴리오 정리까지 진행합니다.",
    "preparation": [
      "지원 직무·채용 공고를 바탕으로 프로젝트 주제 기획",
      "바이브코딩으로 웹앱 구현, 배포 주소·소스·설명 자료 정리",
      "이력서·포트폴리오 문장과 면접에서 설명할 제작 과정 정리"
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
/* Motion has an explicit pause control and follows the system preference. */
const motionPreference=window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointer=window.matchMedia('(hover: hover) and (pointer: fine)');
const motionToggle=document.querySelector('.motion-toggle');
const motionLabel=document.querySelector('.motion-label');
const scenes=[...document.querySelectorAll('.viz-scene')];
let effectsPaused=false;
let motionEnabled=false;
const revealTargets=[...document.querySelectorAll('.education-panel,.section-heading,.project,.book,.contact')];
revealTargets.forEach(element=>element.classList.add('reveal-item'));
const revealObserver='IntersectionObserver' in window?new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.remove('reveal-waiting');revealObserver.unobserve(entry.target);}});
},{threshold:.08}):null;
const sceneObserver='IntersectionObserver' in window?new IntersectionObserver(entries=>{
  entries.forEach(entry=>{entry.target.dataset.visible=String(entry.isIntersecting);});
},{threshold:.05}):null;
scenes.forEach(scene=>{scene.dataset.visible=String(!sceneObserver);if(sceneObserver)sceneObserver.observe(scene);});
function applyMotion(){
  motionEnabled=!effectsPaused&&!motionPreference.matches;
  document.documentElement.dataset.motion=motionEnabled?'on':'off';
  motionToggle.hidden=motionPreference.matches;
  motionToggle.setAttribute('aria-pressed',String(effectsPaused));
  motionLabel.textContent=effectsPaused?'효과 다시 켜기':'효과 일시 정지';
  if(!motionEnabled){
    revealTargets.forEach(element=>element.classList.remove('reveal-waiting'));
    scenes.forEach(scene=>{scene.style.removeProperty('--tilt-x');scene.style.removeProperty('--tilt-y');});
  }
}
applyMotion();
if(motionEnabled&&revealObserver){
  revealTargets.forEach(element=>{
    if(element.getBoundingClientRect().top>window.innerHeight){element.classList.add('reveal-waiting');revealObserver.observe(element);}
  });
}
document.addEventListener('focusin',event=>{
  const target=event.target.closest('.reveal-waiting');
  if(target){target.classList.remove('reveal-waiting');if(revealObserver)revealObserver.unobserve(target);}
});
motionToggle.addEventListener('click',()=>{effectsPaused=!effectsPaused;applyMotion();});
motionPreference.addEventListener('change',applyMotion);
scenes.forEach(scene=>{
  let pendingFrame=0;
  scene.addEventListener('pointermove',event=>{
    if(!motionEnabled||!finePointer.matches||event.pointerType==='touch')return;
    const bounds=scene.getBoundingClientRect();
    const x=Math.max(-1,Math.min(1,((event.clientX-bounds.left)/bounds.width-.5)*2));
    const y=Math.max(-1,Math.min(1,((event.clientY-bounds.top)/bounds.height-.5)*2));
    cancelAnimationFrame(pendingFrame);
    pendingFrame=requestAnimationFrame(()=>{
      if(!motionEnabled)return;
      scene.style.setProperty('--tilt-x',(-y*3).toFixed(2)+'deg');
      scene.style.setProperty('--tilt-y',(x*3).toFixed(2)+'deg');
    });
  },{passive:true});
  scene.addEventListener('pointerleave',()=>{
    cancelAnimationFrame(pendingFrame);
    scene.style.removeProperty('--tilt-x');scene.style.removeProperty('--tilt-y');
  });
});
let progressFrame=0;
function updateReadingProgress(){
  const distance=document.documentElement.scrollHeight-window.innerHeight;
  const progress=distance>0?Math.max(0,Math.min(1,window.scrollY/distance)):0;
  document.documentElement.style.setProperty('--reading-progress',progress.toFixed(4));
  progressFrame=0;
}
function scheduleProgress(){if(!progressFrame)progressFrame=requestAnimationFrame(updateReadingProgress);}
window.addEventListener('scroll',scheduleProgress,{passive:true});
window.addEventListener('resize',scheduleProgress,{passive:true});
updateReadingProgress();
