import React from "react";
import { statuses } from "../data";
import Badge from "./Badge"

export default function Badges() {
  const [copiedId, setCopiedId] = React.useState(null);
  const [copyMode, setCopyMode] = React.useState("component");

  const handleCopyBadge = (status, variant, text) => {
    let codeToCopy = "";

    if (copyMode === "component") {
      // Полный компонент
      codeToCopy = `import React from "react";

function Badge({ text = "${text}", backgroundColor = "${status.background}", color = "${status.color}", variant = "${variant}" }) {
  const style = {
    backgroundColor,
    color,
    padding: "2px 12px",
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Inter, sans-serif",
    fontSize: "14px",
    lineHeight: "20px",
    fontWeight: "500",
    borderRadius: variant === "pill" ? "12px" : "4px",
  };

  return <span style={style}>{text}</span>;
}

export default Badge;`;
    } else {
      // Только JSX (предполагается, что компонент уже импортирован)
      codeToCopy = `<Badge 
  text="${text}" 
  backgroundColor="${status.background}" 
  color="${status.color}" 
  variant="${variant}" 
/>`;
    }

    navigator.clipboard.writeText(codeToCopy);
    setCopiedId(`${status.id}-${variant}`);
    setTimeout(() => setCopiedId(null), 2000);
  };
  const renderBadges = (variant) => {
    return statuses.map((status) => (
      <div key={status.id} style={{ position: "relative", margin: "10px" }}>
        <Badge
          initialText="Your text"
          style={{
            backgroundColor: status.background,
            color: status.color,
            padding: "2px 12px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontFamily: "Inter",
            fontSize: "14px",
            lineHeight: "20px",
            fontWeight: "500",
            borderRadius: variant === "pill" ? "12px" : "4px"
          }}
          onCopy={(text) => handleCopyBadge(status, variant, text)}
        />
        {copiedId === `${status.id}-${variant}` && (
          <div style={{
            position: "absolute",
            top: -10,
            left: "50%",
            transform: "translateX(-50%)",
            background: "#10b981",
            color: "white",
            padding: "2px 8px",
            borderRadius: "4px",
            fontSize: "12px",
            whiteSpace: "nowrap"
          }}>
            Copied!
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="badge-block">
      <h2 className="bedge-title">Badges</h2>
      <div className="inner">
        <h3 className="square-title">Square</h3>
        <div className="square" style={{ display: "flex", gap: "0px", flexWrap: "wrap" }}>
          {renderBadges("square")}
        </div>
      </div>
      <div className="inner">
        <h3 className="pill-title">Pill</h3>
        <div className="pill" style={{ display: "flex", gap: "0px", flexWrap: "wrap" }}>
          {renderBadges("pill")}
        </div>
      </div>
    </div>
  );
}