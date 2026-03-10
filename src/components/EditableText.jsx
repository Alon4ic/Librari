import React from "react";

export default function EditableText({ value, onChange, style }) {
  return (
    <div
      contentEditable
      onClick={(e) => e.stopPropagation()}
      suppressContentEditableWarning
      onBlur={(e) => onChange(e.target.innerText)}
      spellCheck={false}
      style={{
        cursor: "text",
        ...style,
      }}
    >
      {value}
    </div>
  );
}
