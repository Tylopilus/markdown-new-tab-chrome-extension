import React from 'react';
import './Menu.scss';

export const Menu: React.FC = () => {
  return (
    <div className='side'>
      <MenuEntry title='+ Create new Page' initial={true}></MenuEntry>

      <MenuEntry title='Welt' onClick={() => console.log('Wello')}></MenuEntry>
    </div>
  );
};

interface Props {
  title: string;
  onClick?: () => void;
  initial?: boolean;
}
export const MenuEntry: React.FC<Props> = ({ title, onClick, initial }) => {
  const popLists = () => {
    const obj = [
      {
        headline: 'page1',
        content: 'Content of Page 1',
      },
      {
        headline: 'page2',
        content: 'Content of Page 2',
      },
    ];
    localStorage.clear();
    localStorage.setItem('sheets', JSON.stringify(obj));
    // "[{"headline":"sdasd","content":"sdasd\n# bvn\nasd\nasdjhgj\nuguygu\nasdasd\n\n# Hallo Welt\n\n"}]"
  };

  return (
    <div onClick={initial ? popLists : onClick} style={{ cursor: 'pointer' }}>
      <div style={{ padding: '.5em' }}>{title}</div>
      <div style={{ borderBottom: '1px solid black' }} />
    </div>
  );
};
