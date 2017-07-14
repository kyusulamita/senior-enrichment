import React from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';


const Navbar = () =>  (
    <nav className="navbar navbar-default">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
          data-target=".navbar-collapse">
            <span className="icon-bar" />
            <span className="icon-bar" />
            <span className="icon-bar" />
          </button>
          <Link className="navbar-brand" to="/"><span className="glyphicon glyphicon-eye-open" /></Link>
        </div>
        <div className="collapse navbar-collapse">
          <ul className="nav navbar-nav">
            <li>
              <NavLink to="/students" activeClassName="active">students</NavLink>
            </li>
            <li>
              <NavLink to="/campuses" activeClassName="active">campuses</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
)

export default withRouter(Navbar)
