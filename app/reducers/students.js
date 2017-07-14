import axios from 'axios'
import { REMOVE_CAMPUS } from './campuses'

/* -----------------    ACTIONS     ------------------ */

const INITIALIZE_STUDENTS = 'INITIALIZE_STUDENTS'
const CREATE_STUDENT = 'CREATE_STUDENT'
const REMOVE_STUDENT = 'REMOVE_STUDENT'
const UPDATE_STUDENT = 'UPDATE_STUDENT'


/* ------------   ACTION CREATORS     ------------------ */

const initializeStudents = students => ({ type: INITIALIZE_STUDENTS, students })
const create = student => ({ type: CREATE_STUDENT, student})
const remove = id => ({ type: REMOVE_STUDENT, id })
const update = student => ({ type: UPDATE_STUDENT, student })

/* ------------       REDUCERS     ------------------ */

export default function reducer(students = [], action){
  switch (action.type) {
    case INITIALIZE_STUDENTS:
        return action.students

    case CREATE_STUDENT:
      return [...students, action.student]

    case REMOVE_STUDENT:
      return students.filter(student => student.id !== action.id)

    case REMOVE_CAMPUS:
      return students.filter(student => student.school.id !== action.id)
      //this association was made in the sequalize models if you change those
      //make sure to come back here and change this

    case UPDATE_STUDENT:
      return students.map(student => student.id === action.student.id ? action.student : student)

    default:
      return students
  }
}


/* ------------   THUNK CREATORS     ------------------ */
export const fetchStudents = () => dispatch => {
  axios.get('/api/students')
  .then(res => dispatch(initializeStudents(res.data)))
  .catch(console.error)
}
export const fetchStudent = (id) => dispatch => {
  axios.get(`/api/students/${id}`)
    .then((res) => dispatch(update(res.data)))
    .catch(err => console.error(`Fetching student: ${id} unsuccesful`, err))
}

export const addStudent = student => dispatch => {
  axios.post('/api/students', student)
  .then(res => dispatch(create(res.data)))
  .catch(console.error)
}

export const updateStudent = (id, student) => dispatch => {
  axios.put(`/api/students/${id}`, student)
  .then(res => dispatch(update(student)))
  .catch(console.error)
}

export const removeStudent = id => dispatch => {
  // dispatch(remove(id));
  axios.delete(`/api/students/${id}`)
      .then(() => { dispatch(remove(id))})
      .catch(console.error)
}
