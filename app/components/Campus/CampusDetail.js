import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


import CampusItem from './CampusItem';
import StudentItem from '../Student/StudentItem';
import { addStudent } from '../../reducers/students';
import { updateCampus } from '../../reducers/campuses'

/* -----------------    COMPONENT     ------------------ */

class CampusDetail extends Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this)
    this.campusSubmit = this.campusSubmit.bind(this)
  }

  render() {
    const { campus, students } = this.props;
    if (!campus) return <div />
    const campusStudents = students.filter(student => student.schoolId === campus.id)
    return (
      <div className="container">
        <CampusItem campus={campus} />
        <div className="panel panel-warning">
          <div className="panel-heading">
            <h2 className="panel-title large-font">Students</h2>
          </div>
          <ul className="list-group">
            {
              campusStudents.map(student => <StudentItem student={student} key={student.id} />)
            }
          </ul>
        </div>
        <div className="panel panel-warning">
          <div className="panel-heading">
            <h2 className="panel-title large-font">Edit Campus</h2>
          </div>
          <form className="list-group-item" onSubmit={this.campusSubmit}>
            <input
              name="name"
              type="text"
              placeholder={campus.name}
            />
            <input
              name="location"
              type="text"
              placeholder={campus.location}
            />
            <button type="submit" className="btn btn-warning btn-xs">
              <span className="glyphicon glyphicon-pencil" />
            </button>
          </form>
        </div>
        <div className="panel panel-warning">
          <div className="panel-heading">
            <h2 className="panel-title large-font">Add a student</h2>
          </div>
          <form className="list-group-item" onSubmit={this.onSubmit}>
            <input
              name="name"
              type="text"
              required
              placeholder="Student Name"
            />
            <input
              name="email"
              type="text"
              required
              placeholder="Student Email"
            />
            <button type="submit" className="btn btn-warning btn-xs">
              <span className="glyphicon glyphicon-plus" />
            </button>
          </form>

        </div>
      </div>
    );
  }

  onSubmit(event) {
    event.preventDefault()
    // event.stopPropogation()
    const { add, campus } = this.props
    const student = {
      name: event.target.name.value,
      email: event.target.email.value,
      image: 'dummy',
      schoolId: campus.id
    };
    add(student);
    event.target.name.value = ''
    event.target.email.value = ''
  }

  campusSubmit(event) {
    event.preventDefault()
    const { edit, campus } = this.props
    const moddedCampus = {
      name: event.target.name.value || campus.name,
      location: event.target.location.value || campus.location
    }
    edit(campus.id, moddedCampus)
    event.target.name.value = ''
    event.target.location.value = ''
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = (state , ownProps) => {
  const paramId = Number(ownProps.match.params.id);
  return {
    campus: state.campuses.find(campus => campus.id === paramId),
    students: state.students
  };
};

const mapDispatch = (dispatch) => ({
  add: (studentToAdd) => {
    dispatch(addStudent(studentToAdd))
  },
  edit: (id, moddedCampus) => {
    dispatch(updateCampus(id, moddedCampus))
  }
})

export default connect(mapState, mapDispatch)(CampusDetail);
