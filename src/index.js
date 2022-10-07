import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
// import { PersistGate } from 'redux-persist/integration/react';
// import { Provider } from 'react-redux';
// import { store, persistor } from 'redux/store';
import App from 'components/App';
import  GlobalStyles  from 'utils/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import { theme } from 'utils/theme';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
<React.StrictMode>
<ThemeProvider theme={theme}>
  {/*<Provider store={store}>*/}
  {/*  <PersistGate persistor={persistor}>*/}
      <BrowserRouter basename="health-care-project">
        <App />
      </BrowserRouter>
  {/*  </PersistGate>*/}
  {/*</Provider>*/}
</ThemeProvider>
<GlobalStyles />
</React.StrictMode>
);