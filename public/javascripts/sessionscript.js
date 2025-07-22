const phaseheading = document.getElementById("phaseheading");
const timeleft = document.getElementById("timeleft");
const totaltime = document.getElementById("totaltime");
const pausebtn = document.getElementById("pausebtn");
const bgVideo = document.getElementById("bgVideo");
const canvasEle = document.getElementById("doodlecanvas");
const timerbar = document.getElementById("timerbar");

let timerInterval, paused = false, remainingTime = 0, phase = 0, canvas, totalduration = 0;

const config = {
    firstSessionTime:25 * 60,
    breakTime: 5 * 60,
    secondSessionTime: 25*60,
    breakType: "doodling",
    theme : "rainfall",
};

const videos = {
    breathing: "/assets/videos/session/theme_rainfall/rainfall_metaminds.mp4",
    session: "/assets/videos/session/theme_rainfall/rainfall_metaminds.mp4",
    doodling: "/assets/videos/session/theme_rainfall/rainfall_metaminds.mp4",
    walking:  "/assets/videos/session/theme_rainfall/rainfall_metaminds.mp4",
};

const sounds = {
    session : new Howl({src:["/assets/audios/session/theme_Rainfall/rainfall_sound_metaminds.mp3"], loop:true}),
    break : new Howl({src:["/assets/audios/session/theme_Rainfall/rainfall_sound_metaminds.mp3"], loop:true}),
    tick : new Howl({src:["/assets/audios/session/theme_Rainfall/rainfall_sound_metaminds.mp3"], loop:true}),
    breath : new Howl({src:["/assets/audios/session/theme_Rainfall/rainfall_sound_metaminds.mp3"], loop:true}),
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

function showCanvas(show){
    canvasEle.classList.toggle("hidden", !show);
    if(show && !canvas){
        canvas = new fabric.canvas("doodleCanvas", {
            isDrawingMode: true,
            backgroundColor: 'rgba(0,0,0,0.1)'
        });
        canvas.freeDrawingBrush.width = 3;
        canvas.freeDrawingBrush.color = "#ffffff";
    }
}

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
    remainingTime = 60;
    totalduration = 60;
    totaltime.innerText = `${remainingTime/60}:00`;
    updateTime();
    startTimer();
}

function startSession(label, duration){
    phaseheading.innerText = `${label}`;
    showCanvas(false);
    playMedia(videos.session, "session");
    remainingTime = duration;
    totalduration = duration;
    totaltime.innerText = `${remainingTime/60}:00`;
    updateTime();
    startTimer();
}

function startBreak(){
    phaseheading.innerText = `🍵Break - ${config.breakType}`;
    const video = config.breakType === "doodling" ? videos.doodling : videos.walking;
    showCanvas(config.breakType === "doodling");
    playMedia(video, "break");
    remainingTime = config.breakTime;
    updateTime();
    startTimer();
}

nextPhase();


