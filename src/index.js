import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

ReactDOM.render(
  <App
    maxConversionCount={5}
    converters={[
      {
        label: 'Bitcoin',
        shortLabel: 'BC',
        exchangeRate: 0.5,
      },
      {
        label: 'Etherium',
        shortLabel: 'ETH',
        exchangeRate: 1.2,
      },
    ]}
  />,
  document.getElementById('root'),
);
