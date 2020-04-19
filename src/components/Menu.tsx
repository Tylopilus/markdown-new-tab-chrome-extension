import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import './Menu.scss';
import { Context } from '../context';

export const Menu: React.FC = () => {
  const { obj } = useContext<any>(Context);

  return (
    <div className='side'>
      <MenuEntry title='Create new Page' initial={true} />
      {obj &&
        obj.map((o: any) => {
          return <MenuEntry key={'menu' + o.id} title={o.headline} id={o.id} />;
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
export const MenuEntry: React.FC<Props> = ({ title, initial, id }) => {
  const { setID, setObj, obj, getID } = useContext<any>(Context);

  const createNewPage = () => {
    const id = obj[obj.length - 1].id + 1;
    setObj([
      ...obj,
      {
        id,
        content: '',
        headline: 'Untitled',
      },
    ]);

    setID(id);
  };

  return (
    <div
      onClick={initial ? createNewPage : undefined}
      style={{ cursor: 'pointer' }}
    >
      <div className='flexContainer'>
        {getID === id ? <div className='activated' /> : null}
        <div className='headline' onClick={() => setID(id)}>
          {title}
        </div>
        {id !== undefined ? (
          <div
            className='icon'
            onClick={() => {
              const newObj = obj.filter((el: any) => el.id !== id);
              if (newObj.length > 0) {
                if (getID === id && id !== undefined) setID(id - 1);
                setObj(newObj);
              } else {
                setObj([
                  {
                    id: 0,
                    content: '',
                    headline: 'Untitled',
                  },
                ]);
                setID(0);
              }
            }}
          >
            <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
          </div>
        ) : null}
        {initial ? (
          <div className='icon'>
            <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
          </div>
        ) : null}
      </div>
    </div>
  );
};
