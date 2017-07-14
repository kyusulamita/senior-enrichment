import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import StudentItem from './StudentItem';
import { addStudent } from '../../reducers/students';

/* -----------------    COMPONENT     ------------------ */

class StudentList extends React.Component {
  constructor(props) {
    super(props);

    this.newStudentForm = this.newStudentForm.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  render() {
    return (
      <div className="container">

        <ul className="list-group">
          { this.newStudentForm() }
          {
            this.props.students
            .map(student => <StudentItem student={student} key={student.id} />)
        }
        </ul>
      </div>
    );
  }

  newStudentForm() {
    return (
      <form onSubmit={this.onSubmit} >
        <ul className="list-group">
          {/* <li className="list-group-item"> */}
          <input
            name="name"
            type="text"
            placeholder="Student name"
          />
          {/* </li> */}
          {/* <li className="list-group-item"> */}
          <input
            name="email"
            type="text"
            placeholder="Student email"
          />
          {/* </li> */}
          {/* <li className="list-group-item"> */}
          <select name="schoolId" defaultValue="" required>
            <option value="" disabled>(select a campus)</option>
            {
              this.props.campuses.map(campus => (
                <option key={campus.id} value={campus.id}>{campus.name}</option>
              ))
            }
          </select>

          <button
            type="submit"
          className="btn btn-warning btn-xs pull-right">
            <span className="glyphicon glyphicon-plus" />
          </button>
        </ul>
      </form>
    );
  }

  onSubmit(event) {
    event.preventDefault()
    const student = {
      schoolId: event.target.schoolId.value,
      name: event.target.name.value,
      email: event.target.email.value,
      image: 'dummy'
    };
    console.log(student)
    this.props.add(student)
    event.target.schoolId.value = ''
    event.target.name.value = ''
    event.target.email.value = ''
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ campuses, students }) => ({ campuses, students });

const mapDispatch = (dispatch, ownProps) => ({
  add: (student) => {
    dispatch(addStudent(student))
  }
});

export default connect(mapState, mapDispatch)(StudentList);
