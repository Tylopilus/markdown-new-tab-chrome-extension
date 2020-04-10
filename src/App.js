import React, { useState, useEffect } from 'react';
import './App.scss';
import { MemoryRouter as Router } from 'react-router-dom';
import { TextComponent } from './components/TextComponent';
import { Menu } from './components/Menu.tsx';
import { Context } from './context';

function App() {
  const [obj, setObj] = useState(undefined);
  useEffect(() => {
    //setObj(JSON.parse(localStorage.getItem('sheets')));

    const obj2 = [
      {
        id: 0,
        headline: 'abc',
        content: 'this is content of page1',
      },
      {
        id: 1,
        headline: 'page2',
        content: 'this is content of page 2',
      },
    ];

    setObj(obj2);

    // localStorage.setItem('sheets', JSON.stringify(obj2));
  }, []);
  const [getID, setID] = useState(0);

  return (
    <Router>
      <main>
        <Context.Provider value={{ getID, setID, obj, setObj }}>
          <Menu />
          {obj && (
            <TextComponent content={obj[0].content ? obj[0].content : ''} />
          )}
        </Context.Provider>
      </main>
    </Router>
  );
}

export default App;
