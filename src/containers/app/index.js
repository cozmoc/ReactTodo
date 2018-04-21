import React from 'react';
import { Route, Link } from 'react-router-dom';
import Home from '../home';
import About from '../about';
import store, { history } from '../../store';
import './App.css';

const App = () => (
  <div>
    <div className="navbar navbar-custom" role="navigation">
      <div className="container-fluid">
        <div className="navbar-header">
          <a className="navbar-brand">TODO App</a>
        </div>
        <div className="navbar-collapse collapse">
          <ul className="nav navbar-nav">
            <li className={history.location.pathname == '/' ? "active" : ''}><Link to="/">Home</Link></li>
            <li className={history.location.pathname == '/about' ? "active" : ''}><Link to="/about">About</Link></li>
          </ul>
        </div>
      </div>
    </div>
    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
    </main>
  </div>
);

export default App;