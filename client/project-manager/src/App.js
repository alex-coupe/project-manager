import React from 'react';
import TopBar from './Components/TopBar'
import Projects from './Components/Projects'

function App() {
  return (
    <div className="App">
     <TopBar user={"Test User"} />
     <div className="col-md-8 mx-auto">
      <Projects />
      </div>
    </div>
  );
}

export default App;
