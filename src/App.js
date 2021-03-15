
import React from 'react';

import './App.css';

import CreateToDoList from './components/CreateToDoList/CreateToDoList';
import ShowAllToDoList from './components/ShowAllToDoList/ShowAllToDoList';

function App() {
  return (
    <div className="App-container">
        <CreateToDoList />
        <ShowAllToDoList />
    </div>
  );
}

export default App;
