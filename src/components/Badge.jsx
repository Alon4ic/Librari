import React from "react";

function Badge({ initialText = "Your text", style, editable = true, onCopy }) {
  const ref = React.useRef(null);
  const [text, setText] = React.useState(initialText);
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (ref.current && !ref.current.textContent) {
      ref.current.textContent = initialText;
    }
  }, [initialText]);

  function handleInput(e) {
    setText(e.currentTarget.textContent);
  }

  function handleClick(e) {
   e.stopPropagation();
   if (onCopy) {
    onCopy(text, style);
   } else {
    const exampleCode = `<Badge text="${text}" backgroundColor="${style?.backgroundColor}" color="${style?.color}" />`;
    navigator.clipboard.writeText(exampleCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000)
   }
  }

  return (
    <div
      ref={ref}
      style={{
        cursor: "pointer",
        userSelect: editable ? "text" : "none",
        ...style,
      }}     
      contentEditable={editable}
      suppressContentEditableWarning
      onInput={editable ? handleInput : undefined}
      onClick={handleClick}
    />
  );
}

export default React.memo(Badge);
