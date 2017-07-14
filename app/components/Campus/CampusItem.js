import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { removeCampus } from '../../reducers/campuses';
import { removeStudent } from '../../reducers/students';

/* -----------------    COMPONENT     ------------------ */

class CampusItem extends Component {

  constructor (props) {
    super(props);
    this.removeCallback = this.removeCallback.bind(this);
  }

  render () {
    const { campus } = this.props;
    return (
      <div className="list-group-item min-content">
        <div className="media">
          {/* <div className="media-left media-middle icon-container">
            <img className="media-object img-circle" src={user.photo} />
          </div> */}
          <NavLink
            className="media-body"
            activeClassName="active"
            to={`/campuses/${campus.id}`}>
            <h4 className="media-heading">
              <span placeholder="Hard Knocks">{campus.name}</span>
            </h4>
            <h5>
              <span>{campus.location}</span>
            </h5>
          </NavLink>
          <div className="media-right media-middle">
            <button
              className="btn btn-default"
              onClick={this.removeCallback}>
              <span className="glyphicon glyphicon-remove" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  removeCallback (event) {
    const { remove, campus } = this.props;
    event.stopPropagation();
    remove(campus.id);
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = (state) => ({
  stories: state.stories
})

const mapDispatch = (dispatch) => ({
  remove: (campusId) => {
    dispatch(removeCampus(campusId))
  }
})

export default connect(mapState, mapDispatch)(CampusItem);
