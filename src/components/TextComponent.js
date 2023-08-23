import React, { useState, useEffect, useContext } from 'react';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import './TextComponent.scss';
import { Context, useActiveId } from '../context';
import { useEntry, addEntry } from '../store';

export const TextComponent = (props) => {
  const [id] = useActiveId();
  const entry = useEntry();

  console.log({entry});
  const changeHandler = (e) => {
    const headline = e.split('\n')[0].replace('# ', '');

    addEntry({ id, content: e, headline });
  };

  return (
    <div className="centered">
      <SimpleMDE
        // changing key forces a re-render of the component. Changing value does not trigger a re-render!
        key={id}
        className="textComponent"
        options={{
          autofocus: true,
          spellChecker: false,
          toolbar: false,
          placeholder: 'Hello, write here',
          status: false,
          // etc.
        }}
        value={entry?.content ?? ''}
        onChange={changeHandler}
      />
    </div>
  );
};
