const services={
lecture:{title:'AI 강의 문의',label:'AI EDUCATION',description:'공공기관·기업의 교육 목적과 대상에 맞춰 AI 기초, 업무 활용, 실습 강의를 준비합니다.',preparation:['교육 대상과 예상 인원','배우고 싶은 주제와 실습 여부','희망 일정·강의 시간·장소'],template:'[AI 강의 문의]\n기관 / 기업명: \n교육 대상과 인원: \n희망 주제: \n희망 일정 / 시간: \n장소 / 온라인 여부: '},
website:{title:'홈페이지 제작 문의',label:'WEBSITE',description:'사업·브랜드·개인을 소개하는 홈페이지를 만듭니다. 소개할 내용과 필요한 기능부터 함께 정합니다.',preparation:['어떤 사업이나 활동을 소개하는지','필요한 페이지·기능 또는 참고 사이트','로고·사진·소개 자료와 희망 일정'],template:'[홈페이지 제작 문의]\n소개할 사업 / 활동: \n필요한 페이지와 기능: \n참고 사이트: \n준비된 자료: \n희망 일정: '},
video:{title:'AI 영상 제작 문의',label:'AI VIDEO',description:'AI를 활용한 홍보 영상과 숏폼을 제작합니다. 메시지, 화면 구성, 자막과 편집 방향을 먼저 이야기합니다.',preparation:['홍보할 브랜드·상품·서비스','사용할 채널, 길이와 원하는 분위기','사진·로고 등 보유 자료와 희망 일정'],template:'[AI 영상 제작 문의]\n홍보할 내용: \n사용할 채널: \n원하는 길이 / 분위기: \n참고 영상: \n준비된 자료 / 희망 일정: '},
career:{title:'취업용 앱 만들기 문의',label:'VIBE CODING',description:'지원 직무와 연결되는 앱을 바이브코딩으로 함께 만듭니다. 주제 기획부터 작동하는 결과물, 만든 과정과 활용 방법까지 정리합니다.',preparation:['지원하려는 직무나 채용 공고','만들고 싶은 앱 또는 풀고 싶은 문제','현재 경험과 희망 일정'],template:'[바이브코딩 취업용 앱 문의]\n지원 직무 / 채용 공고: \n만들고 싶은 앱 / 해결할 문제: \n현재 경험: \n직접 배우고 싶은 내용: \n희망 일정: '}
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
inquiry.value='AI전략연구소 신현준 소장·이선영 소장님께\n\n'+service.template;
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