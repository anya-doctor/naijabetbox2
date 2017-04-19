var mongoose = require("../models/db");
var schema = mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required:true
    },
    gender: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    alt_mobile: {
        type:String
    },
    email: {
        type: String,
        required:true
    },
    profile_img:{
        type:String,
        default:"images/profile.png"
    },
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase:true,
        trim:true
    },
    password: {
        type: String,
        required:true
    },
    isAdmin: {
        type: String,
        default: 'No'
    },
    balance: {
        type: Number,
        default: 0
    },
    bonus: {
        type: Number,
        default: 0
    },
    total_balance: {
        type: Number,
        default: 0
    },
    withdrawable_balance: {
        type: Number,
        default: 0
    },
    reg_num: {
        type: Number
    },
    joinedDate: {
        type: Date,
        default: new Date()
    }
});
var User = module.exports = mongoose.model("User", schema);
module.exports.createUser = function (user, callback) {
    user.save(callback);
};
module.exports.checkUsername = function (username, callback) {
    User.findOne({ username: username }, callback);
};
module.exports.countOfUsers = function (callback) {
    User.count(callback);
};
module.exports.updateAUser = function (username,updateParam,callback) {
    User.findOneAndUpdate({"username":username},{$set:updateParam},callback);
};