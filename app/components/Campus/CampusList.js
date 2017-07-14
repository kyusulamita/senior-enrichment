import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


import { addCampus} from '../../reducers/campuses';
import CampusItem from './CampusItem';

/* -----------------    COMPONENT     ------------------ */

class CampusList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      image: '',
      location: ''
    };

    this.newCampusForm = this.newCampusForm.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  render() {
    return (
      <div className="container">
        <div>
          { this.newCampusForm() }
        </div>
        <br />
        <br />
        <div>
          {
            this.props.campuses.map(campus => <CampusItem campus={campus} key={campus.id} />)
          }
        </div>
      </div>
    );
  }


  newCampusForm() {
    return (
      <div className="list-group-item min-content user-item">
        <form className="media" onSubmit={this.onSubmit}>
          <div className="media-left media-middle icon-container">
            <button
              type="submit"
              className="glyphicon glyphicon-plus clickable"
            />
          </div>
          <div className="media-body">
            <h4 className="media-heading">
              <input
                name="name"
                type="text"
                required
                placeholder="Campus Name"
              />
            </h4>
            <h5>
              <input
                name="location"
                type="text"
                required
                placeholder="Campus Location"
              />
            </h5>
          </div>
        </form>
      </div>
    );
  }

  onSubmit(event) {
    event.preventDefault();
    const newCampus = {
      name: event.target.name.value,
      location: event.target.location.value,
      image: dummy
    }
    this.props.add(newCampus)
    event.target.name.value = ''
    event.target.location.value = ''
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = (state) => ({
  campuses: state.campuses,
})

const mapDispatch = (dispatch) => ({
  add: (campusToAdd) => {
    dispatch(addCampus(campusToAdd))
  }
})

export default connect(mapState, mapDispatch)(CampusList);
