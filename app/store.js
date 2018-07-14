import { createStore, applyMiddleware } from 'redux'
import axios from 'axios'
import rootReducer from './reducers'
import loggingMiddleware from 'redux-logger' // https://github.com/evgenyrodionov/redux-logger
import thunkMiddleware from 'redux-thunk' // https://github.com/gaearon/redux-thunk

const GOT_CAMPUSES_FROM_SERVER = 'GOT_CAMPUSES_FROM_SERVER'

//in the future when refactoring to use redux

export const gotCampusesFromServer = campuses => {
  return {
    type: GOT_CAMPUSES_FROM_SERVER,
    campuses
  }
}

const initialState = {
  campuses: [],
  students: []
}

const fetchCampuses = () => async dispatch => {
  const res = await axios.get('/api/campuses')
  const campuses = res.data
  const action = gotCampusesFromServer(campuses);
  dispatch(action)
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_CAMPUSES_FROM_SERVER:
      return {
        ...state,
        campuses: action.campuses
      }
    default:
      return state
  }
}

export default createStore(
  // rootReducer,
  reducer,
  applyMiddleware(
    // `withExtraArgument` gives us access to axios in our async action creators!
    // https://github.com/reduxjs/redux-thunk#injecting-a-custom-argument
    thunkMiddleware.withExtraArgument({ axios }),
    loggingMiddleware
  )
)
