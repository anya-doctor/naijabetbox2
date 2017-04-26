'use strict';
var mongoose = require('../models/db');
//request schema
var bookingSchema = mongoose.Schema({
	username:{
		type:String,
		required:true
	},
	fullname:{
		type:String,
		required:true
	},
	phone:{
		type:String,
		required:true
	},
	code:{
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
	done:{
		type:String,
		required:true,
		enum:["No","Yes"],
		default:'No'
	},
	done_date:{
        type:Date
	}

});
var BookingRequest = module.exports = mongoose.model('BookingRequest',bookingSchema);
module.exports.createBookingRequest =function(request,callback){
	request.save(callback);
};
module.exports.getAllBookingRequest =function(query,callback){
	BookingRequest.find(query,callback);
};
module.exports.getCount =function(callback){
	BookingRequest.count({done:"No"},callback);
};
module.exports.updateABookingRequest = function(id,done,callback){
	var done_date = null;
	if(done == "Yes"){
		done_date = new Date();
	}
	BookingRequest.findOneAndUpdate({_id:id},{$set:{done:done,
		done_date:done_date}},callback);
};