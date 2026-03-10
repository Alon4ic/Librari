import React from "react";

function Banner({
  material,
  initialText = material.text,
  editable = true,
  onCopy,
  copiedId,
  type,
}) {
  const textRef = React.useRef(null);

  React.useEffect(() => {
    if (textRef.current && !textRef.current.textContent) {
      textRef.current.textContent = initialText;
    }
  }, [initialText]);

  function handleCopy() {
    const currentText = textRef.current?.textContent || initialText;

    if (onCopy) {
      onCopy(currentText);
    }
  }

  return (
    <div
      style={{
        padding: "16px",
        display: "flex",
        alignItems: "flex-start",
        width: "100%",
        backgroundColor: material.background,
        borderRadius: "6px",
        fontFamily: "Inter, sans-serif",
        gap: "12px",
        cursor: "pointer",
        transition: "box-shadow 0.2s",
        position: "relative",
        boxShadow:
          copiedId === `${type}-${material.id}` ? "0 0 0 2px #10b981" : "none",
      }}
      onClick={handleCopy}
    >
      {copiedId === `${type}-${material.id}` && (
        <div
          style={{
            position: "absolute",
            top: -10,
            left: "50%",
            transform: "translateX(-50%)",
            background: "#10b981",
            color: "white",
            padding: "2px 8px",
            borderRadius: "4px",
            fontSize: "12px",
            whiteSpace: "nowrap",
          }}
        >
          Copied!
        </div>
      )}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexShrink: 0,
        }}
        dangerouslySetInnerHTML={{ __html: material.icon }}
      />
      <div style={{ flex: 1 }}>
        <h5
          style={{
            margin: "0 0 8px 0",
            color: material.colorTitle,
            fontSize: "16px",
            fontWeight: "600",
          }}
        >
          {material.title}
        </h5>
        {editable && (
          <div
            ref={textRef}
            style={{
              color: material.colorText,
              fontSize: "14px",
              lineHeight: "1.5",
              outline: "none",
              padding: "4px 0",
              minHeight: "20px",
            }}
            contentEditable
            suppressContentEditableWarning
            onClick={(e) => e.stopPropagation()}
          >
            {initialText}
          </div>
        )}
      </div>
    </div>
  );
}

export default React.memo(Banner);
