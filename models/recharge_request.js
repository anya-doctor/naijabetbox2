'use strict';
var mongoose = require('../models/db');
//request schema
var rechargeSchema = mongoose.Schema({
	username:{
		type:String,
		required:true
	},
	network:{
		type:String,
		required:true
	},
	phone_number:{
		type:String,
		required:true
	},
	amount:{
		type:Number,
		required:true
	},
	request_date:{
        type:Date,
        required:true,
        default:new Date()
	},
	done_date:{
        type:Date
	},
	done:{
		type:String,
		enum:["No","Yes"],
		default:'No',
		required:true
	}
});
var RechargeRequest = module.exports = mongoose.model('RechargeRequest',rechargeSchema);
module.exports.createRechargeRequest = function(request,callback){
	request.save(callback);
};
module.exports.getAllRechargeRequest = function(query,callback){
	RechargeRequest.find(query,callback);
};
module.exports.updateARechargeRequest = function(id,done,callback){
	var done_date = null;
	if(done === "Yes"){
		done_date = new Date();
	}
	RechargeRequest.findOneAndUpdate({_id:id},{$set:{done:done,done_date:done_date}},callback);
};
module.exports.getCount =function(callback){
	RechargeRequest.count({done:"No"},callback);
};