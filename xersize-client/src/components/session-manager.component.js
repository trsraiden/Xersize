import React, {Component} from 'react';
import axios from 'axios';
import {Alert} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default class SessionManager extends Component{
    constructor(props){
        super(props);

        this.state = {
            //from the routine that will be followed for this session
            routineName:"",
            routineNotes:"",
            sessionID:"",

            //the info for this session
            username:"",
            routineID:"",
            sessionDetails:[],
            sessionNotes:"",

            timeSeconds:0,
            timerStart:false,

            submitError:"",
            create:true
        }
    }

    sessionPlan(){
        return this.state.sessionDetails.map((exercise, index) =>
            <div key={index} className='container'>
                <div className='form-group'>
                    <h2>{exercise.exercise} - Rest {exercise.rest} after each set</h2>
                    <div className='row'>
                        <div className='col-md-2'>
                            <h2>Weight:</h2>
                        </div>
                        <div className='col-md-2'>
                            <input className='form-control' type='number' min='0' max='100000' id='setsWeight' value={this.state.sessionDetails[index].weight||''} onChange={this.handleWeightInput.bind(this,index)} required></input>
                        </div>
                    </div>
                    <div className='container'>
                        {exercise.reps.map((rep,set)=>{
                            return(
                                <div className='row' key={index+'-'+set}>
                                    <div className='col-md-2'>
                                        <h5>Set {set+1}:</h5>
                                    </div>
                                    <div className='col-md-3'>
                                        <label>Reps</label>
                                        <div className='setRepsDiv'>
                                            <button onClick={this.handleRepsIncrease.bind(this,index,set)} type='button' className='startButton increaseReps'>+</button> 
                                            <div className='repsDiv'>
                                                <span className='setReps'>{this.state.sessionDetails[index].reps[set]||''}</span> 
                                            </div>
                                            <button onClick={this.handleRepsDecrease.bind(this,index,set)} type='button' className='deleteButton decreaseReps'>-</button>
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <label htmlFor='setNotes'>Notes</label>
                                        <input className='form-control' id='setNotes' value={this.state.sessionDetails[index].notes[set]||''} onChange={this.handleNotesInput.bind(this,index,set)}></input>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <hr></hr>
            </div>
        )
    }

    componentDidMount(){
        if (this.props.location.pathname === '/workout' ){
            const routineID = this.props.getActiveID('activeRoutineID');
            this.setState({
                create:true,
                sessionDate:new Date()
            });
            axios.get('/routines/findByRoutineIDForSession/'+routineID)
            .then(response =>{
                this.setState({
                    //setup from the routine
                    routineName:response.data.routineName,
                    routineNotes:response.data.routineNotes,

                    //for recording the session
                    routineID:routineID,
                    sessionDetails:response.data.routineTemplate
                })
            })
            .catch(err=> console.log(err));
        }else{
            //editing a session
            this.setState({create:false});
            const sessionID = this.props.getActiveID('activeSessionID');
            axios.get('/sessions/findBySessionID/'+sessionID)
            .then(response =>{
                this.setState({
                    //setup from the routine
                    routineName:response.data.routineName,
                    routineNotes:response.data.routineNotes,
                    routineID:response.data.routineID,

                    //for recording the session
                    sessionID:sessionID,
                    sessionDetails:response.data.sessionDetails,
                    sessionNotes:response.data.sessionNotes,
                    sessionDate:response.data.sessionDate
                })
            })
            .catch(err=> console.log(err));
        }
    }

    handleWeightInput(index,event){
        let updateSession = [...this.state.sessionDetails];
        updateSession[index].weight = event.target.value;
        this.setState(prevState => ({sessionDetails:[...prevState.sessionDetails]}));
    }

    handleRepsIncrease(index,set){
        let updateSession = [...this.state.sessionDetails];
        updateSession[index].reps[set] ++
        this.setState(prevState => ({sessionDetails:[...prevState.sessionDetails]}));
    }
    handleRepsDecrease(index,set){
        let updateSession = [...this.state.sessionDetails];
        updateSession[index].reps[set] --
        this.setState(prevState => ({sessionDetails:[...prevState.sessionDetails]}));
    }

    handleNotesInput(index,set,event){
        let updateSession = [...this.state.sessionDetails];
        updateSession[index].notes[set] = event.target.value;
        this.setState(prevState => ({sessionDetails:[...prevState.sessionDetails]}));
    }

    handleSessionNotes(event){
        let sessionNotes = [...this.state.sessionNotes];
        sessionNotes = event.target.value;
        this.setState({sessionNotes});
    }

    handleTimerButton(event){
        if (event.target.value === 'pause'){
            this.setState({timerStart:false})
            clearInterval(this.timer)
        }else if (event.target.value === 'start'){
            this.setState({
                timerStart:true,
            })
            this.timer = setInterval(() => 
                this.setState({
                    timeSeconds:this.state.timeSeconds+1
                })
            ,1000)
        }else{
            this.setState({
                timeSeconds: 0,
                timerStart:false
            })
            clearInterval(this.timer)
        }
    }

    onUpdate(event){
        event.preventDefault();

        this.state.sessionDetails.map((exercise,exerciseIndex) =>{
            let exerciseWeight = exercise.weight
            let volume = 0
            return(
                this.state.sessionDetails[exerciseIndex].reps.map((set, setIndex)=>{
                    let reps = set
                    volume = volume + reps*exerciseWeight
                    let updateVolume = [...this.state.sessionDetails]
                    updateVolume[exerciseIndex].volume = volume
                    return(
                        this.setState(prevState => ({sessionDetails:[...prevState.sessionDetails]}))
                    )
                })
            )
        })
        
        const session = {
            sessionID:this.state.sessionID,
            sessionDetails:this.state.sessionDetails,
            sessionNotes:this.state.sessionNotes
        }
        axios.post("/sessions/updateSession",session)
            .catch(err => this.setState({submitError:err.message}));
        localStorage.clear();
        window.location = '/sessions'
    }

    onEndSession(event){
        event.preventDefault();
        const sessionDate = new Date()
        let weekDay = '';
        let month = '';
        let day = 0;

        this.state.sessionDetails.map((exercise,exerciseIndex) =>{
            let exerciseWeight = exercise.weight
            let volume = 0
            return(
                this.state.sessionDetails[exerciseIndex].reps.map((set)=>{
                    let reps = set
                    volume = volume + reps*exerciseWeight
                    let updateVolume = [...this.state.sessionDetails]
                    updateVolume[exerciseIndex].volume = volume
                    return(
                        this.setState(prevState => ({sessionDetails:[...prevState.sessionDetails]}))
                    )
                })
            )
        })

        day = sessionDate.getDate()

        switch (sessionDate.getDay()){
            case 0:
                weekDay = 'Sun'
                break;
            case 1:
                weekDay = 'Mon'
                break;
            case 2:
                weekDay = 'Tue'
                break;
            case 3:
                weekDay = 'Wed'
                break;
            case 4:
                weekDay = 'Thu'
                break;
            case 5:
                weekDay = 'Fri'
                break;
            default:
                weekDay = 'Sat'
        }

        switch (sessionDate.getMonth()){
            case 0:
                month = 'Jan'
                break;
            case 1:
                month = 'Feb'
                break;
            case 2:
                month = 'Mar'
                break;
            case 3:
                month = 'Apr'
                break;
            case 4:
                month = 'May'
                break;
            case 5:
                month = 'Jun'
                break;
            case 6:
                month = 'Jul'
                break;
            case 7:
                month = 'Aug'
                break;
            case 8:
                month = 'Sep'
                break;
                case 9:
                month = 'Oct'
                break;
            case 10:
                month = 'Nov'
                break;
            default:
                month = 'Dec'
            }
        
        const session = {
            routineName:this.state.routineName,
            routineNotes:this.state.routineNotes,
            username:this.props.user,
            routineID:this.state.routineID,
            sessionDetails:this.state.sessionDetails,
            sessionNotes:this.state.sessionNotes,
            sessionDate:sessionDate,
            weekDay:weekDay,
            month:month,
            day:day
        }

        axios.post("/sessions/createSession",session)
            .catch(err => this.setState({submitError:err.message}));
        localStorage.clear();
        window.location = '/sessions'
    }

    componentWillUnmount(){
        clearInterval(this.timer)
    }

    render(){
        return(
            <div className='markerSection container' >
                <h2>{this.state.routineName}</h2>
                <h2>{this.state.routineNotes}</h2>
                {this.state.submitError && <Alert variant='danger'>{this.state.submitError}</Alert>}
                {this.state.create ?
                <form onSubmit={this.onEndSession.bind(this)}>
                    {this.sessionPlan()}
                    <div className='row'>
                        <div className='col-md-6'>
                            <label htmlFor='sessionNotes'>Session Notes</label>
                            <input className='form-control' id='sessionNotes' value={this.state.sessionNotes} type='text' onChange={this.handleSessionNotes.bind(this)} ></input>                    
                        </div>
                    </div>                      
                    <button className='generalButton' type='submit'>End Session</button>
                </form>
                :
                <form onSubmit={this.onUpdate.bind(this)}> 
                    {this.sessionPlan()}
                    <div className='row'>
                        <div className='col-md-6'>
                            <label htmlFor='sessionNotes'>Session Notes</label>
                            <input className='form-control' id='sessionNotes' value={this.state.sessionNotes} type='text' onChange={this.handleSessionNotes.bind(this)} ></input>                    
                        </div>
                    </div>                    
                    <button className='generalButton' type='submit'>Update</button>
                </form>
                }
                {this.state.create ? 
                <Link className='deleteButton' to='/routines' >Cancel</Link>
                :
                <Link className='deleteButton' to='/sessions' >Cancel</Link>
                }

                <div className='setTimerDiv'>
                    {this.state.timerStart ?
                    <button onClick={this.handleTimerButton.bind(this)} value='pause' type='button' className='generalButton'>Pause</button>
                    :
                    <button onClick={this.handleTimerButton.bind(this)} value='start' type='button' className='startButton'>Start</button>
                    }
                    <div className='timerDiv'>
                        <span>{this.state.timeSeconds}</span>
                    </div>
                    <button onClick={this.handleTimerButton.bind(this)} type='button' className='deleteButton'>Reset</button>
                </div>
                
            </div>
        )
    }
}
