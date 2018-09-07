import { put as dispatch, takeEvery, call } from 'redux-saga/effects';
import axios from 'axios'


function* getUsers(){
    try{
        const volunteerList = yield call(axios.get, '/api/volunteers')
        yield dispatch({
            type: 'GET_VOLUNTEERS',
            payload: volunteerList.data
        })
    } catch  (err) {
        yield console.log(err);
      }
}

function* fetchVolunteerInfo() {
    try {
        const volunteerInfo = yield call(axios.get, '/api/volunteers/info')
        yield dispatch({
            type: 'SET_VOLUNTEER_INFO',
            payload: volunteerInfo.data
        })
    } catch (error) {
        yield console.log(error);
    }
}

// function* getEventCurrentVolunteers(){
//     try{
//         const currentVolunteerList = yield call(axios.get, '/api/volunteers')
//         yield dispatch({
//             type: 'CURRENT_EVENT_VOLUNTEERS',
//             payload: currentVolunteerList.data
//         })
//     } catch  (err) {
//         yield console.log(err);
//       }

// }
 function* getMyVolunteerEvents(){
         try{
        const myAvailableEvents = yield call(axios.get, '/api/volunteers/my_available_events')
        console.log(myAvailableEvents);
    
        yield dispatch({
            type: 'MY_AVAILABLE_EVENTS',
            payload: myAvailableEvents.data
        })
    } catch  (err) {
        yield console.log(err);
      }

 }
function* updateVolunteers(action){
    console.log(action.payload);
        try{
            const update = yield call(axios.put, `/api/volunteers/updateInfo/`, action.payload)
            // yield dispatch({

            // })
        }catch(err){
            console.log(err);
            
        }
}


function* volunteerSaga(){
    yield takeEvery('GET_USERS', getUsers)
    yield takeEvery('UPDATE_VOLUNTEER_INFO', updateVolunteers)
    yield takeEvery('FETCH_VOLUNTEER_INFO', fetchVolunteerInfo);
    yield takeEvery('GET_MY_VOLUNTEER_EVENTS', getMyVolunteerEvents)
}





export default volunteerSaga;