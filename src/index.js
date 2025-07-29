import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { presitor, store } from './app/Redux/store';
import { ApolloProvider } from '@apollo/client';
import { client } from './app/Components/root/Root';
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
<Provider store={store}>
    
       <PersistGate persistor={presitor}>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
       
       </PersistGate>
  
</Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
