import React from 'react';
import './App.scss';
import { MemoryRouter as Router } from 'react-router-dom';
import { TextComponent } from './components/TextComponent';
import { Menu } from './components/Menu.tsx';

function App() {
  return (
    <Router>
      <main>
        <Menu />
        <TextComponent />
      </main>
    </Router>
  );
}

export default App;
