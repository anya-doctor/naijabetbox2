'use strict';
var mongoose = require('../models/db');

var requsetSchema = mongoose.Schema({
	firstname:{
		type:String,
		required:true
	},
	surname:{
	type:String,
		required:true
	},
	username:{
	type:String,
		required:true
	},
	bank:{
	type:String,
		required:true
	},
	account_number:{
		type:String,
		required:true,
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
		required:true,
		default:'No'
	}
});

var WithdrawRequest = module.exports = mongoose.model('WithdrawRequest',requsetSchema);
module.exports.createWithdrawRequest =function(request,callback){
	request.save(callback);
};
module.exports.getAllWithdrawRequest =function(query,callback){
	WithdrawRequest.find(query,callback);
};
module.exports.updateAWithdrawalRequest = function(id,done,callback){
	var done_date = null;
	if(done ==="Yes"){
		done_date = new Date();
	}
	WithdrawRequest.findOneAndUpdate({_id:id},{$set:{done:done,done_date:null}},callback);
};
module.exports.getCount =function(callback){
	WithdrawRequest.count({done:"No"},callback);
};