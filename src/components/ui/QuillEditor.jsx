import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const QuillEditor = ({ value, onChange }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current) {
      console.log('Initializing Quill...');
      const quill = new Quill(editorRef.current, {
        theme: 'snow',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline'],
            [{ header: [1, 2, 3, false] }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
          ],
        },
      });
  
      quill.on('text-change', () => {
        const html = editorRef.current.firstChild.innerHTML;
        console.log('Content Changed:', html);
        onChange(html);
      });
  
      console.log('Quill initialized:', quill);
    } else {
      console.error('Editor ref is not available');
    }
  }, [onChange]);

  return <div ref={editorRef} style={{ height: '200px' }} className='rounded-br-2xl rounded-bl-2xl shadow-sm !border-secondary'/>;
};

export default QuillEditor;