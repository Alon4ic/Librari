import React from "react";

function Card({ record, hover, id, onCopy }) {
  const titleRef = React.useRef(null);
  const textRef = React.useRef(null);

  function handleClick() {
    const title = titleRef.current.textContent;
    const text = textRef.current.textContent;

    onCopy(record, hover, title, text, id);
  }

  return (
    <div
      style={{
        position: "relative",
        width: "336px",
        padding: "0px 24px 32px 24px",
        backgroundColor: "#F9FAFB",
        borderRadius: "8px",
        textAlign: "center",
        border: "1px solid #e5e7eb",
        boxShadow: hover ? "0px 4px 25px 0px rgba(0,0,0,0.1)" : "none",
      }}
      onClick={handleClick}
    >
      <div
        style={{
          position: "absolute",
          left: "138px",
          width: "48px",
          height: "48px",
          top: "-24px",
        }}
      >
        <div
          dangerouslySetInnerHTML={{
            __html: record.icon,
          }}
        />
      </div>
      <h3
        ref={titleRef}
        contentEditable
        suppressContentEditableWarning
        onClick={(e) => e.stopPropagation()}
        style={{
          fontFamily: "Inter",
          fontWeight: "500",
          fontSize: "18px",
          lineHeight: "28px",
          color: "#111827",
          marginTop: "56px",
          marginBottom: "20px",
        }}
      >
        {record.title}
      </h3>

      <p
        ref={textRef}
        contentEditable
        suppressContentEditableWarning
        onClick={(e) => e.stopPropagation()}
        style={{
          fontFamily: "Inter",
          fontSize: "16px",
          lineHeight: "24px",
          fontWeight: "400",
          color: "#6B7280",
        }}
      >
        {record.text}
      </p>
    </div>
  );
}
export default React.memo(Card)