const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const routineSchema = new Schema({
    authorName:{
        type:String,
        required:true
    },
    routineName:{
        type:String,
        required:true,
        trim:true
    },
    routineTemplate:{
        type:Array,
        required:true
    },
    routineNotes:{
        type:String
    }
});

const Routine = mongoose.model('Routine', routineSchema);

module.exports = Routine;