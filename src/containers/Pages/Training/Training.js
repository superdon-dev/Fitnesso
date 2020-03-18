import React, {Component} from 'react'
import './Training.css';
import Card from '../../../components/Card/Card';
import { connect } from 'react-redux';
import Spinner from '../../../components/Spinner/Spinner';
import * as actions from '../../../store/actions/exports';

class Training extends Component {
    componentDidMount(){
        if(this.props.userId){
            this.props.trainingsFetch(this.props.userId);
        }
    }
    render(){
        let content = <Spinner />;
        if(this.props.trainings){
            content = (                
                this.props.trainings.map(training => {
                    return <Card key={training.training} training={training.training} timing={new Date(training.time.seconds*1000).toISOString()} place={training.place}/>
                })
            )
        }
        return (
            <div className="Training">
                {content}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        userId: state.auth.userId,
        trainings: state.trainings.trainings,
        loading: state.trainings.loading,
        error: state.trainings.error,
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        trainingsFetch: (userId) => dispatch(actions.trainingsFetch(userId)),
        
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(Training)
