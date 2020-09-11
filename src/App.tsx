import React from 'react';
// import { BrowserRouter } from 'react-router-dom';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

import GlobalStyle from './styles/global';
// import Routes from './routes';
import ToastContainer from './components/ToastContainer';

import AppProvider from './hooks';

//  O AuthContext.Provider  coloco em volta das variaveis que quero q tenham acesso
//  Ao meu contexto de aplicação.
//  No value passo o valor do contexto

const App: React.FC = () => (
  <>
    <AppProvider>
      <SignIn />
    </AppProvider>

    <GlobalStyle />
  </>
);

export default App;
