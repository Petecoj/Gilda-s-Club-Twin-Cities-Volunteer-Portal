import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import moment from 'moment';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import { DatePicker } from 'material-ui-pickers';

export default connect()(class FormDialog extends React.Component {
  state = {
    open: false,
    announcement: {
        date: moment(new Date()).format()
    }
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  addAnnouncement = () => {
    this.props.dispatch({
        type: 'ADD_ANNOUNCEMENT',
        payload: this.state.announcement
      })
    this.setState({ open: false });

  };
  handleDateChange = (date) => {
    this.setState({
      announcement: {
          ...this.state.announcement,
          date: date
      }
    });
  }

  handleChangeFor = (propertyName) => {    
    return (event ) => {
      this.setState({
       announcement: {
          ...this.state.announcement,
          [propertyName] : event.target.value,
        }
      })
    }
  }

  render() {
    

    return (
      <React.Fragment>
      <MuiPickersUtilsProvider utils={MomentUtils}>
      <div style={{margin: 50}}>
        <Button
                    variant="raised"
                    color="primary"
                    onClick={this.handleClickOpen}
                  >
                    Create Announcement
        </Button>
        </div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">New Announcement</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Whats your announcement?
            </DialogContentText>          
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="Announcement Title"
              fullWidth
              onChange={this.handleChangeFor("title")}
            />
             <TextField
              id="description"
              label="Announcement Description"
              multiline
              margin="dense"
              fullWidth
              onChange={this.handleChangeFor("description")}
            />  
    
          <DatePicker
           label="Select Date"
           showTodayButton
           maxDateMessage="Date must be less than today"
           format="dddd, MMM D, YYYY"
           value={this.state.date}
           onChange={this.handleDateChange}
           animateYearScrolling={false}
           autoOk
<<<<<<< HEAD
 
=======
>>>>>>> a4a9d7d96d5da1257c3616b8ca0817df6d85ac0e
         />
         
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.addAnnouncement} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
       </MuiPickersUtilsProvider>
       </React.Fragment>
    );
  }
}

)
