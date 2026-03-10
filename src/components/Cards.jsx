import React from "react";
import { records } from "../data";
import Card from "./Card.jsx";

export default function Cards() {
  const [copiedId, setCopiedId] = React.useState(null);
  const [copyMode, setCopyMode] = React.useState("component");

  const handleCopyCard = (record, hover, title, text, id) => {
    let codeToCopy = "";

    if (copyMode === "component") {
      codeToCopy = `import React from "react";

function Card() {
  return (
    <div style={{
        position: "relative",
        width: "336px",
        padding: "0px 24px 32px 24px",
        backgroundColor: "#F9FAFB",
        borderRadius: "8px",
        textAlign: "center",
        border: "1px solid #e5e7eb",
        boxShadow: ${hover ? '"0px 4px 25px 0px rgba(0,0,0,0.1)"' : '"none"'},
      }}>
    <div
    style={{
          position: "absolute",
          left: "138px",
          width: "48px",
          height: "48px",
          top: "-24px",
        }}>
      ${record.icon}
      </div>
      <h3 style={{
          fontFamily: "Inter",
          fontWeight: "500",
          fontSize: "18px",
          lineHeight: "28px",
          color: "#111827",
          marginTop: "56px",
          marginBottom: "20px",
        }}>${title}</h3>
      <p style={{
          fontFamily: "Inter",
          fontSize: "16px",
          lineHeight: "24px",
          fontWeight: "400",
          color: "#6B7280",
        }}>${text}</p>
    </div>
  );
}

export default Card;`;
    } else {
      codeToCopy = `<Card
  title="${title}"
  text="${text}"
  hover={${hover}}
/>`;
    }

    navigator.clipboard.writeText(codeToCopy);

    setCopiedId(id);

    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="cards">
      <h2 className="cards-title">Cards</h2>

      <div className="cards-block">
        <h3 className="cards-block__title">Hover</h3>
        {/* Card 1 */}
        <>
          <Card
            record={records[0]}
            hover={false}
            id="card1"
            onCopy={handleCopyCard}
          />

          {copiedId === "card1" && <div className="copied-label">Copied!</div>}
        </>

        {/* Card 2 */}
        <>
          <Card
            record={records[0]}
            hover={true}
            id="card2"
            onCopy={handleCopyCard}
          />

          {copiedId === "card2" && <div className="copied-label">Copied!</div>}
        </>
      </div>
    </div>
  );
}
