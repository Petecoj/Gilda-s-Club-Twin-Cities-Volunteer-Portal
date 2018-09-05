import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../../Header/Header';
import VolunteerNav from '../../Nav/VolunteerNav/VolunteerNav'
import { USER_ACTIONS } from '../../../redux/actions/userActions'



const mapStateToProps = state => ({
  user: state.user,
});

class Announcements extends Component {
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
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
        <h1>my Announcements!!</h1>
        {/* { content } */}
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(Announcements);

