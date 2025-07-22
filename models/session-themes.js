const mongoose = require("mongoose");

const ThemesSchema = mongoose.Schema({
    themeName: String,
    animation: Buffer,
    firstaudio:Buffer,
    secondaudio: Buffer
})

module.exports = mongoose.model("Themes", ThemesSchema);