/**
 * Created by neil on 2/29/16.
 */

var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var MessageSchema = new Schema({
    message : String,
    time    : String
})

module.exports = mongoose.model('Message', MessageSchema);

