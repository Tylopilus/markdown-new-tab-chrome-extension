import React, { useState, useEffect } from 'react';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import './TextComponent.scss';

export const TextComponent = (props) => {
  const [context, setcontext] = useState('');

  useEffect(() => {
    localStorage.setItem(
      'sheets',
      JSON.stringify([{ headline: context.split('\n')[0], content: context }])
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context]);

  return (
    <div className='centered'>
      <SimpleMDE
        className='textComponent'
        options={{
          autofocus: true,
          spellChecker: false,
          toolbar: false,
          placeholder: 'Hello, write here',
          autosave: {
            enabled: true,
            uniqueId: 'mdeID',
            delay: 1000,
            submit_delay: 5000,
            timeFormat: {
              locale: 'en-US',
              format: {
                year: 'numeric',
                month: 'long',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
              },
            },
            text: 'Autosaved: ',
          },
          status: false,
          // etc.
        }}
        value={context}
        onChange={setcontext}
      />
    </div>
  );
};
