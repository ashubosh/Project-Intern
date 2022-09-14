const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.objectId;
const internSchema = new mongoose.Schema({
    name: {
        type : String,
        required : true
    },
    email: {
        type : String,
        required : true,
        unique : true
    },
    mobile: {
        type : Number,
        required : true,
        unique : true
    },
    CollegeId: {
        type : ObjectId,
        ref : "College",
        required : true
    },
    isDeleted: {
        type : boolean,
        default : false
    }
})
    module.exports = mongoose.model("Intern", internSchema)
