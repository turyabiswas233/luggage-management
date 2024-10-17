import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist//quill.snow.css";
import Quill from "quill";

// Registering the 'script' format to include superscript and subscript
const Script = Quill.import("formats/script");
Quill.register(Script, true);

function TextFormatter({ setValue, placeholder }) {
  const handleChange = (newContent) => {
    setValue(newContent);
  };

  return (
    <div className="p-2 mb-10">
      <ReactQuill
      className="h-48"
        theme="snow"
        placeholder={placeholder}
        onChange={handleChange}
        modules={{
          toolbar: [
            ["bold", "italic", "underline", "blockquote"],
            [{ script: "super" }, { script: "sub" }],
            [{ list: "ordered" }, { list: "bullet" }],
          ],
        }}
      />
    </div>
  );
}

export default TextFormatter;
