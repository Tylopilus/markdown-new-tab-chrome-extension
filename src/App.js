import React from 'react';
import './App.scss';
import { MemoryRouter as Router } from 'react-router-dom';
import { TextComponent } from './components/TextComponent';
import { Menu } from './components/Menu.tsx';
import { Context } from './context';

function App() {
  return (
    <Router>
      <main>
        <Context.Provider>
          <Menu />
          <TextComponent />
        </Context.Provider>
      </main>
    </Router>
  );
}

export default App;
