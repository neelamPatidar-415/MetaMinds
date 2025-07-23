const mongoose = require("mongoose");

const ThemeSchema = new mongoose.Schema({
  themeName: String,
  firstaudio: String,  // path like '/assets/Themes/theme1/audio1.mp3'
  secondaudio: String,
  animation: String
});

module.exports = mongoose.model("Themes", ThemeSchema);