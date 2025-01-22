import React, { useContext, useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { AssetContext } from "@/auth/ContextApi";


const TinyMCEEditor = ({ value, onChange, error }) => {
  const {demoLoad} = useContext(AssetContext)
  const [theme, setTheme] = useState('light')
  useEffect(()=>{
    const currentTheme = localStorage.getItem('theme')
    setTheme(currentTheme)
  },[demoLoad])
  return (
    <div>
      <Editor
        apiKey={import.meta.env.VITE_EDITOR_KEY}
        value={value}
        onEditorChange={onChange}
        init={{
            height: 300,
            menubar: true,
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount',
            ],
            toolbar:
              'undo redo | formatselect | bold italic backcolor | \
              alignleft aligncenter alignright alignjustify | \
              bullist numlist outdent indent | removeformat | help',
            branding: false, 
          
        
        }}
      />
      {error && (
        <p className="text-xs md:text-sm" style={{ color: "red" }}>
          Description is required!
        </p>
      )}
    </div>
  );
};

export default TinyMCEEditor;
