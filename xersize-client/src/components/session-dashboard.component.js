import axios from 'axios';
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Line} from 'react-chartjs-2';

const Session = props => (
    // <div key={props.index} className='col-sm-3 cardStyling'>
    //     <div className='cardBody sessionCard'>

    <div key={props.index} className='col-md-4 cardStyling'>
        <div className='cardBody'>
            <h5 >{props.session.weekDay} {props.session.month} {props.session.day}</h5>
            <h5>{props.session.routineName}</h5>
            {props.session.sessionDetails.map((exercise,index)=>{
                return(
                    <p key={index} className='text-muted'>{index+1}. {exercise.exercise} - {exercise.weight}lbs x {exercise.reps[0]}</p>
                )
            })
            }
            <form>
                <p className='text-muted'>{props.session.sessionNotes}</p>
                <div className='buttonsDiv'>
                    <div className='buttonDiv'>
                        <Link className='generalButton' onClick={()=>props.setActiveID('activeSessionID', props.session._id)} to={'/workoutedit'}>Edit/Review</Link>
                    </div>
                    <div className='buttonDiv'>
                        <button className='deleteButton' type='button' onClick={()=>{props.deleteSession(props.session._id)}}>Delete</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
)

export default class SessionsDashboard extends Component{
    constructor(props){
        super(props);

        this.state = {
            sessionReviewTitle:'7 day review',
            dateRangeSessions:[],
            earlierDate:Date,
            laterDate:Date,
            reviewRange:'',
            weightChartData:[],
            volumeChartData:[]
        };
    }

    componentDidMount(){
        let earlierDate = new Date();
        let laterDate = new Date();
        earlierDate.setDate(earlierDate.getDate()-7);
        earlierDate.setHours(0,0,0,0);
    
        this.searchDates(earlierDate,laterDate);
    }

    handleDateChange(event){
        if (event.target.id === 'earlierDate'){
            this.setState({earlierDate:event.target.value})
        }else{
            this.setState({laterDate:event.target.value})
        }
    }

    onSearch(event){
        event.preventDefault();
        this.setState({sessionReviewTitle:'Custome Range'})

        let earlierDate = this.state.earlierDate;
        let laterDate = this.state.laterDate;

        this.searchDates(earlierDate,laterDate);
    }

    deleteSession(idSession){
        axios.delete('/sessions/deleteSession/'+idSession)
        this.setState({
            dateRangeSessions:this.state.dateRangeSessions.filter(session => session._id !==idSession)
        })
    }

    searchDates(earlierDate, laterDate){
        const dateRange={
            username:this.props.user,
            earlierDate:earlierDate,
            laterDate:laterDate
        }

        axios.post('/sessions/findSessionsByDate', dateRange)
            .then(sessionsInRange => {
                return(
                    this.setState(
                        {
                            dateRangeSessions:sessionsInRange.data.sessions,
                            weightChartData:sessionsInRange.data.weightChartData,
                            volumeChartData:sessionsInRange.data.volumeChartData
                        }
                    )
                )
            })
            .catch(err => {
                console.log(err);
            }); 
    }

    render(){
        return(
            <div className='container markerSection'>
                <h1>Sessions Overview</h1>
                <h2>Review Range</h2>
                <form onSubmit={this.onSearch.bind(this)}>
                <div className='row dateSearchDiv'>
                    <div className='col-sm-5'>
                        <label htmlFor='earlierDate'>From:</label>
                        <input id='earlierDate' type='date' className='form-control' onChange={this.handleDateChange.bind(this)} required></input>
                    </div>
                    <div className='col-sm-5'>
                    <label htmlFor='laterDate'>To:</label>
                        <input id='laterDate' type='date' className='form-control' onChange={this.handleDateChange.bind(this)} required></input>
                    </div>
                    <div className='col-sm-2 buttonsDiv'>
                        <button className='generalButton dateSearchButton'>Search</button>
                    </div>
                </div>
                </form>
                <h2>{this.state.sessionReviewTitle}</h2>
                {this.state.dateRangeSessions.length > 0 ? 
                <div className='row'>
                    {this.state.dateRangeSessions.map((session,index) => {
                        return( 
                            <Session 
                                session={session} 
                                key={index} 
                                index={index} 
                                deleteSession={this.deleteSession.bind(this)} 
                                setActiveID={this.props.setActiveID}
                            />
                        )
                    })}  
                </div>
                :
                <div className='notices robotoSection'>
                    <h5>Looks like you don't have any sessions from this range of dates. Try changing the range above, or start a new session in the routines section to see it appear here.</h5>
                </div>
                }
                <h2>Visualize your progress</h2>
                {this.state.weightChartData.length > 0 ? 
                this.state.weightChartData.map((exercise, index)=>
                    <div key={index}>
                        <h2 className='sessionsChartTitle'>{exercise.datasets[0].label}</h2>
                        <div className='row'>
                            <div className='col-md-6 chart'>
                            <h4 className='sessionsChartTitle'>Weight</h4>
                            <Line
                                data = {exercise}
                                options={exercise.options}
                            />
                            </div>
                            <div className='col-md-6 chart'>
                            <h4 className='sessionsChartTitle'>Volume</h4>
                            <Line
                                data = {this.state.volumeChartData[index]}
                                options={this.state.volumeChartData[index].options}
                            />
                            </div>
                        </div>
                    </div>
                )
                :
                <div className='notices robotoSection'>
                    <h5>No progress to show from the current range of dates.</h5>
                </div>
                }
                </div>
        )
    }

}