import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Content from './pages/Content';
//import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import NewProject from './pages/newProject';

import './App.css';

function App() {
  return (
    <>
      <Router basename={process.env.PUBLIC_URL+'/'}>
        <div className="App">
          <Switch>
            <Route exact path='/' component={Content}/>
            <Route path='/dir/secret/login' component={Login} />
            {/**<Route path="/dir/secret/register" component={Register} />**/}  
            <Route exact path="/dir/secret/dashboard" component={Dashboard} />
            <Route exact path="/dir/secret/dashboard/settings" component={Settings} />    
            <Route exact path="/dir/secret/dashboard/new" component={NewProject} />   
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
