import React, { Component } from 'react'
import * as actions from '../../store/actions/exports';
import { connect } from 'react-redux';
import Spinner from '../../components/Spinner/Spinner';
export class Header extends Component {
    componentDidMount(){
        this.props.userFetch(this.props.userId);
    }
    render() {
        let header = <div>Welcome {this.props.fullname}</div>;
        if(this.props.loading){
            header = <Spinner />;
        }
        return (
            <div>
                {header}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.auth.userId,
        fullname: state.user.fullname,
        gender: state.user.gender,
        height: state.user.height,
        weight: state.user.weight,
        loading: state.user.loading,
        error: state.user.error,
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        userFetch: (userId) => dispatch(actions.userFetch(userId)),
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(Header)
