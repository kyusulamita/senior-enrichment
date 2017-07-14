import React from 'react'
import { connect } from 'react-redux'
import { updateStudent, fetchStudent } from '../../reducers/students';
import StudentItem from './StudentItem';

/* -----------------    COMPONENT     ------------------ */

class StudentDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      student: {
        name: '',
        schoolId: '',
        email: [],
        schoolName: {}
      }
    }
    this.onClick = this.onClick.bind(this)
    this.renderEditForm = this.renderEditForm.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount () {
    this.props.fetchStudentData()
  }

  componentWillReceiveProps (newProps) {

    if (newProps.match.params.id !== this.props.match.params.id) {
      this.props.fetchStudentData();
    }

    this.setState({ student: newProps.student });
  }
  onClick(){
    this.setState((prevState) => {showEditForm : !prevState.showEditForm})
  }

    renderEditForm (){
      const student = this.state.student
      return (
        <form onSubmit={this.onSubmit} >
          <ul className="list-group">
            <input
              name="name"
              type="text"
              placeholder={student.name}
            />
            <input
              name="email"
              type="text"
              placeholder={student.email}
            />
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
              <span className="glyphicon glyphicon-pencil" />
            </button>
          </ul>
        </form>
      );
    }

    onSubmit(event) {
      const student = this.state.student
      event.preventDefault()
      event.stopPropagation()
      const studentMod = {
        schoolId: event.target.schoolId.value || student.schoolId,
        name: event.target.name.value || student.name,
        email: event.target.email.value || student.email,
        image: student.image
      };
      console.log(studentMod)
      this.props.update(student.id, studentMod)
      event.target.schoolId.value = ''
      event.target.name.value = ''
      event.target.email.value = ''
    }
  render() {
    const { campuses } = this.props
    const student = this.state.student
    let showForm = false
    if (!student || !student.name) return <div /> // the student id is invalid or the data isnt loaded yet
    return (
      <div>
        <StudentItem student={student} key={student.id} />

        {this.renderEditForm() }
      </div>
        );
      }

}


/* -----------------    CONTAINER     ------------------ */

const mapState = ({ campuses, students }, ownProps) => {
  const student = students.find(StudentIter => StudentIter.id === +ownProps.match.params.id)
  const studentId = ownProps.storyId
  return { student, campuses, studentId }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    update: (id, studentMod) => {
      dispatch(updateStudent(id, studentMod));
    },
    fetchStudentData: () => {
      const studentId = ownProps.match.params.id
      dispatch(fetchStudent(studentId))
    }
}
}

export default connect(mapState, mapDispatch)(StudentDetail);
