const subjects=[
{icon:"➗",name:"Matematika",desc:"Aljabar, fungsi, geometri, dan latihan soal.",lesson:"Materi contoh: persamaan linear. Persamaan linear satu variabel dapat ditulis ax + b = 0 dengan a ≠ 0. Untuk mencari x, pindahkan konstanta lalu bagi dengan koefisien x."},
{icon:"🔬",name:"IPA",desc:"Konsep sains dan fenomena di kehidupan sehari-hari.",lesson:"Materi contoh: energi. Energi adalah kemampuan untuk melakukan kerja. Bentuknya antara lain energi kinetik, potensial, panas, cahaya, dan listrik."},
{icon:"🌏",name:"IPS",desc:"Sejarah, geografi, ekonomi, dan kehidupan sosial.",lesson:"Materi contoh: interaksi sosial. Interaksi sosial adalah hubungan timbal balik antara individu atau kelompok yang dapat terjadi melalui kontak sosial dan komunikasi."},
{icon:"📝",name:"Bahasa Indonesia",desc:"Membaca, menulis, teks, dan kemampuan berbahasa.",lesson:"Materi contoh: teks eksplanasi. Teks eksplanasi menjelaskan proses terjadinya suatu fenomena secara logis dan sistematis."}
];
const schedule=[
["Senin","07.30","Matematika"],["Senin","09.00","Bahasa Indonesia"],["Selasa","07.30","IPA"],["Selasa","10.00","IPS"],["Rabu","07.30","Matematika"],["Kamis","08.30","Bahasa Indonesia"],["Jumat","07.30","IPA"]
];
const quiz=[
{q:"Hasil dari 12 + 8 adalah …",o:["18","20","22","24"],a:1},
{q:"Planet yang dikenal sebagai Planet Merah adalah …",o:["Bumi","Venus","Mars","Jupiter"],a:2},
{q:"Teks yang menjelaskan proses terjadinya suatu fenomena disebut …",o:["Narasi","Eksplanasi","Deskripsi","Prosedur"],a:1}
];
let state=JSON.parse(localStorage.getItem("belajarPintar")||'{"done":0,"quiz":0,"points":120}');
function save(){localStorage.setItem("belajarPintar",JSON.stringify(state))}
function showPage(id){
 document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
 document.getElementById(id).classList.add("active");
 document.querySelectorAll(".nav").forEach(n=>n.classList.toggle("active",n.dataset.page===id));
 window.scrollTo(0,0); update();
}
function update(){
 const pct=Math.min(100,state.done*25+state.quiz*15);
 document.getElementById("progressBar").style.width=pct+"%";
 document.getElementById("progressText").textContent=pct+"%";
 document.getElementById("doneCount").textContent=state.done;
 document.getElementById("quizCount").textContent=state.quiz;
 document.getElementById("points").textContent=state.points;
 document.getElementById("profilePoints").textContent=state.points;
}
document.getElementById("subjectList").innerHTML=subjects.map((s,i)=>`
<div class="subject" id="s${i}">
<div class="subject-top"><div class="subject-icon">${s.icon}</div><div><h3>${s.name}</h3><p>${s.desc}</p></div></div>
<button class="learn" onclick="openLesson(${i})">Pelajari</button>
<div class="lesson">${s.lesson}<br><br><button class="learn" onclick="finishLesson()">✓ Tandai selesai</button></div>
</div>`).join("");
function openLesson(i){document.getElementById("s"+i).classList.toggle("open")}
function finishLesson(){state.done=Math.min(state.done+1,4);state.points+=10;save();update();alert("Materi ditandai selesai. +10 poin 🎉")}
document.getElementById("scheduleList").innerHTML=schedule.map(x=>`<div class="schedule-item"><div class="day">${x[0]}</div><div><b>${x[2]}</b><small>${x[1]} WIB</small></div></div>`).join("");
let qi=0;
function renderQuiz(){
 if(qi>=quiz.length){document.getElementById("quizBox").innerHTML=`<h3>🎉 Kuis selesai!</h3><p>Kamu sudah menyelesaikan semua soal.</p><button class="primary" onclick="qi=0;renderQuiz()">Ulangi kuis</button>`;return}
 const q=quiz[qi];
 document.getElementById("quizBox").innerHTML=`<small>Soal ${qi+1} dari ${quiz.length}</small><h3>${q.q}</h3>${q.o.map((x,i)=>`<button class="option" onclick="answer(${i})">${x}</button>`).join("")}<div id="result"></div>`;
}
function answer(i){
 const q=quiz[qi], buttons=document.querySelectorAll(".option");
 buttons.forEach(b=>b.disabled=true);
 if(i===q.a){buttons[i].classList.add("correct");document.getElementById("result").textContent="Benar! +20 poin 🎉";state.points+=20}
 else{buttons[i].classList.add("wrong");buttons[q.a].classList.add("correct");document.getElementById("result").textContent="Belum tepat. Jawaban yang benar ditandai hijau."}
 state.quiz=Math.min(state.quiz+1,quiz.length);save();update();
 setTimeout(()=>{qi++;renderQuiz()},900);
}
renderQuiz();update();
if("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js");
