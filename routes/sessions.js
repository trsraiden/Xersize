const router = require('express').Router();
let Session = require('../models/session.model.js');

//for crud
//Create - Specific Session
router.route('/createSession').post((req,res)=>{
    const routineName = req.body.routineName;
    const username = req.body.username;
    const routineID = req.body.routineID;
    const sessionDetails = req.body.sessionDetails;
    const sessionNotes = req.body.sessionNotes;
    const sessionDate = req.body.sessionDate;
    const weekDay = req.body.weekDay;
    const month = req.body.month;
    const day = req.body.day;

    const newSession = new Session({
        routineName,
        username,
        routineID,
        sessionDetails,
        sessionNotes,
        sessionDate,
        weekDay,
        month,
        day
    });

    newSession.save()
        .then(()=>res.json('Session Recorded'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//Read - Session by Session _id
router.route('/findBySessionID/:sessionID').get((req,res)=>{
    const sessionID = req.params.sessionID;

    Session.findOne({_id: sessionID})
        .then(session => res.json(session))
        .catch(err=> res.status(400).json('Error OR: ' + err));
});

//Read - Sessions from a period of days
router.route('/findSessionsByDate').post((req,res)=>{
    const username = req.body.username;
    const earlierDate = req.body.earlierDate;
    const laterDate = req.body.laterDate;
    let volumeChartData = [];
    let weightChartData = [];
    let exerciseList = [];

    // Session.find({username:username,sessionDate:{$gte:earlierDate, $lte:laterDate}})
    //     .then(sessions => res.json(sessions))
    //     .catch(err => res.status(400).json('Error: ' + err));

    Session.find({username:username,sessionDate:{$gte:earlierDate, $lte:laterDate}})
        .then(sessions => {
            sessions.map(session =>{
                session.sessionDetails.map(exercise =>{
                    // console.log('my logging '+ exerciseList);
                    let inList = false;
                    exerciseList.map((exerciseListItem, index) =>{
                        if (exercise.exercise === exerciseListItem){
                            inList = true;
                            //weight chart data
                            weightChartData[index].datasets[0].data.push(exercise.weight);
                            weightChartData[index].labels.push(session.month+'-'+session.day);
                            
                            weightChartData[index].datasets[0].data.map(weight =>{
                                if (Number(weight)>Number(weightChartData[index].options.scales.yAxes[0].ticks.max)){
                                // if (Number(exercise.weight)>Number(weight)){
                                    weightChartData[index].options.scales.yAxes[0].ticks.max = Number(exercise.weight)
                                }
                            })

                            //volume chart data
                            volumeChartData[index].datasets[0].data.push(exercise.volume);
                            volumeChartData[index].labels.push(session.month+'-'+session.day);
                            //set the max y value based on the highest volume for that exercise
                            
                            volumeChartData[index].datasets[0].data.map(volume =>{
                                if (Number(volume)>Number(volumeChartData[index].options.scales.yAxes[0].ticks.max)){
                                // if (exercise.volume>volume){
                                    volumeChartData[index].options.scales.yAxes[0].ticks.max = Number(exercise.volume)
                                }
                            })
                        }
                        return(inList)
                    });
                    if (inList === false){
                        //creating the chart object 
                        exerciseList.push(exercise.exercise);
                        weightChartData.push(
                            {
                                labels:[session.month+'-'+session.day],
                                datasets:[
                                    {
                                        label:exercise.exercise,
                                        data:[exercise.weight],
                                        fill:true,
                                        borderColor: '#D11C1C'
                                    }
                                ],
                                options: {
                                    legend:{
                                        display:false,
                                        labels:{
                                            fontFamily:'Arial'
                                        }
                                    },
                                    scales: {
                                        xAxes:[{
                                            gridLines:{
                                                zeroLineColor:'#ffffff'
                                            }
                                        }],
                                        yAxes: [{
                                            gridLines:{
                                                zeroLineColor:'#ffffff'
                                            },
                                            ticks: {
                                                min: 0,
                                                max:Number(exercise.weight),
                                                stepSize:45
                                            }
                                        }]
                                    }
                                }
                            }
                        );
                        volumeChartData.push(
                            {
                                labels:[session.month+'-'+session.day],
                                datasets:[
                                    {
                                        label:exercise.exercise,
                                        data:[exercise.volume],
                                        fill:true,
                                        borderColor: '#6df0f5'
                                    }
                                ],
                                options: {
                                    legend:{
                                        display:false,
                                        labels:{
                                            fontFamily:'Arial'
                                        }
                                    },
                                    scales: {
                                        xAxes:[{
                                            gridLines:{
                                                zeroLineColor:'#ffffff'
                                            },
                                            ticks:{
                                                min:0,
                                                max:12,
                                                stepSize:1,
                                                // fontFamily:'Arial'
                                            }
                                        }],
                                        yAxes: [{
                                            gridLines:{
                                                zeroLineColor:'#ffffff'
                                            },
                                            ticks: {
                                                min: 0,
                                                max:Number(exercise.volume),
                                                stepSize:1500
                                            }
                                        }]
                                    }
                                }
                            }
                        );
                    }
                });
          });  
          const sessionsInRange={
              sessions,
              weightChartData,
              volumeChartData
          }
          return(
              res.json(sessionsInRange)
          )
        })
});

//Update - Sessions
router.route('/updateSession').post((req,res)=>{
    const sessionID = req.body.sessionID;
    const sessionDetails = req.body.sessionDetails
    const sessionNotes = req.body.sessionNotes

    Session.findOneAndUpdate({_id:sessionID}, {
        sessionDetails:sessionDetails,
        sessionNotes:sessionNotes
    })
        .then(() => res.json("Session updated!"))
        .catch(err => res.status(400).json('Error: ' + err));

});

router.route('/deleteSession/:idSession').delete((req,res)=>{
    const idSession = req.params.idSession;

    Session.findOneAndDelete({_id:idSession})
        .then(() => res.json("Session deleted!"))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;

//Read - Specific Session and All Session
// router.route('/findSession').get((req,res)=>{
//     const username = req.body.username;
//     const timestamp = req.body.timestamp;
    
//     if (timestamp){
//         Session.find({username:username, timestamp:timestamp})
//             .then(sessions => res.json(sessions))
//             .catch(err => res.status(400).json('Error: ' + err));
//     }else{
//         Session.find({username:username})
//         .then(sessions => res.json(sessions))
//         .catch(err => res.status(400).json('Error: ' + err));
//     }
// });

// //Read - Sessions for a Routine
// router.route('/findRoutineSessions').get((req,res)=>{
//     const username = req.body.username;
//     const authorRoutineName = req.body.authorRoutineName;

//     Session.find({username:username, authorRoutineName:authorRoutineName})
//         .then(sessions => res.json(sessions))
//         .catch(err => res.status(400).json('Error: ' + err));
// });