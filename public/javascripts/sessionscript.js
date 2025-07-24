const phaseheading = document.getElementById("phaseheading");
const timeleft = document.getElementById("timeleft");
const totaltime = document.getElementById("totaltime");
const pausebtn = document.getElementById("pausebtn");
const bgVideo = document.getElementById("bgVideo");
// const canvasEle = document.getElementById("doodleCanvas");
const timerbar = document.getElementById("timerbar");

let timerInterval, paused = false, remainingTime = 0, phase = 0, canvas, totalduration = 0;
let currentMedia = { video: null, audioKey: null };

const config = {
    firstSessionTime: (Session.duration - breakduration)/2,  /// for now lets divide duration into 3 equal parts only
    breakTime: breakduration,
    secondSessionTime: (Session.duration - breakduration)/2,
    breakType: Session.breakType,  //walk , breath, doodle
    theme : Session.theme.themeName,
};

console.log(Session.duration);
console.log(Session.breakType);
console.log(Session.theme.themeName);
console.log(Session.theme.firstaudio);
console.log(Session.theme.animation);

const videos = {
    session: Session.theme.animation,
    // secondsession: Session.theme.animation,
    deepbreath : "/assets/default/video/finalBreathing.mp4",
    breathing: "/assets/default/video/finalBreathing.mp4",
    doodling: Session.theme.animation,
    walking:  Session.theme.animation,
};

const sounds = {
    session : new Howl({src:[Session.theme.firstaudio], loop:true}),
    // secondsession : new Howl({src:[Session.theme.secondaudio], loop:true}),
    walking : new Howl({src:[Session.theme.firstaudio], loop:true}),
    breathing : new Howl({src:[Session.theme.firstaudio], loop:true}),
    doodling : new Howl({src:[Session.theme.firstaudio], loop:true}),
    tick : new Howl({src:['/assets/default/audio/tick.mp3'], loop:true}),  
};

function updateTime(){
    const min = String(Math.floor(remainingTime/60)).padStart(2,"0");
    const sec = String(remainingTime % 60).padStart(2,"0");
    timeleft.innerText = `${min}:${sec}`;
    timerbar.style.width = 100 - (remainingTime/totalduration * 100) + "%";
}

function playMedia(videoSrc, audioKey) {
    if (bgVideo.src !== videoSrc) bgVideo.src = videoSrc;
    bgVideo.play();

    sounds[audioKey]?.play();

    currentMedia.video = videoSrc;
    currentMedia.audioKey = audioKey;
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
            // sounds.tick.stop();
            stopAllAudio();
            nextPhase();
        }
    },1000);
}

pausebtn.addEventListener("click", () => {
    paused = !paused;
    pausebtn.innerText = paused ? "Resume" : "Pause";

    if (paused) {
        stopAllAudio();
        bgVideo.pause();
        clearInterval(timer); // stop timer
    } else {
        // Resume current media only
        if (currentMedia.video) bgVideo.play();
        if (currentMedia.audioKey) sounds[currentMedia.audioKey]?.play();
        startTimer(); // resume timer
    }
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
    document.body.classList.add("dark-text"); 

    phaseheading.innerText = `1 min Deep Breathing - ${label}`;
    playMedia(videos.deepbreath, "breathing");

    remainingTime = 60;  ///60
    totalduration = 60; ///60
    totaltime.innerText = `${Math.floor(remainingTime/60).toString().padStart(2, "0")}:00`;
    updateTime();
    startTimer();
}

function startSession(label, duration){
    phaseheading.innerText = `${label}`;
    playMedia(videos.session, "session");
    remainingTime = duration*60;
    totalduration = duration*60;
    totaltime.innerText = `${Math.floor(remainingTime/60).toString().padStart(2, "0")}:00`;
    updateTime();
    startTimer();
}


function startBreak(){
    phaseheading.innerText = `🍵Break - ${config.breakType}`;
    let video;
    if(breakType === "doodle") {
        video = videos.doodling;
        playMedia(video, "doodling");
    }
    else if(breakType === "walk") {
        video = videos.walking;
        playMedia(video, "walking");
    }
    else if(breakType === "breath"){
        video = videos.breathing;
        playMedia(video, "breathing");
    }
    remainingTime = config.breakTime*60;
    totaltime.innerText = `${Math.floor(remainingTime/60).toString().padStart(2, "0")}:00`;
    updateTime();
    startTimer();
}

// nextPhase();
document.getElementById("startBtn").addEventListener("click", () => {
  document.getElementById("startOverlay").style.display = "none";

  // Now safe to start audio/video
  nextPhase(); // or your main session starter
});


// function playMedia(videoSrc, audioKey){
//     bgVideo.src = videoSrc;
//     bgVideo.play();
//     stopAllAudio();
//     if(audioKey) sounds[audioKey].play();
// }

// const canvasElement = document.getElementById("doodleCanvas");

// if (canvasElement) {
//   const canvas = new fabric.Canvas("doodleCanvas", {
//     isDrawingMode: true,
//     backgroundColor: "#fefcea",
//   });

//   canvas.freeDrawingBrush.width = 10;
//   canvas.freeDrawingBrush.color = "#bca6ff";
//   canvas.renderAll();
// }