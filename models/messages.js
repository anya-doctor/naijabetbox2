'use strict';
var mongoose = require('../models/db');

var schema = mongoose.Schema({
	username:{
		type:String,
		required:true
	},
	message:{
		type:String,
		required:true
	},
	date:{
		type:Date,
		default:new Date()
	},
	status:{
		type:String,
		enum:["unseen","seen"],
		default:"unseen"
	}
});

var Message = module.exports = mongoose.model("Message",schema);

module.exports.createMessage = function(msg,callback){
	msg.save(callback);
}
module.exports.getMessageByUsername =function(username,callback){
	Message.find({username:username,status:"unseen"},callback);
};

module.exports.updateAMessage = function(id,status,callback){
	Message.findOneAndUpdate({_id:id},{$set:{status:status}},callback);
};