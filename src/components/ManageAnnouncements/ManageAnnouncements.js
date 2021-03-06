import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Button } from '@material-ui/core';
import Header from '../Header/Header';
import AdminNav from '../Nav/AdminNav/AdminNav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import AnnouncementCard from '../AnnouncementsCard/AnnouncementCard';
import AnnouncementsCreateForm from  '../AnnouncementsCreateForm/AnnouncementsCreateForm';


const mapStateToProps = state => ({
  user: state.user,
  state
});

class Announcements extends Component {
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.props.dispatch({ type: 'GET_ANNOUNCEMENTS_LIST'})
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && (this.props.user.email === null || this.props.user.access_level < 2)) {
      this.props.history.push('/home');
    }
  }


  render() {

    let content = null;
    let announcementList = this.props.state.announcementsReducer.announcements.map((announcement, index) => {
      return (
              <AnnouncementCard
                  key={index}
                  announcement = {announcement}
              />
             )
  })

    if (this.props.user.access_level >=2 ) {
      content = (
        <div>
        <AnnouncementsCreateForm/>
        </div>
      );
    }

    return (
      <div>
        <Header admin={true} />
        <AdminNav />
        { content }
        {announcementList}

      </div>
    );
  }
}

export default connect(mapStateToProps)(Announcements);

