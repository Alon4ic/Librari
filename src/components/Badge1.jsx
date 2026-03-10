import React, { useState, useEffect } from "react";

export default function ToastWarning({
  title = "Warning",
  text = "A network error was detected",
  duration = 4000,
  onClose,
}) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  const handleClose = () => {
    setVisible(false);
    if (onClose) onClose();
  };

  if (!visible) return null;

  return (
    <div
      style={{
        display: "flex",
        gap: "16px",
        alignItems: "flex-start",
        width: "384px",
        padding: "16px",
        borderRadius: "8px",
        background: "#FFFBEB",
        boxShadow: "0 10px 15px -3px rgba(0,0,0,0.05)",
        fontFamily: "Inter, sans-serif",
        position: "relative",
      }}
    >
      <div
        style={{
          width: "24px",
          height: "24px",
          flexShrink: 0,
          dangerouslySetInnerHTML: {
            __html: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
<path d="M10 6V10M10 14H10.01M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z" stroke="#FBBF24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
          },
        }}
      />

      <div style={{ flex: 1 }}>
        <h4
          style={{
            margin: 0,
            fontSize: "14px",
            fontWeight: 500,
            lineHeight: "20px",
            color: "#92400E",
          }}
        >
          {title}
        </h4>
        <p
          style={{
            margin: "4px 0 0 0",
            fontSize: "14px",
            lineHeight: "20px",
            color: "#B45309",
          }}
        >
          {text}
        </p>
      </div>

      <button
        onClick={handleClose}
        style={{
          border: "none",
          background: "transparent",
          cursor: "pointer",
          fontSize: "20px",
          lineHeight: "20px",
          padding: "0 4px",
          color: "#6B7280",
          position: "absolute",
          top: "12px",
          right: "12px",
        }}
        aria-label="Close"
      >
        ×
      </button>
    </div>
  );
}
