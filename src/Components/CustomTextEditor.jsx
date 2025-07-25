import React, { useRef } from "react";

export default function CustomTextEditor({ value, onChange, placeholder }) {
  const editorRef = useRef(null);

  const handleInput = () => {
    if (onChange) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const format = (command) => {
    document.execCommand(command, false, null);
    handleInput();
  };

  return (
    <div>
      <div className="flex space-x-2 mb-2">
        <button type="button" onClick={() => format("bold")}
          className="px-2 py-1 rounded bg-gray-700 text-white hover:bg-gray-600" title="Bold">
          <b>B</b>
        </button>
        <button type="button" onClick={() => format("italic")}
          className="px-2 py-1 rounded bg-gray-700 text-white hover:bg-gray-600" title="Italic">
          <i>I</i>
        </button>
        <button type="button" onClick={() => format("underline")}
          className="px-2 py-1 rounded bg-gray-700 text-white hover:bg-gray-600" title="Underline">
          <u>U</u>
        </button>
        <button type="button" onClick={() => format("insertUnorderedList")}
          className="px-2 py-1 rounded bg-gray-700 text-white hover:bg-gray-600" title="Bullet List">
          • List
        </button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        className="w-full min-h-[100px] px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none"
        style={{ background: "#23272f", color: "#fff" }}
        onInput={handleInput}
        onBlur={handleInput}
        data-placeholder={placeholder}
        dangerouslySetInnerHTML={{ __html: value || "" }}
      />
      <style jsx>{`
        [contenteditable][data-placeholder]:empty:before {
          content: attr(data-placeholder);
          color: #888;
        }
      `}</style>
    </div>
  );
} 