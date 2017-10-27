let mongoose = require("../db");
let Schema = mongoose.Schema;

let allChatMessage = new Schema({
	message:String,
});
module.exports = mongoose.model("allChatMessage",allChatMessage);
