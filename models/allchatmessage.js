let mongoose = require("../db");
let Schema = mongoose.Schema;

let allChatMessage = new Schema({
	message:String,
	username:String,
	nowtime:String
});
module.exports = mongoose.model("allChatMessage",allChatMessage);
