import React from 'react';
import TopBar from './Components/TopBar'
import Projects from './Components/Projects'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import ProjectDetail from './Components/ProjectDetail'
import CreateProject from './Components/CreateProject'
import CreateTask from './Components/CreateTask'

function App() {
  return (
    <div className="App">
     <TopBar user={"Test User"} />
     <div className="col-md-8 mx-auto">
     <Router>
      <Route exact path="/" component={Projects} />
      <Route path="/project/:id" component={ProjectDetail} /> 
      <Route path="/createtask/:id" component={CreateTask} />
      <Route path="/createproject" component={CreateProject} />
      </Router>
      </div>
    </div>
  );
}

export default App;
