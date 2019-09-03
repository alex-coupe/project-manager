import React from 'react';
import TopBar from './Components/TopBar'
import Tasks from './Components/Tasks'

function App() {
  return (
    <div className="App">
     <TopBar user={"Test User"} />
     <div className="col-md-8 mx-auto">
      <Tasks />
      </div>
    </div>
  );
}

export default App;
