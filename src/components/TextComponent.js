import React, { useState, useEffect, useContext } from 'react';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import './TextComponent.scss';
import { Context } from '../context';

export const TextComponent = (props) => {
  const [context, setContext] = useState(props.content);

  const { getID, setObj } = useContext(Context);

  useEffect(() => {
    setObj(
      props.obj.map((item) => {
        const headline = context.split('\n')[0]
          ? context.split('\n')[0].replace(/#+\s/, '')
          : 'Untitled';
        return item.id === getID
          ? { ...item, content: context, headline }
          : item;
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context]);

  useEffect(() => {
    props.obj.forEach((el) => {
      if (el.id === getID) setContext(el.content);
    });
    // setContext(props.obj[getID].content);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getID]);

  const changeHandler = (e) => {
    setContext(e);
  };
  return (
    <div className='centered'>
      <SimpleMDE
        // changing key forces a re-render of the component. Changing value does not trigger a re-render!
        key={getID}
        className='textComponent'
        options={{
          autofocus: true,
          spellChecker: false,
          toolbar: false,
          placeholder: 'Hello, write here',
          status: false,
          // etc.
        }}
        value={context}
        onChange={changeHandler}
      />
    </div>
  );
};
