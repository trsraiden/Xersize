import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

const Routine = props => (
    <div className='col-md-6 cardStyling' >
        <div className='cardBody'>
            {props.userAuthor ? 
                <h5 className='cardTitle'>{props.routine.routineName}</h5>:
                <h5 className='cardTitle'>{props.routine.routineName}</h5>
            }
            <hr></hr>
            {props.routine.routineTemplate.map((section,index)=>{
                return(
                    <Exercise section={section} key={index} index={index}/>
                )
            }
            )}
            <form>
                <div className='buttonsDiv'>
                    <div className='buttonDiv'>
                    {props.userAuthor && <Link className='startButton' onClick={()=>{props.setActiveID('activeRoutineID',props.routine._id)}} to={{pathname:'/workout'}}>Start Session</Link>}

                    </div>
                    <div className='buttonDiv'>
                    {props.userAuthor && <Link className='generalButton' onClick={()=>{props.setActiveID('activeRoutineID',props.routine._id)}} to={'/routineedit'}>Edit</Link>}

                    </div>
                    <div className='buttonDiv'>
                    {props.userAuthor && <button className='deleteButton' type='button' onClick={()=>{props.deleteRoutine(props.routine._id)}}>Delete</button>}

                    </div>
                </div>
                <div className='buttonsDiv'>
                    {props.userAuthor === false && <button className='generalButton' type='submit' onClick={()=>{props.copyRoutine(props.index)}}>Grab a Copy</button>}
                </div>
            </form>
        </div>
    </div>
)

const Exercise = props =>(
    <p className='workoutSection' >{props.index+1}. {props.section.exercise}: {props.section.sets} Sets x {props.section.reps} Reps - Rest {props.section.rest} seconds</p>
)

export default class RoutineDash extends Component{
    constructor(props){
        super(props);

        this.deleteRoutine = this.deleteRoutine.bind(this);
        this.copyRoutine = this.copyRoutine.bind(this);
        
        this.state = {
            username:'',
            userRoutines:[],
            communityRoutines:[]
        };

    }

    componentDidMount(){
        this.setState({username:this.props.user})
        axios.get('/routines/findRoutineByAuthor/'+this.props.user)
            .then(response => {
                this.setState({userRoutines: response.data})
            })
            .catch(err => {
                console.log(err);
            })
        axios.get('/routines/findRoutineByOtherAuthor/'+this.props.user)
        .then(response => {
            this.setState({communityRoutines: response.data})
        })
        .catch(err => {
            console.log(err);
        })
    }

    deleteRoutine(idRoutine){
        axios.delete('/routines/deleteRoutine/'+idRoutine)
        this.setState({
            userRoutines:this.state.userRoutines.filter(e => e._id !==idRoutine)
        })
    }

    copyRoutine(index){
        const copyRoutine = {
            routineTemplate:this.state.communityRoutines[index].routineTemplate,
            routineName:this.state.communityRoutines[index].routineName,
            routineNotes:this.state.communityRoutines[index].routineNotes
        }
        axios.post('/routines/createRoutineCopy/'+this.props.user, copyRoutine)
    }

    showUserRoutines(){
        return(
            this.state.userRoutines.length === 0 ? 
            <h5 className='robotoSection newRoutine' >...Looks like you don't have any routines. But now's the perfect time to make one!</h5> 
            :<div className='row' >
                {this.state.userRoutines.map((routine,index) => {
                    return( 
                        <Routine 
                            routine={routine} 
                            key={index} 
                            index={index} 
                            userAuthor={true} 
                            deleteRoutine={this.deleteRoutine} 
                            copyRoutine={this.copyRoutine}
                            setActiveID={this.props.setActiveID}
                        />
                    )
                })}
            </div>
        )
    }

    showCommunityRoutines(){
        return(
            this.state.communityRoutines.length === 0 ? 
            <h5 className='robotoSection newRoutine'>... just as soon as the community starts making them!</h5> 
            :<div className='row'>
                {this.state.communityRoutines.map((routine,index) => {
                    return( 
                        <Routine 
                            routine={routine} 
                            key={index} 
                            index={index} 
                            userAuthor={false} 
                            deleteRoutine={this.deleteRoutine} 
                            copyRoutine={this.copyRoutine} 
                        />
                    )
                })}
            </div>
        )
    }

    render(){
        return(
            <div className='container markerSection'>
                <h1>Routines Overview</h1>
                <h2>Your Routines</h2>
                {this.showUserRoutines()}
                <h5 className='robotoSection newRoutine' >Wanna create something new?  <Link className='generalButton markerSection' to='/routinecreate'>New Routine</Link></h5>
                <hr></hr>
                <h2>Routines from the community</h2>
                <h5 className='robotoSection newRoutine' >See a routine you like? Grab a copy and try it out.</h5>
                {this.showCommunityRoutines()}
            </div>
        )
    }
}