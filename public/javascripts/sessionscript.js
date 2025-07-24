const phaseheading = document.getElementById("phaseheading");
const timeleft = document.getElementById("timeleft");
const totaltime = document.getElementById("totaltime");
const pausebtn = document.getElementById("pausebtn");
const bgVideo = document.getElementById("bgVideo");
// const canvasEle = document.getElementById("doodleCanvas");
const timerbar = document.getElementById("timerbar");

let timerInterval, paused = false, remainingTime = 0, phase = 0, canvas, totalduration = 0;



const canvasElement = document.getElementById("doodleCanvas");

if (canvasElement) {
  const canvas = new fabric.Canvas("doodleCanvas", {
    isDrawingMode: true,
    backgroundColor: "#fefcea",
  });

  canvas.freeDrawingBrush.width = 10;
  canvas.freeDrawingBrush.color = "#bca6ff";
  canvas.renderAll();
}


const config = {
    firstSessionTime: Session.duration/3,  /// for now lets divide duration into 3 equal parts only
    breakTime: Session.duration/3,
    secondSessionTime: Session.duration/3,
    breakType: Session.breakType,
    theme : Session.theme.themeName,
};
// const config = {
//     firstSessionTime:25 * 60,
//     breakTime: 5 * 60,
//     secondSessionTime: 25*60,
//     breakType: Session.theme.breakType,
//     theme : Session.theme.themeName,
// };

console.log(Session.duration);
console.log(Session.breakType);
console.log(Session.theme.themeName);
console.log(Session.theme.firstaudio);
console.log(Session.theme.animation);

const videos = {
    breathing: Session.theme.animation,
    session: Session.theme.animation,
    doodling: Session.theme.animation,
    walking:  Session.theme.animation,
};

const sounds = {
    session : new Howl({src:[Session.theme.firstaudio], loop:true}),
    break : new Howl({src:[Session.theme.firstaudio], loop:true}),
    tick : new Howl({src:[Session.theme.firstaudio], loop:true}),
    breath : new Howl({src:[Session.theme.firstaudio], loop:true}),
};

function updateTime(){
    const min = String(Math.floor(remainingTime/60)).padStart(2,"0");
    const sec = String(remainingTime % 60).padStart(2,"0");
    timeleft.innerText = `${min}:${sec}`;
    timerbar.style.width = 100 - (remainingTime/totalduration * 100) + "%";
}

function playMedia(videoSrc, audioKey){
    bgVideo.src = videoSrc;
    bgVideo.play();
    stopAllAudio();
    if(audioKey) sounds[audioKey].play();
}

function stopAllAudio(){
    Object.values(sounds).forEach(sound => sound.stop());
}

function startTimer(){
    clearInterval(timerInterval);
    timerInterval = setInterval(()=>{
        if(!paused && remainingTime >0){
            remainingTime--;
            updateTime();

            if(remainingTime == 5) sounds.tick.play();
        }
        else if(remainingTime <= 0){
            clearInterval(timerInterval);
            nextPhase();
        }
    },1000);
}

pausebtn.addEventListener("click",() => {
    paused = !paused;
    pausebtn.innerText = paused ? "Resume" : "Pause";
    if(paused){
        stopAllAudio();
        bgVideo.pause();
    }
    else{
        playMedia(videos.session, "session");
    }
    if(!paused) startTimer();
});

function nextPhase(){
    switch(phase){
        case 0:
            startBreathing("Before Session 1"); break;
        case 1:
            startSession("Session 1", config.firstSessionTime); break;
        case 2:
            startBreak(); break;
        case 3:
            startBreathing("Before Session 2"); break;
        case 4:
            startSession("Session 2", config.secondSessionTime); break;
        case 5:
            phaseheading.innerText = "ALL Sessions are Completed! 🔥🥳";
            stopAllAudio(); return;
    }
    phase++;
}

function startBreathing(label){
    phaseheading.innerText = `1 min Deep Breathing - ${label}`;
    playMedia(videos.breathing, "breath");
    // if (canvas) canvas.clear();
    // showCanvas(false);
    remainingTime = 5;  ///60
    totalduration = 5; ///60
    // totaltime.innerText = `${remainingTime/60}:00`;
    totaltime.innerText = `${Math.floor(remainingTime / 60).toString().padStart(2, "0")}:00`;
    updateTime();
    startTimer();
}

function startSession(label, duration){
    phaseheading.innerText = `${label}`;
    // if (canvas) canvas.clear();  // Only clear for new sessions
    // showCanvas(false);
    playMedia(videos.session, "session");
    remainingTime = duration;
    totalduration = duration;
    // totaltime.innerText = `${remainingTime/60}:00`;
    totaltime.innerText = `${Math.floor(remainingTime / 60).toString().padStart(2, "0")}:00`;
    updateTime();
    startTimer();
}


function startBreak(){
    phaseheading.innerText = `🍵Break - ${config.breakType}`;
    const video = config.breakType === "doodle" ? videos.doodling : videos.walking;
    // if(config.breakType === "doodle"){
    //     document.getElementById("doodleCanvas").classList.remove("hidden");  
    //     canvas.isDrawingMode = true;  
    // }
    playMedia(video, "break");
    remainingTime = config.breakTime;
    updateTime();
    startTimer();
}

nextPhase();