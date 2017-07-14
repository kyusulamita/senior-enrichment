import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeStudent } from '../../reducers/students'



class StudentItem extends Component{
  render(){
    const { student, remove }  = this.props //from mapDispatch

    return (
      <li className="list-group-item">

        <ul className="list-inline">
          <li>
            <Link to={`/students/${student.id}`}>{student.name}</Link>
          </li>
          <li>
            <span>goes to school at:</span>
          </li>
          <li>
            <Link to={`/campuses/${student.schoolId}`}>{student.school.name}</Link>
          </li>
          <button
            className="btn btn-default btn-xs pull-right"
            onClick={ () => remove(student.id) }>
            <span className="glyphicon glyphicon-remove" />
          </button>
        </ul>
      </li>
    )
  }
}

const mapState = null;
const mapDispatch = (dispatch, ownProps) => ({
  remove: (id) => {
    dispatch(removeStudent(id))
  }
})

export default connect(mapState, mapDispatch)(StudentItem);
