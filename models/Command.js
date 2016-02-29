/**
 * Created by neil on 2/29/16.
 */

var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var CommandSchema = new Schema({
    command : String,
    time    : String
})

module.exports = mongoose.model('Command', CommandSchema);

