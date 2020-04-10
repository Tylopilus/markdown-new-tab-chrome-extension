import React, { useState, useEffect, useContext } from 'react';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import './TextComponent.scss';
import { Context } from '../context';

export const TextComponent = (props) => {
  const [context, setContext] = useState(/* props.content */);

  const { getID, obj, setObj } = useContext(Context);

  useEffect(() => {
    // const obj = JSON.parse(localStorage.getItem('sheets'));
    setContext(obj[getID].content);

    document.getElementById('myEditableDiv').innerHTML = obj[getID].content;
  }, [getID]);

  useEffect(() => {
    obj[getID].content = context;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context]);
  const changeHandler = () => {
    // console.log(document.getElementById('myEditableDiv').innerHTML);
    const header = document
      .getElementById('myEditableDiv')
      .innerHTML.replace(/<div>#\s/, '<h1>')
      .replace(/(<h1>.*?)(<\/div>)/, (a, b, c) => {
        return b + '</h1>';
      });

    // var html = document
    //   .getElementById('myEditableDiv')
    //   .innerHTML.replace(/<div>/gi, '<br>')
    //   .replace(/<\/div>/gi, '');
    setContext(header);

    // document.getElementById('myEditableDiv').innerHTML = header;
    // console.log(text.match(/<div>(.*?)<\/div>/g));
    // setContext(text);
  };
  return (
    <div className='centered'>
      {/* <SimpleMDE
        className='textComponent'
        options={{
          autofocus: true,
          spellChecker: false,
          toolbar: false,
          placeholder: 'Hello, write here',
          // autosave: {
          //   enabled: false,
          //   uniqueId: 'mdeID',
          //   delay: 1000,
          //   submit_delay: 5000,
          //   timeFormat: {
          //     locale: 'en-US',
          //     format: {
          //       year: 'numeric',
          //       month: 'long',
          //       day: '2-digit',
          //       hour: '2-digit',
          //       minute: '2-digit',
          //     },
          // },
          // text: 'Autosaved: ',
          // },
          status: false,
          // etc.
        }}
        value={context}
        onChange={changeHandler}
      /> */}

      <div
        id='myEditableDiv'
        contentEditable='true'
        className='textComponent'
        role='textbox'
        onInput={changeHandler}
      ></div>
    </div>
  );
};
