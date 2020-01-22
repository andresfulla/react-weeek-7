import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

ReactDOM.render(
  <App maxConversionCount={5} />,
  document.getElementById('root'),
);
