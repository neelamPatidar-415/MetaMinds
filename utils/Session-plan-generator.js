const generate_session_plan = () => {
    return 
}

module.exports.generate_session_plan = generate_session_plan;




// calculate first session, break, second session durations
// maybe based on duration chosen
// and attach theme-related data (like track filename)

// const generatePlan = (req, res) => {
//   const { duration, theme } = req.body;

//   let firstSession, breakTime, secondSession;

//   if (duration === '30-min') {
//     firstSession = 12;
//     breakTime = 6;
//     secondSession = 12;
//   } else if (duration === '45-min') {
//     firstSession = 20;
//     breakTime = 5;
//     secondSession = 20;
//   }
//   // etc...

//   const themeMap = {
//     Focus: "focus-beats.mp3",
//     Chill: "chill-vibes.mp3",
//     Zen: "zen-flow.mp3"
//   };

//   res.json({
//     duration,
//     theme,
//     firstSession,
//     breakTime,
//     secondSession,
//     musicTrack: themeMap[theme] || "default.mp3"
//   });
// };
