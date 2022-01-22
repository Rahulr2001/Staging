import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Amplify from 'aws-amplify'


const myAppConfig = {
  'aws_appsync_graphqlEndpoint': 'https://77wuqb5uynhrjdhpl6phbjozzm.appsync-api.us-east-2.amazonaws.com/graphql',
  'aws_appsync_region': 'us-east-2',
  'aws_appsync_authenticationType': 'API_KEY',
  'aws_appsync_apiKey': 'da2-q7z4wiwbdfaylki5ws3cqibfha',
}

Amplify.configure(myAppConfig);



ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
