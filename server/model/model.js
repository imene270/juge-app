const mongoose = require('mongoose');

var schema = new mongoose.Schema({
     name: {
        type: String,
        unique: true
     },
     cin: {
      type: String,
      unique: true
   },
     email: {
      type: String,unique: true
     },
     telephone: {
        type: Number
     },
     password: {
      type: String
     },
     role: {
      type: String
     },
     region: {
      type: String
     }
     
})
const Userdb = mongoose.model('userdb', schema);
module.exports = Userdb;