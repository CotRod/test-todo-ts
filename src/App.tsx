import React from 'react';
import classes from './app.module.scss';

const {app, container, title} = classes;

function App() {
  return (
    <div className={app}>
      <div className={container}>
      <h1 className={title}>Simple todo list</h1>
      </div>
    </div>
  );
}

export default App;
