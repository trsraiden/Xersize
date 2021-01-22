import React, {Component} from 'react';
import axios from 'axios';
import {Alert} from 'react-bootstrap';

export default class RoutinesManager extends Component{
    constructor(props){
        super(props);

        this.onAdd = this.onAdd.bind(this);
        this.onFinish = this.onFinish.bind(this);
        this.onUpdate = this.onUpdate.bind(this);

        this.state = {
            authorName:"",
            routineName:"",
            routineTemplate:[],
            routineNotes:"",
            routineID:"",

            submitError:"",
            create:true
        }
    }

    routinePlan(){
        return this.state.routineTemplate.map((e, i) =>
            <div key={i} className='container'>
                {/* <div className='form-group'>
                        <label htmlFor='exerciseName'>Exercise Name</label>
                        <input className='form-control' id='exerciseName' type='text' value={this.state.routineTemplate[i].exercise||''} onChange={this.handleExerciseChange.bind(this, i)} required></input>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-4'>
                                <label htmlFor='setsGoal'>Sets</label>
                                <input className='form-control' id='setsGoal' type='number' min='0' max='100000' value={this.state.routineTemplate[i].sets||''} onChange={this.handleSetChange.bind(this, i)} required></input>
                            </div>
                            <div className='col-md-4'>
                                <label htmlFor='repsGoal'>Reps</label>
                                <input className='form-control' id='repsGoal' type='number' min='0' max='100000' value={this.state.routineTemplate[i].reps||''} onChange={this.handleRepChange.bind(this, i)} required></input>
                            </div>
                            <div className='col-md-4'>
                                <label htmlFor='restGoal'>Rest (seconds)</label>
                                <input className='form-control' id='restGoal' type='number' min='0' max='100000' value={this.state.routineTemplate[i].rest||''} onChange={this.handleRestChange.bind(this, i)} required></input>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-4'>
                            <button className='generalButton' value='up' type='button' onClick={this.onUp.bind(this, i)}>Make Earlier</button>
                        </div>
                        <div className='col-md-4'>
                            <button className='generalButton' value='down' type='button' onClick={this.onDown.bind(this, i)}>Make Later</button>
                        </div>
                        <div className='col-md-4'>
                            <button className='deleteButton' value='remove' type='button' onClick={this.onDelete.bind(this, i)}>Delete Exercise</button>
                        </div>
                    </div>
                </div>
                <hr></hr> */}
                <div className='row'>
                    <div className='col-md-4 exerciseNameColDiv '>
                        <div className='exerciseNameDiv'>
                            <label htmlFor='exerciseName'>Exercise Name</label>
                            <input className='form-control' id='exerciseName' type='text' value={this.state.routineTemplate[i].exercise||''} onChange={this.handleExerciseChange.bind(this, i)} required></input>
                        </div>
                    </div>
                    <div className='col-md-4 exerciseColDiv'>
                        <div className='exerciseSetsDiv'>
                            <label htmlFor='setsGoal'>Sets</label>
                            <input className='form-control' id='setsGoal' type='number' min='0' max='100000' value={this.state.routineTemplate[i].sets||''} onChange={this.handleSetChange.bind(this, i)} required></input>
                        </div>
                        <div className='exerciseRepsDiv'>
                            <label htmlFor='repsGoal'>Reps</label>
                            <input className='form-control' id='repsGoal' type='number' min='0' max='100000' value={this.state.routineTemplate[i].reps||''} onChange={this.handleRepChange.bind(this, i)} required></input>
                        </div>
                        <div className='exerciseRestDiv'>
                            <label htmlFor='restGoal'>Rest (seconds)</label>
                            <input className='form-control' id='restGoal' type='number' min='0' max='100000' value={this.state.routineTemplate[i].rest||''} onChange={this.handleRestChange.bind(this, i)} required></input>
                        </div>
                    </div>
                    <div className='col-md-4 exerciseColDiv'>
                        <div className='exerciseEarlierDiv'>
                            <button className='generalButton exerciseEarlier' value='up' type='button' onClick={this.onUp.bind(this, i)}>Earlier</button>
                        </div>
                        <div className='exerciseLaterDiv'>
                            <button className='generalButton exerciseLater' value='down' type='button' onClick={this.onDown.bind(this, i)}>Later</button>
                        </div>
                        <div className='exerciseDeleteDiv'>
                            <button className='deleteButton exerciseDelete' value='remove' type='button' onClick={this.onDelete.bind(this, i)}>Delete Exercise</button>
                        </div>
                    </div>
                </div>
                <hr></hr>
            </div>
        )
    }

    componentDidMount(){
        const pathnameSections = this.props.location.pathname.split('/');
        if (pathnameSections[1] === 'routineedit' ){
            this.setState({create:false});
            this.setState({routineID: this.props.getActiveID('activeRoutineID')});
            axios.get('/routines/findByRoutineID/'+this.props.getActiveID('activeRoutineID'))
                .then(response =>{
                    this.setState({
                        authorName:response.data.authorName,
                        routineName:response.data.routineName,
                        routineTemplate:response.data.routineTemplate,
                        routineNotes:response.data.routineNotes
                    })
                })
                .catch(err=> console.log(err));
        }
    }

    handleRoutineName(event){
        this.setState({routineName:event.target.value});
    }
    handleRoutineNotes(event){
        this.setState({routineNotes:event.target.value});
    }

    handleExerciseChange(i, event){
        let routineTemp = [...this.state.routineTemplate];
        routineTemp[i].exercise = event.target.value.toLowerCase();
        this.setState(prevState => ({routineTemplate:[...prevState.routineTemplate]}));
    }

    handleSetChange(i, event){
        let routineSets = [...this.state.routineTemplate];
        routineSets[i].sets = event.target.value;
        this.setState(prevState => ({routineTemplate:[...prevState.routineTemplate]}));
        
    }

    handleRepChange(i, event){
        let routineReps = [...this.state.routineTemplate];
        routineReps[i].reps = event.target.value;
        this.setState(prevState => ({routineTemplate:[...prevState.routineTemplate]}));
    }

    handleRestChange(i, event){
        let routineRest = [...this.state.routineTemplate];
        routineRest[i].rest = event.target.value;
        this.setState(prevState => ({routineTemplate:[...prevState.routineTemplate]}));
    }

    onDelete(i){
        let routineTemplate = [...this.state.routineTemplate];
        routineTemplate.splice(i,1);
        this.setState({routineTemplate});
    }

    onUp(i){
        let routineTemplate=[...this.state.routineTemplate];
        let exerciseInfo = routineTemplate[i];
        if (i>0) {
            routineTemplate.splice(i-1,0,exerciseInfo);
            routineTemplate.splice(i+1,1);
            this.setState({routineTemplate});
        }else{
            alert("There are no exercises above this.");
        }
    }

    onDown(i){
        let routineTemplate=[...this.state.routineTemplate];
        let exerciseInfo = routineTemplate[i+1];
        if (i<(routineTemplate.length-1)) {
            routineTemplate.splice(i,0,exerciseInfo);
            routineTemplate.splice(i+2,1);
            this.setState({routineTemplate});
        }else{
            alert("There are no exercises below this.");
        }
    }

    onAdd(event){
        let type = event.target.value
        this.setState(prevState => ({routineTemplate:[...prevState.routineTemplate,{type:type,exercise:'', sets:'',reps:'',rest:''}]}));
    }    

    onUpdate(event){
        event.preventDefault();
        const routine ={
            routineName:this.state.routineName,
            routineTemplate:this.state.routineTemplate,
            routineNotes:this.state.routineNotes,
        }
        const routineID = this.state.routineID;
        axios.post("/routines/updateRoutine/"+routineID, routine)
            .catch(err => this.setState({submitError:err.message}));
            localStorage.clear();
        window.location = '/routines'
    }

    onFinish(event){
        event.preventDefault();
        const routine ={
            authorName:this.props.user,
            routineName:this.state.routineName,
            routineTemplate:this.state.routineTemplate,
            routineNotes:this.state.routineNotes,
        }
        axios.post("/routines/createRoutine", routine)
            .catch(err => this.setState({submitError:err.message}));
        localStorage.clear();
        window.location = '/routines'
    }

    onCancel(){
        window.location = '/routines'
    }

    render(){
        return(
            <div className='container markerSection'>
                {this.state.submitError && <Alert variant='danger'>{this.state.submitError}</Alert>}
                {this.state.create ? 
                    <form onSubmit={this.onFinish}>
                        <h3>New Routine</h3>
                        <div className='form-group'>
                            <label htmlFor='routineName'>Routine Name</label>
                            <input className='form-control' id='routineName' value={this.state.routineName} type='text' onChange={this.handleRoutineName.bind(this)} required></input>
                            <label htmlFor='routineNotes'>Routine Notes</label>
                            <input className='form-control' id='routineNotes' value={this.state.routineNotes} type='text' onChange={this.handleRoutineNotes.bind(this)} ></input>
                        </div>
                        <hr></hr>
                        {this.routinePlan()}
                        <div className='row'>
                            <div className='col-md-4'>
                                <button className='generalButton' type='button' value='lift' onClick={this.onAdd.bind(this)}>Add Lift</button>
                            </div>
                            <div className='col-md-4'>
                            <button className='generalButton' type='submit'>Finished</button>
                            </div>
                            <div className='col-md-4'>
                                <button className='deleteButton' type='button' onClick={this.onCancel} >Cancel</button>
                            </div>
                        </div>
                    </form>
                    :
                    <form onSubmit={this.onUpdate}>
                        <h3>Edit Routine</h3>
                        <div className='form-group'>
                            <label htmlFor='routineName'>Routine Name</label>
                            <input className='form-control' id='routineName' value={this.state.routineName} type='text' onChange={this.handleRoutineName.bind(this)} required></input>
                            <label htmlFor='routineNotes'>Routine Notes</label>
                            <input className='form-control' id='routineNotes' value={this.state.routineNotes} type='text' onChange={this.handleRoutineNotes.bind(this)} ></input>
                        </div>
                        <hr></hr>
                        {this.routinePlan()}
                        <div className='row'>
                            <div className='col-md-4'>
                                <button className='generalButton' type='button' value='lift' onClick={this.onAdd.bind(this)}>Add Lift</button>
                            </div>
                            <div className='col-md-4'>
                                <button className='generalButton' type='submit'>Update</button>
                            </div>
                            <div className='col-md-4'>
                                <button className='deleteButton' type='button' onClick={this.onCancel} >Cancel</button>
                            </div>
                        </div>
                    </form>
                }
            </div>
        )
    }
}