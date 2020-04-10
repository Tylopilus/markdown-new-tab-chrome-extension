import React, { useContext, useEffect, useState } from 'react';
import './Menu.scss';
import { Context } from '../context';

export const Menu: React.FC = () => {
  const { setID, obj } = useContext<any>(Context);
  //const [object, setObject] = useState<any[]>();
  // useEffect(() => {
  //   const obj = [
  //     {
  //       id: 0,
  //       headline: 'page1',
  //       content: 'Content of Page 1',
  //     },
  //     {
  //       id: 1,
  //       headline: 'page2',
  //       content: 'Content of Page 2\n',
  //     },
  //   ];
  //   localStorage.clear();
  //   localStorage.setItem('sheets', JSON.stringify(obj));
  // }, []);

  // useEffect(() => {
  //   const objStr = localStorage.getItem('sheets');
  //   let obj2: any[] = [];
  //   if (objStr) obj2 = JSON.parse(objStr);
  //   setObject(obj2);
  // }, []);

  return (
    <div className='side'>
      <MenuEntry title='+ Create new Page' initial={true}></MenuEntry>
      {/* <MenuEntry title='Welt' onClick={() => console.log(object)}></MenuEntry> */}
      {obj &&
        obj.map((o: any) => {
          return (
            <MenuEntry
              key={o.id}
              title={o.headline}
              onClick={() => {
                setID(o.id);
              }}
              id={o.id}
            />
          );
        })}
    </div>
  );
};

interface Props {
  title: string;
  onClick?: () => void;
  initial?: boolean;
  id?: number;
}
export const MenuEntry: React.FC<Props> = ({ title, onClick, initial, id }) => {
  const { setValue } = useContext<any>(Context);
  const popLists = () => {
    const objStr = localStorage.getItem('sheets');
    let obj = [];
    if (objStr) obj = JSON.parse(objStr);
    setValue(obj[1].content);
  };

  return (
    <div onClick={initial ? popLists : onClick} style={{ cursor: 'pointer' }}>
      <div style={{ padding: '.5em' }}>{title}</div>
      <div style={{ borderBottom: '1px solid black' }} />
    </div>
  );
};
