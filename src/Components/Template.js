import React, { useRef } from 'react';
import EmailEditor, { EditorRef, EmailEditorProps } from 'react-email-editor';

const Template = () => {

    const emailEditorRef = useRef(null);
    const exportHtml = () => {
        const unlayer = emailEditorRef.current?.editor;
    
        unlayer?.exportHtml((data) => {
          console.log('exportHtml', data);
        });
      };


  return (
    <div className='mt-36'>
         <div>
        <button onClick={exportHtml}>Export HTML</button>
      </div>

         <EmailEditor ref={emailEditorRef} />
        </div>
  )
}

export default Template