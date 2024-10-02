const mongoose = require("mongoose");
const { Persona} = require('./persona');
const { Dependencia} = require('./dependencia');

const { Schema } = mongoose;

const PersonalSchema = new Schema({
    legajo:{type:String,required: true},
    jerarquia:{type:String,required:true},
    dependencia:{type:Schema.Types.ObjectId, ref:'Dependencia',required:true},
    persona:{type:Schema.Types.ObjectId,ref:'Persona', required: true}
    
});

module.exports = mongoose.model('Personal', PersonalSchema);