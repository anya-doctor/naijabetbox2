'use strict';
var mongoose = require('../models/db');
//request schema
var fundSchema = mongoose.Schema({
	username:{
		type:String,
		required:true
	},
	betting_company:{
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
		required:true,
		enum:["No","Yes"],
		default:'No'
	}
});
var FundRequest = module.exports = mongoose.model('FundRequest',fundSchema);
module.exports.createFundRequest =function(request,callback){
	request.save(callback);
};
module.exports.getAllFundRequest =function(query,callback){
	FundRequest.find(query,callback);
};
module.exports.updateAFundRequest = function(id,done,callback){
	var done_date = null;
	if(done === "Yes"){
		done_date = new Date();
	}
	FundRequest.findOneAndUpdate({_id:id},{$set:{done:done,done_date:done_date}},callback);
};
module.exports.getCount =function(callback){
	FundRequest.count({done:"No"},callback);
};