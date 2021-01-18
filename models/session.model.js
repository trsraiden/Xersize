const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sessionSchema = new Schema({
    routineName:String,
    username:String,
    routineID:String,
    sessionDetails:[],
    sessionNotes:"",
    sessionDate:Date,
    weekDay:String,
    month:String,
    day:Number
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;