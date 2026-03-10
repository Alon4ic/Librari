import React from "react";
import { TbInbox } from "react-icons/tb";
import { RiCloseFill } from "react-icons/ri";
import EditableText from "./EditableText";
import { dark } from "../data";

function TooltipDark({ cards, updateCard }) {
  const [copiedId, setCopiedId] = React.useState(null);

  function generateComponent(data, item) {
    return `
import React, { useState } from "react";
import { TbInbox } from "react-icons/tb";
import { RiCloseFill } from "react-icons/ri";

export default function Tooltip({ text, children }) {
  const [visible, setVisible] = useState(false);

  return (
    <div
      style={{
        position: "relative",
        display: "inline-block"
      }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}

      {visible && (
      <div
          style={{
            maxWidth: "384px",
            backgroundColor: "${item.background}",
            position: "relative",
            borderRadius: "8px",
            padding: "16px",
            boxShadow: "${item.shadow}"
          }}
        >
          <div
            style={{
              display: "flex",
            }}
          >
            <div
              style={{
                marginRight: "16px",
              }}
            >
              <TbInbox
                style={{
                  width: "24px",
                  height: "24px",
                  color: "${item.colorBox}",
                }}
              />
            </div>
            <div className="dark-title">
              <h4
                style={{
                  fontFamily: "Inter",
                  fontSize: "14px",
                  fontWeight: "500",
                  lineHeight: "20px",
                  color: "${item.colorTitle}",
                }}
              >
                ${data.title}
              </h4>
              <p
                style={{
                  fontFamily: "Inter",
                  fontSize: "14px",
                  fontWeight: "400",
                  lineHeight: "20px",
                  color: "${item.colorText}",
                }}
              >
                ${data.text}
              </p>
            </div>
            <div>
              <RiCloseFill
                style={{
                  color: "${item.colorClose}",
                  width: "24px",
                  height: "24px",
                }}
              />
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "-20px",
              left: "48px",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="15"
              viewBox="0 0 30 15"
              fill="none"
            >
              <path
                d="M14.7224 14.25L1.26899e-05 8.77599e-08L29.4449 2.66191e-06L14.7224 14.25Z"
                fill="${item.background}"
              />
            </svg>
          </div>
        </div>
            )}
    </div>
  );
}
`;
  }
  function copyComponent(e, card, item) {
    const editable = e.target.closest(".editable-text");

    if (editable) return;

    const componentCode = generateComponent(card, item);

    navigator.clipboard.writeText(componentCode);

    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 1500);
  }

  const handleChildClick = (e) => {
    e.stopPropagation();
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "59px",
      }}
    >
      {dark.map((item) => {
        const card = cards[item.id] || {
          title: `Archive notes`,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit oluptatum tenetur.",
        };
        return (
          <div
            key={item.id}
            style={{
              maxWidth: "384px",
              backgroundColor: `${item.background}`,
              position: "relative",
              borderRadius: "8px",
              padding: "16px",
              boxShadow: `${item.shadow}`,
            }}
            onClick={(e) => copyComponent(e, card, item)}
            onMouseEnter={(e) => {
              if (!e.target.closest(".editable-text")) {
                e.currentTarget.style.transform = "scale(1.02)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            {copiedId === item.id && (
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
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  marginRight: "16px",
                }}
              >
                <TbInbox
                  style={{
                    width: "24px",
                    height: "24px",
                    color: `${item.colorBox}`,
                  }}
                />
              </div>
              <div className="dark-title">
                <EditableText
                  style={{
                    fontFamily: "Inter",
                    fontSize: "14px",
                    fontWeight: "500",
                    lineHeight: "20px",
                    color: `${item.colorTitle}`,
                  }}
                  className="editable-text"
                  value={card.title}
                  onChange={(v) => updateCard(item.id, "title", v)}
                  onClick={handleChildClick}
                />

                <EditableText
                  style={{
                    fontFamily: "Inter",
                    fontSize: "14px",
                    fontWeight: "400",
                    lineHeight: "20px",
                    color: `${item.colorText}`,
                  }}
                  className="editable-text"
                  value={card.text}
                  onChange={(v) => updateCard(item.id, "text", v)}
                  onClick={handleChildClick}
                />
              </div>
              <div>
                <RiCloseFill
                  style={{
                    color: `${item.colorClose}`,
                    width: "24px",
                    height: "24px",
                  }}
                />
              </div>
            </div>
            <div
              style={{
                position: "absolute",
                bottom: "-20px",
                left: "48px",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="15"
                viewBox="0 0 30 15"
                fill="none"
              >
                <path
                  d="M14.7224 14.25L1.26899e-05 8.77599e-08L29.4449 2.66191e-06L14.7224 14.25Z"
                  fill={item.background}
                />
              </svg>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default React.memo(TooltipDark);
