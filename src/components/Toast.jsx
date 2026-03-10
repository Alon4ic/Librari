import React from "react";
import { styles } from "../data";
import EditableText from "./EditableText";

export default function Toast({ cards, updateCard }) {
  const [copied, setCopied] = React.useState(null);
  //   function generateComponent(item) {
  //     return `import React, { useState, useEffect } from "react";

  // export default function Toast({
  //   title = "${item.title}",
  //   text = "${item.text}",
  //   duration = 4000,
  //   onClose
  // }) {

  //   const [visible, setVisible] = useState(true);

  //   useEffect(() => {
  //     const timer = setTimeout(() => {
  //       handleClose();
  //     }, duration);

  //     return () => clearTimeout(timer);
  //   }, []);

  //   const handleClose = () => {
  //     setVisible(false);
  //     if (onClose) onClose();
  //   };

  //   if (!visible) return null;

  //   return (
  //     <div style={{
  //       display: "flex",
  //       gap: "16px",
  //       alignItems: "flex-start",
  //       width: "384px",
  //       padding: "16px",
  //       borderRadius: "8px",
  //       background: "${item.background}",
  //       boxShadow: "0 10px 15px -3px rgba(0,0,0,0.05)",
  //       fontFamily: "Inter, sans-serif",
  //       position: "relative"
  //     }}>

  //       <div style={{
  //         width: "24px",
  //         height: "24px",
  //         flexShrink: 0
  //       }}>
  //         ${item.icon}
  //       </div>

  //       <div style={{flex:1}}>
  //         <h4 style={{
  //           margin: 0,
  //           fontSize: "14px",
  //           fontWeight: 500,
  //           lineHeight: "20px",
  //           color: "${item.colorTitle}"
  //         }}>
  //           {title}
  //         </h4>

  //         <p style={{
  //           margin: "4px 0 0 0",
  //           fontSize: "14px",
  //           lineHeight: "20px",
  //           color: "${item.colorText}"
  //         }}>
  //           {text}
  //         </p>
  //       </div>

  //       <button
  //         onClick={handleClose}
  //         style={{
  //           border: "none",
  //           background: "transparent",
  //           cursor: "pointer",
  //           fontSize: "16px",
  //           lineHeight: "16px",
  //           padding: 0
  //         }}
  //       >
  //         ×
  //       </button>

  //     </div>
  //   );
  // }
  // `;
  //   }

  function generateComponent(key, item) {
    // Используем актуальные значения из cards или из item
    const currentText = cards[key]?.text || item.text;
    const currentTitle = item.title; // Заголовок пока не редактируется

    return `import React, { useState, useEffect } from "react";

export default function Toast${key.charAt(0).toUpperCase() + key.slice(1)}({
  title = "${currentTitle}",
  text = "${currentText}",
  duration = 4000,
  onClose
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
    <div style={{
      display: "flex",
      gap: "16px",
      alignItems: "flex-start",
      width: "384px",
      padding: "16px",
      borderRadius: "8px",
      background: "${item.background}",
      boxShadow: "0 10px 15px -3px rgba(0,0,0,0.05)",
      fontFamily: "Inter, sans-serif",
      position: "relative"
    }}>
      <div style={{
        width: "24px",
        height: "24px",
        flexShrink: 0,
        dangerouslySetInnerHTML: { __html: \`${item.icon.replace(/`/g, "\\`")}\` }
      }} />

      <div style={{ flex: 1 }}>
        <h4 style={{
          margin: 0,
          fontSize: "14px",
          fontWeight: 500,
          lineHeight: "20px",
          color: "${item.colorTitle}"
        }}>
          {title}
        </h4>
        <p style={{
          margin: "4px 0 0 0",
          fontSize: "14px",
          lineHeight: "20px",
          color: "${item.colorText}"
        }}>
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
          right: "12px"
        }}
        aria-label="Close"
      >
        ×
      </button>
    </div>
  );
}`;
  }

  function copyComponent(e, key, item) {
    e.preventDefault();
    e.stopPropagation();

    // Проверяем, не кликнули ли на редактируемый текст
    const editable = e.target.closest(".editable-text");
    if (editable) {
      return;
    }

    const componentCode = generateComponent(key, item);

    navigator.clipboard
      .writeText(componentCode)
      .then(() => {
        setCopied(key);
        setTimeout(() => setCopied(null), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        alert("Не удалось скопировать текст");
      });
  }
  const handleChildClick = (e) => {
    e.stopPropagation();
  };
  return (
    <div className="toast-inner">
      {Object.entries(styles).map(([key, item]) => {
        const currentText = cards[key]?.text || item.text;
        return (
          <div
            key={key}
            style={{
              display: "flex",
              justifyContent: "start",
              gap: "22px",
              backgroundColor: item.background,
              maxWidth: "100%",
              width: "384px",
              padding: "16px",
              boxShadow: "0 10px 15px -3px rgba(0,0,0,0.05)",
              borderRadius: "8px",
            }}
            onClick={(e) => copyComponent(e, key, item)}
            onMouseEnter={(e) => {
              if (!e.target.closest(".editable-text")) {
                e.currentTarget.style.transform = "scale(1.02)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            {copied === key && (
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
                width: "24px",
                height: "24px",
                flexShrink: 0,
              }}
              dangerouslySetInnerHTML={{ __html: item.icon }}
            />
            <div
              style={{
                maxWidth: "316px",
                width: "100%",
              }}
            >
              <h4
                style={{
                  fontFamily: "Inter",
                  fontSize: "14px",
                  fontWeight: "500",
                  lineHeight: "20px",
                  color: item.colorTitle,
                }}
              >
                {item.title}
              </h4>
              <EditableText
                style={{
                  fontFamily: "Inter",
                  fontSize: "14px",
                  fontWeight: "400",
                  lineHeight: "20px",
                  color: item.colorText,
                }}
                className="editable-text"
                value={currentText}
                onChange={(v) => updateCard(key, "text", v)}
                onClick={handleChildClick}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
