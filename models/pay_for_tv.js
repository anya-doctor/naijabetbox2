'use strict';
var mongoose = require('../models/db');
//request schema
var tvSchema = mongoose.Schema({
	username:{
		type:String,
		required:true
	},
	tv:{
		type:String,
		required:true
	},
	card_number:{
		type:String,
		required:true
	},
	banquet:{
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
	done:{
		type:String,
		enum:["No","Yes"],
		default:'No',
		required:true
	},
	done_date:{
        type:Date,
	}
});
var TvRequest = module.exports = mongoose.model('TvRequest',tvSchema);
module.exports.createTvRequest = function(request,callback){
	request.save(callback);
};
module.exports.getAllTvRequest = function(query,callback){
	TvRequest.find(query,callback);
};
module.exports.updateATvRequest = function(id,done,callback){
	var done_date = null;
	if(done === "Yes"){
		done_date = new Date();
	}
	TvRequest.findOneAndUpdate({_id:id},{$set:{done:done,done_date:done_date}},callback);
};
module.exports.getCount =function(callback){
	TvRequest.count({done:"No"},callback);
};