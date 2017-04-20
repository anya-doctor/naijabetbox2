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
		default:'no'
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
module.exports.updateABookingRequest = function(id,done,callback){
	BookingRequest.findOneAndUpdate({_id:id},{$set:{done:done,done_date:new Date().toLocaleString().substring(0,new Date().toLocaleString().indexOf(","))}},callback);
};