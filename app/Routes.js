import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import history from './history';


import Root from './components/Root';
import Home from './components/Home';
//
import CampusList from './components/Campus/CampusList';
import CampusDetail from './components/Campus/CampusDetail';
import StudentList from './components/Student/StudentList';
import StudentDetail from './components/Student/StudentDetail';
import { fetchCampuses } from './reducers/campuses';
import { fetchStudents } from './reducers/students';

/* -----------------    COMPONENT     ------------------ */

class Routes extends Component {

  componentDidMount () {
    this.props.fetchInitialData();
  }

  render () {

    const NotFound = ({ location }) => (
      <div>
        <h3>Go back! :( No match for <code>{location.pathname}</code></h3>
      </div>
    )

    return (
      <Router history={history}>
        <Root>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/campuses" component={CampusList} />
            <Route path="/campuses/:id" component={CampusDetail} />
            <Route exact path="/students" component={StudentList} />
            <Route path="/students/:id" component={StudentDetail} />
            <Route component={NotFound} />
          </Switch>
        </Root>
      </Router>
    );
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapProps = null;

const mapDispatch = dispatch => ({
  fetchInitialData: () => {
    dispatch(fetchCampuses())
    dispatch(fetchStudents())
  }
});

export default connect(mapProps, mapDispatch)(Routes);
