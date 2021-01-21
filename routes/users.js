const router = require('express').Router();
const Routine = require('../models/routine.model.js');
const Session = require('../models/session.model.js');
// const User = require('../models/user.model.js');

//for crud

//Delete - Specific User
router.route('/deleteUser').delete((req,res)=>{
    const username = req.body.username;
    Routine.deleteMany({authorName:username})
        .then(()=> res.json('Routine Deleted'))
        .catch(err => res.status(400).json('Error: ' + err));
    Session.deleteMany({username:username})
        .then(()=> res.json('Session Deleted'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
