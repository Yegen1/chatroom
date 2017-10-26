let mongoose = require("../db");
let Schema = mongoose.Schema;

let userMessage = new Schema({
	userName:String,
	userPwd:String,
	headPortrait:String,
	chatRecord:String
});
module.exports = mongoose.model("user",userMessage);
