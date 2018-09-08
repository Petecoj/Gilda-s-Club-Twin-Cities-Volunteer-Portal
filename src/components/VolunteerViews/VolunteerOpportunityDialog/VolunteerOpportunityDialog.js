import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {connect} from 'react-redux';

class VolunteerOpportunityDialog extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  signUp = () => {
    this.props.dispatch({
        type: 'SIGN_UP_VOLUNTEER',
        payload: this.props.shift.id
    });
  }

  withdraw = () => {

  }

  render() {
    return (
      <div>
        <Button onClick={this.handleClickOpen}>More Info</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{this.props.shift.title}</DialogTitle>
          <img src={this.props.shift.image} height="150" />
          <DialogContent>
          <DialogTitle id="alert-dialog-title">{this.props.shift.certification_name}</DialogTitle>
          <DialogContentText id="alert-dialog-description">
              Date: {this.props.shift.date}
            </DialogContentText>
            <DialogContentText id="alert-dialog-description">
              Time: {this.props.shift.start_time} – {this.props.shift.end_time}
            </DialogContentText>
            <DialogContentText id="alert-dialog-description">
              Location:
            </DialogContentText>
            <DialogContentText id="alert-dialog-description">
                {this.props.shift.address_line1}
            </DialogContentText>
            <DialogContentText id="alert-dialog-description">
                {this.props.shift.address_line2}
            </DialogContentText>
            <DialogContentText id="alert-dialog-description">
                {this.props.shift.city}, {this.props.shift.state} {this.props.shift.zip}
            </DialogContentText>
            <DialogContentText id="alert-dialog-description">
              {this.props.shift.description}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Close
            </Button>
            <Button onClick={this.signUp} color="primary" autoFocus>
              Sign Up
            </Button>
            <Button onClick={this.withdraw} color="primary" autoFocus>
              Withdraw
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default connect()(VolunteerOpportunityDialog);