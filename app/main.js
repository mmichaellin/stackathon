import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import { HashRouter as Router, Route, Switch } from 'react-router-dom'

import store from './store'
import Root from './components/root'

import Navbar from './components/Navbar'
import AllCampuses from './components/AllCampuses'
import AllStudents from './components/AllStudents'
import SingleCampus from './components/SingleCampus'
import SingleStudent from './components/SingleStudent'
import AddCampus from './components/AddCampus'
import AddStudent from './components/AddStudent'
import EditCampus from './components/EditCampus'
import EditStudent from './components/EditStudent'

render(
  <Provider store={store}>
    <Router>
      <div>
        <h1>Senior Enrichment Project</h1>
        {<Navbar />}
        <Switch>
          <Route exact path='/campuses' component={AllCampuses} />
          <Route exact path='/campus/:location/editCampus' component={EditCampus} />
          <Route exact path='/student/:name/editstudent' component={EditStudent} />
          <Route exact path='/campus/:location' component={SingleCampus} />
          <Route exact path='/students' component={AllStudents} />
          <Route exact path='/student/:studentName' component={SingleStudent} />
          <Route exact path='/addcampus' component={AddCampus} />
          <Route exact path='/addstudent' component={AddStudent} />
          <Route exact path='/' component={AllCampuses} />
          <Route component={() => <h1>Not Found</h1>} />
        </Switch>
        {/* <Root /> */}
      </div>
    </Router>
  </Provider>,
  document.getElementById('main')
  // import { INSPECT_MAX_BYTES } from 'buffer';
)

