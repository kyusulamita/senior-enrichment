import axios from 'axios'

/* -----------------    ACTIONS     ------------------ */

const INITIALIZE_CAMPUSES = 'INITIALIZE_CAMPUSES'
const CREATE_CAMPUS     = 'CREATE_CAMPUS'
export const REMOVE_CAMPUS = 'REMOVE_CAMPUS'
const UPDATE_CAMPUS     = 'UPDATE_CAMPUS'


/* ------------   ACTION CREATORS     ------------------ */

const initializeCampuses  = campuses => ({ type: INITIALIZE_CAMPUSES, campuses })
const create = campus  => ({ type: CREATE_CAMPUS, campus })
const remove = id  => ({ type: REMOVE_CAMPUS, id })
const update = campus  => ({ type: UPDATE_CAMPUS, campus })


/* ------------       REDUCER     ------------------ */

export default function reducer (campuses = [], action) {
  switch (action.type) {
    case INITIALIZE_CAMPUSES:
      return action.campuses

    case CREATE_CAMPUS:
      return [action.campus, ...campuses]

    case REMOVE_CAMPUS:
      return campuses.filter(campus => campus.id !== action.id)

    case UPDATE_CAMPUS:
      return campuses.map(campus => (
        action.campus.id === campus.id ? action.campus : campus
      ))

    default:
      return campuses
  }
}


/* ------------   THUNK CREATORS     ------------------ */

export const fetchCampuses = () => dispatch => {
  axios.get('/api/campuses')
       .then(res => dispatch(initializeCampuses(res.data)))
       .catch(console.error)
}

export const fetchCampus = (id) => dispatch => {
  axios.get(`/api/campuses/${id}`)
    .then((res) => dispatch(update(res.data)))
    .catch(err => console.error(`Fetching campus: ${id} unsuccesful`, err))
}
// optimistic WHY YOU DO THAT THOUGH
export const removeCampus = id => dispatch => {
  // dispatch(remove(id));
  axios.delete(`/api/campuses/${id}`)
      .then(() =>  dispatch(remove(id)))
      .catch(err => console.error(`Removing campus: ${id} unsuccesful`, err))
}

export const addCampus = campus => dispatch => {
  axios.post('/api/users', campus)
       .then(res => dispatch(create(res.data)))
       .catch(err => console.error(`Creating campus: ${campus} unsuccesful`, err))
}

export const updateCampus = (id, campus) => dispatch => {
  axios.put(`/api/users/${id}`, campus)
       .then(res => dispatch(update(res.data)))
       .catch(err => console.error(`Updating campus: ${id} unsuccesful`, err))
}
