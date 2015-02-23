var Mongoose = require('mongoose');


var noteSchema = Mongoose.Schema({
    user: { type: Mongoose.Schema.Types.ObjectId, ref: 'User' },
    submittedBy: { type: Mongoose.Schema.Types.ObjectId, ref: 'User' },
    subject: String,
    note: {type: String, required: true},
    createAt: { type: Date, required: true, default: Date.now }
})

module.exports = Mongoose.model('Note', noteSchema);