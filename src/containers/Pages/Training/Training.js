import React, {Component} from 'react'
import './Training.css';
import Card from '../../../components/Card/Card';
import { connect } from 'react-redux';
import Spinner from '../../../components/Spinner/Spinner';
import Alert from '../../../components/Alert/Alert';
import * as actions from '../../../store/actions/exports';

class Training extends Component {
    componentDidMount(){
        if(this.props.userId){
            this.props.trainingsFetch(this.props.userId, this.props.userType);
        }
    }
    render(){
        let content = <Spinner />;
        if(this.props.empty){
            content = <Alert message={this.props.empty} />
        }
        if(this.props.trainings){
            content = (                
                this.props.trainings.map(training => {
                    return <Card key={training.training} trainer={training.trainerFullname} training={training.type} timing={training.time} place={training.place}/>
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
        userType: state.user.userType,
        trainings: state.trainings.trainings,
        empty: state.trainings.empty,
        loading: state.trainings.loading,
        error: state.trainings.error,
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        trainingsFetch: (userId, userType) => dispatch(actions.trainingsFetch(userId, userType)),
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(Training)
