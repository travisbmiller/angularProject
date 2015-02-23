var Note = require('../models/noteModel')

module.exports = {

    addNote: function (req, res) {

        var newNote = new Note(req.body)

        newNote.save(function(err, user) {
            if (err) return res.status(400).json(err);
            return res.status(200).json(user);
        });
    },
    getNotes: function (req, res) {

        console.log(req.params.id)
        Note.find({ user: req.params.id})
        .populate('user', 'firstName lastName')
        .populate('submittedBy', 'firstName lastName')
        
        .exec(function (err, notes) {
            if (err) return res.status(500).json(err)
                res.status(200).json(notes)
        })
    }
}