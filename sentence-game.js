"use strict";
const SENTENCES = [
 {meaning:'Tôi uống nước',parts:['わたし','は','水','を','飲みます','。'],reading:'わたしはみずをのみます。'},
 {meaning:'Đây là một quyển sách',parts:['これ','は','本','です','。'],reading:'これはほんです。'},
 {meaning:'Tôi đi đến trường',parts:['わたし','は','学校','へ','行きます','。'],reading:'わたしはがっこうへいきます。'},
 {meaning:'Con mèo đang ngủ',parts:['猫','が','寝ています','。'],reading:'ねこがねています。'},
 {meaning:'Hôm nay trời đẹp',parts:['今日','は','いい','天気','です','。'],reading:'きょうはいいてんきです。'},
 {meaning:'Tôi ăn táo',parts:['わたし','は','りんご','を','食べます','。'],reading:'わたしはりんごをたべます。'},
 {meaning:'Bạn có khỏe không?',parts:['お元気','です','か','。'],reading:'おげんきですか。'},
 {meaning:'Ngày mai tôi sẽ học tiếng Nhật',parts:['明日','日本語','を','勉強します','。'],reading:'あしたにほんごをべんきょうします。'},
 {meaning:'Tôi muốn uống trà',parts:['お茶','を','飲みたい','です','。'],reading:'おちゃをのみたいです。'},
 {meaning:'Tôi đi bằng tàu điện',parts:['電車','で','行きます','。'],reading:'でんしゃでいきます。'},
 {meaning:'Bây giờ là 7 giờ',parts:['今','は','七時','です','。'],reading:'いまはしちじです。'},
 {meaning:'Tôi thích tiếng Nhật',parts:['日本語','が','好き','です','。'],reading:'にほんごがすきです。'}
];
let sentenceIndex=0, sentencePicked=[], sentenceBank=[], sentenceCompleted={};
try{sentenceCompleted=JSON.parse(localStorage.getItem('nq-sentence-completed')||'{}')}catch(e){}
function sentenceShuffle(a){for(let i=a.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function sentenceRender(){let s=SENTENCES[sentenceIndex];document.getElementById('sentenceLevel').textContent=`Bài ${sentenceIndex+1}/${SENTENCES.length} · Đã hoàn thành ${Object.keys(sentenceCompleted).length}`;document.getElementById('sentenceMeaning').textContent=s.meaning;const a=document.getElementById('sentenceAnswer'),b=document.getElementById('sentenceBank');a.replaceChildren();b.replaceChildren();for(const id of sentencePicked){const el=document.createElement('button');el.className='token';el.textContent=s.parts[id];el.onclick=()=>{sentencePicked=sentencePicked.filter(x=>x!==id);sentenceBank.push(id);sentenceRender()};a.append(el)}for(const id of sentenceBank){const el=document.createElement('button');el.className='token';el.textContent=s.parts[id];el.onclick=()=>{sentenceBank=sentenceBank.filter(x=>x!==id);sentencePicked.push(id);sentenceRender()};b.append(el)}}
function sentenceReset(){sentencePicked=[];sentenceBank=sentenceShuffle(SENTENCES[sentenceIndex].parts.map((_,i)=>i));document.getElementById('sentenceFeedback').textContent='';sentenceRender()}
function sentenceCheck(){const s=SENTENCES[sentenceIndex],f=document.getElementById('sentenceFeedback');if(sentencePicked.length!==s.parts.length){f.textContent='Hãy ghép đủ tất cả các từ nhé!';return}const ok=sentencePicked.every((id,i)=>id===i);if(ok){f.textContent='🎉 Chính xác! +15 XP';if(!sentenceCompleted[sentenceIndex]){sentenceCompleted[sentenceIndex]=true;localStorage.setItem('nq-sentence-completed',JSON.stringify(sentenceCompleted));if(typeof earn==='function')earn(15)}sentenceSpeak()}else{let n=0;for(let i=0;i<sentencePicked.length;i++)if(sentencePicked[i]===i)n++;f.textContent=`Chưa đúng. Có ${n}/${s.parts.length} từ đúng vị trí. Hãy thử lại!`}}
function sentenceNext(){sentenceIndex=(sentenceIndex+1)%SENTENCES.length;sentenceReset()}
function sentenceHint(){const s=SENTENCES[sentenceIndex];document.getElementById('sentenceFeedback').textContent=`Gợi ý: câu bắt đầu bằng “${s.parts[0]}”`}
function sentenceSpeak(){const s=SENTENCES[sentenceIndex];if(typeof speak==='function')speak(s.reading)}
async function assessPronunciation(){const out=document.getElementById('pronunciationResult'),url=window.NIHONGO_CONFIG?.pronunciationApiUrl;if(!url){out.textContent='Chưa kết nối dịch vụ chấm phát âm. Hãy cấu hình máy chủ API trước. Không có điểm giả.';return}if(typeof recordChunks==='undefined'||!recordChunks.length){out.textContent='Hãy nhấn Ghi âm, nói câu mẫu rồi Dừng ghi âm trước.';return}try{out.textContent='Đang phân tích bản ghi âm...';const blob=new Blob(recordChunks,{type:mediaRecorder?.mimeType||'audio/webm'});const form=new FormData();form.append('audio',blob,'pronunciation.webm');form.append('referenceText',speechItems[speechIndex][0]);form.append('locale','ja-JP');const response=await fetch(url,{method:'POST',body:form});const data=await response.json();if(!response.ok)throw new Error(data.error||'HTTP '+response.status);if(typeof data.accuracyScore!=='number')throw new Error('API không trả về điểm đánh giá thật');const parts=[`Độ chính xác: ${data.accuracyScore}/100`];if(typeof data.fluencyScore==='number')parts.push(`Độ trôi chảy: ${data.fluencyScore}/100`);if(typeof data.completenessScore==='number')parts.push(`Độ đầy đủ: ${data.completenessScore}/100`);if(typeof data.pronScore==='number')parts.push(`Tổng: ${data.pronScore}/100`);out.textContent=parts.join(' · ')}catch(e){out.textContent='Chưa chấm được: '+e.message}}
sentenceReset();
