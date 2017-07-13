import axios from 'axios';

/* -----------------    ACTIONS     ------------------ */

const INITIALIZE_CAMPUSES = 'INITIALIZE_CAMPUSES';
const CREATE_CAMPUS     = 'CREATE_CAMPUS';
export const REMOVE_CAMPUS = 'REMOVE_CAMPUS';
const UPDATE_CAMPUS     = 'UPDATE_CAMPUS';


/* ------------   ACTION CREATORS     ------------------ */

const initializeCampuses  = campuses => ({ type: INITIALIZE_CAMPUSES, campuses });
const createCampus = campus  => ({ type: CREATE_CAMPUS, campus });
const removeCampus = id  => ({ type: REMOVE_CAMPUS, id });
const updateCampus = campus  => ({ type: UPDATE_CAMPUS, campus });


/* ------------       REDUCER     ------------------ */

export default function reducer (campuses = [], action) {
  switch (action.type) {
    case INITIALIZE_CAMPUSES:
      return action.campuses;

    case CREATE_CAMPUS:
      return [action.campus, ...campuses];

    case REMOVE_CAMPUS:
      return campuses.filter(campus => campus.id !== action.id);
    case UPDATE:
      return campuses.map(campus => (
        action.campus.id === campus.id ? action.campus : campus
      ));
    default:
      return campuses;
  }
}


/* ------------   THUNK CREATORS     ------------------ */

export const fetchCampuses = () => dispatch => {
  axios.get('/api/campuses')
       .then(res => dispatch(initializeCampuses(res.data)));
};

// optimistic WHY YOU DO THAT THOUGH
export const removeUser = id => dispatch => {
  // dispatch(remove(id));
  axios.delete(`/api/campuses/${id}`)
      .then(() => { dispatch(removeCampus(id))})
       .catch(err => console.error(`Removing campus: ${id} unsuccesful`, err));
};

export const addCampus = campus => dispatch => {
  axios.post('/api/users', campus)
       .then(res => dispatch(createCampus(res.data)))
       .catch(err => console.error(`Creating campus: ${user} unsuccesful`, err));
};

export const updateCampus = (id, campus) => dispatch => {
  axios.put(`/api/users/${id}`, campus)
       .then(res => dispatch(updateCampus(res.data)))
       .catch(err => console.error(`Updating campus: ${user} unsuccesful`, err));
};
