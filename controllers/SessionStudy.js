const UserModel = require('../models/user.js');
const themesModel = require('../models/themes.js');
const SessionModel = require('../models/session.js');

module.exports.SessionStudy = async function(req,res){
    const theme = await themesModel.findOne({themeName: req.body.theme});

    if (!req.user) return res.status(401).send("User not authenticated");

    const newSession = await SessionModel.create({
        userId : req.user._id,
        duration : req.body.duration,
        breakType : req.body.breaktype,
        theme : theme._id,
    })

    await newSession.populate('theme');  //// yaha actually jis data ko populate karana he vo aayega like newSession theme field is to populate - not giving any ref here to where populate it already takes that by schema defination

    await UserModel.findByIdAndUpdate(req.user._id, {
        $push : { recentSessions : newSession._id}
    });

    let breakduration = 0;
    if (newSession.duration === 30) {
      breakduration = 0;
    } else if (newSession.duration === 60) {
      breakduration = 10;
    } else if (newSession.duration === 90) {
      breakduration = 10;
    } else if (newSession.duration === 120) {
      breakduration = 10;
    }

    res.render('session', {Session: newSession, breakduration: breakduration || 0});
}