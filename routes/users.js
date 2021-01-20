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

// router.route('/signup').post((req,res)=>{
//     const email = req.body.email;
//     const password = req.body.password;
//     auth.createUserWithEmailAndPassword(email, password)
// });

// router.route('/login').post((req,res)=>{
//     return auth.signInWithEmailAndPassword(email, password)
// });

// router.route('/googleLogin').post((req,res)=>{
//     return auth.signInWithRedirect(googleAuthProvider)
// });

// router.route('/logout').post((req,res)=>{
//     return auth.signOut()
// });

// router.route('/resetPassword').post((req,res)=>{
//     return auth.sendPasswordResetEmail(email)
// });

// router.route('/updatePassword').post((req,res)=>{


//     return currentUser.updatePassword(password)
// });

// router.route('/deleteAccount').delete((req,res)=>{
//     axios.delete('/users/deleteUser',{data:{username:currentUser.email}})
//         return currentUser.delete()
// });

// router.route('/authStateChange').delete((req,res)=>{
//     const unsubscribe = auth.onAuthStateChanged(user=>{
//         setCurrentUser(user)
//         setLoading(false)
//     })
//     return () => unsubscribe
// });

// //Create - Specific User
// router.route('/addUser').post((req,res)=>{
//     const username = req.body.username;

//     const newUser = new User({username});

//     newUser.save()
//         .then(()=>res.json('User added'))
//         .catch(err => res.status(400).json('Error: ' + err));
// });

// //Read - All Users
// router.route('/find').get((req,res)=>{
//     User.find()
//         .then(users => res.json(users))
//         .catch(err=> res.status(400).json('Error: ' + err));
// });

// //Read - Specific User
// router.route('/findUser').get((req,res)=>{
//     const findUser = req.body.findUser;

//     User.find({username: findUser})
//         .then(user => res.json(user))
//         .catch(err=> res.status(400).json('Error: ' + err));
// });

// //Update - Specific User
// router.route('/updateEmail').post((req,res)=>{
//         const newEmail = req.body.newEmail;
//         const oldEmail = req.body.oldEmail;

//     // User.findOneAndUpdate({username:oldUsername},{username:newUsername})
//     //     .then(()=>res.json('Username Updated'))
//     //     .catch(err => res.status(400).json('Error: ' + err));

//     Routine.updateMany({authorName:oldEmail}, {authorName:newEmail})
//         .then(()=>res.json('Routines Updated'))
//         .catch(err => res.status(400).json('Error: ' + err));

//     Session.updateMany({username:oldEmail},{username:newEmail})
//         .then(()=>res.json('Sessions Updated'))
//         .catch(err => res.status(400).json('Error: ' + err));
// });

