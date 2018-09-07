import React, { Component } from 'react';
import { connect } from 'react-redux';

import VolunteerNav from '../../Nav/VolunteerNav/VolunteerNav'
import Header from '../../Header/Header';

import { USER_ACTIONS } from '../../../redux/actions/userActions'
// import { triggerLogout } from '../../redux/actions/loginActions';


const mapStateToProps = state => ({
    user: state.user,
});

class MyShifts extends Component {
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.props.dispatch({ type: 'FETCH_SINGLE_VOLUNTEER_OPPORTUNITIES'})
  }
  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.email === null) {
      this.props.history.push('home');
    }
  }


  render() {
    let content = null;

    if (this.props.user.email) {
      content = (
        <div>
        </div>
      );
    }

    return (
      <div>
        <Header />
        <VolunteerNav />
        <h1>My Shift!!</h1>
        {/* { content } */}
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(MyShifts);
