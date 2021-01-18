const router = require('express').Router();
const Routine = require('../models/routine.model.js');

//for crud

//create a routine for a user
router.route('/createRoutine').post((req,res)=>{
    let authorName = req.body.authorName;
    let routineName = req.body.routineName;
    let routineTemplate = req.body.routineTemplate;
    let routineNotes = req.body.routineNotes;

    const newRoutine = new Routine({
        authorName,
        routineName,
        routineTemplate,
        routineNotes
    });

    newRoutine.save()
        .then(()=>res.json('Routine added'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//create routine copy for a specific user
//used
router.route('/createRoutineCopy/:newAuthor').post((req,res)=>{
    const authorName = req.params.newAuthor;
    const routineName = req.body.routineName;
    const routineTemplate = req.body.routineTemplate;
    const routineNotes = req.body.routineNotes;

    const newRoutine = new Routine({
        authorName,
        routineName,
        routineTemplate,
        routineNotes
    });

    newRoutine.save()
        .then(()=>res.json('Routine copied'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//read - all routines for a specific user
router.route('/findRoutineByAuthor/:authorName').get((req,res)=>{
    const authorName = req.params.authorName;
    Routine.find({authorName: authorName})
        .then(routines => res.json(routines))
        .catch(err=> res.status(400).json('Error: ' + err));
});

//read - all routines OTHER THAN the specific user
router.route('/findRoutineByOtherAuthor/:userName').get((req,res)=>{
    const userName = req.params.userName;
    Routine.find({authorName:{$ne:userName}})
        .then(routines => res.json(routines))
        .catch(err=> res.status(400).json('Error: ' + err));
});

//read - specific routines for a specific user for editing using ID
router.route('/findByRoutineID/:routineID').get((req,res)=>{
    let routineID = req.params.routineID;
    Routine.findOne({_id: routineID})
        .then(routine => res.json(routine))
        .catch(err=> res.status(400).json('Error OR: ' + err));
});

//read - and transform for use in the session part - creating a session format
router.route('/findByRoutineIDForSession/:routineID').get((req,res)=>{
    let routineID = req.params.routineID;
    let routineStructure=[]
    let exercise = {};
    let reps =[];
    // let weight = [];
    // let weight = "";
    let notes =[];
    let sets = 0;
    let repsTemplate = 0;
    Routine.findById(routineID)
        .then(routine =>{
            routine.routineTemplate.map((result)=>{
                //start of adjusting routineTemplate structure for session layout
                reps = []
                // weight=[]
                notes=[]
                sets = result.sets
                repsTemplate = result.reps
                for (let i = 0;i<sets;i++){
                    reps.push(repsTemplate)
                    // weight.push(0)
                    notes.push("")
                }
                exercise = {
                    type:result.type,
                    exercise:result.exercise,
                    reps:reps,
                    weight:"",
                    notes:notes,
                    rest:result.rest
                }
                routineStructure.push(exercise)
            })
            routine.routineTemplate = routineStructure
            //end of adjusting format for session layout
            return (res.json(routine))
        } )
        .catch(err=> res.status(400).json('Error OR: ' + err));
});

//update - specific routine for a specific user
router.route('/updateRoutine/:routineID').post((req,res)=>{
    const routineID = req.params.routineID;
    const routineName = req.body.routineName;
    const routineTemplate = req.body.routineTemplate;
    const routineNotes = req.body.routineNotes;
    Routine.findOneAndUpdate({_id:routineID}, {
        routineName:routineName,
        routineTemplate:routineTemplate,
        routineNotes:routineNotes
    })
        .then(()=>res.json("Routine Updated"))
        .catch(err => res.status(400).json('Error: ' + err));
});

//delete - specific routine for a specific user
router.route('/deleteRoutine/:idRoutine').delete((req,res)=>{
    let idRoutine = req.params.idRoutine
    Routine.findOneAndDelete({_id:idRoutine})
        .then(()=>res.json("Routine Deleted"))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;

// //read - show all routines
// router.route('/findRoutine').get((req,res)=>{
//     Routine.find()
//         .then(routines => res.json(routines))
//         .catch(err=> res.status(400).json('Error: ' + err));
// });

// //read - specific routine for all users
// router.route('/findRoutineByName').get((req,res)=>{
//     const routineName = req.body.routineName;

//     Routine.find({routineName: routineName})
//         .then(routines => res.json(routines))
//         .catch(err=> res.status(400).json('Error: ' + err));
// });