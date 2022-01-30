const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//const Userdb = mongoose.model('userdb', schema);

// Define collection and schema

var schemaD = new Schema({
   ref: {
      type: String,
      unique: true,
      required:true
   },
   nom_juge: { // mn schema 
   // type: Schema.Userdb.ObjectId,
    type : String,
 },
 dateAudiance: {
    type: Date,
 },
 nom_etat: {
    type:String,possibleValues: ['chkYesM','chkNoM']
   },
 date_etat: {
    type:Date, 
   },   
   date_r: {
      type:Date,
     },
     date_l: {
      type:Date,
     },
   complete: {
    type: Boolean,possibleValues: ['oui','non']
   },
   region: {
    type: String
   },
   code_postal: {
    type: String
   },
   maps_code: {
    type: String
   },
})

const Dossierdb = mongoose.model('dossierdb', schemaD);
module.exports = Dossierdb;