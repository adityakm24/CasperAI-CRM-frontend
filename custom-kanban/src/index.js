import React from "react";
import ReactDOM from "react-dom";
import './styles.css'; // Tailwind CSS file import
import CustomKanban from './App';

ReactDOM.render(
  <React.StrictMode>
    <CustomKanban />
  </React.StrictMode>,
  document.getElementById('root')
);
