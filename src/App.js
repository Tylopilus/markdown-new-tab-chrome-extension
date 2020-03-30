import React, { useState } from 'react';
import './App.scss';
import { MemoryRouter as Router, Route } from 'react-router-dom';
import { UserContext, User as UserObject } from './contexts/UserContext';
import { TextComponent } from './components/TextComponent';

function App() {
  const [user, setUser] = useState(UserObject);
  const UserState = { user, setUser };
  const [login, setLogin] = useState(false);
  const Login = { login, setLogin };
  return (
    <Router>
      <div>
        <UserContext.Provider value={{ UserState, Login }}>
          <Route path='/' exact component={TextComponent} />
        </UserContext.Provider>
      </div>
    </Router>
  );
}

export default App;
