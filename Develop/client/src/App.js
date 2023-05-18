import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';

//importing the apollo provider
import { ApolloProvider } from '@apollo/client';
//importing the apollo client
import ApolloClient from 'apollo-boost';

//creating the apollo client
const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem('id_token');

    //setting the token to the header
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    });
  },
  //setting the uri to the graphql server
  uri: '/graphql',
});

function App() {
  return (
    //wrapping the app in the apollo provider
    <ApolloProvider client={client}>
    <Router>
      <>
        <Navbar />
        <Switch>
          <Route exact path='/' component={SearchBooks} />
          <Route exact path='/saved' component={SavedBooks} />
          <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
        </Switch>
      </>
    </Router>
    </ApolloProvider>
  );
}

export default App;
