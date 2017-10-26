let mongoose = require("../db");
let Schema = mongoose.Schema;

let userMessage = new Schema({
	userName:{type:String},
	userPwd:{type:String},
	headPortrait:{type:String},
	chatRecord:{type:String}
});
module.exports = mongoose.model("user",userMessage);
