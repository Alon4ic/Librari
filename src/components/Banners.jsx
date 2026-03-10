import React from "react";
import { materials } from "../data";
import Banner from "./Banner";

export default function Banners() {
  const [copiedId, setCopiedId] = React.useState(null);
  

  function generateComponent(material, text, isMulti) {
    return `import React from "react";

function ${material.name}${isMulti ? "Banner" : "SingleBanner"}() {
  return (
    <div style={{
      padding: "${isMulti ? "16px" : "16px"}",
      display: "flex",
      alignItems: "${isMulti ? "flex-start" : "center"}",
      width: "100%",
      maxWidth: "800px",
      backgroundColor: "${material.background}",
      borderRadius: "6px",
      fontFamily: "Inter, sans-serif",
      gap: "12px"
    }}>
      <div>
        ${material.icon}
      </div>

      ${
        isMulti
          ? `<div>
        <h5 style={{
          margin: "0 0 8px 0",
          color: "${material.colorTitle}",
          fontSize: "16px",
          fontWeight: "600"
        }}>
          ${material.title}
        </h5>

        <p style={{
          margin: 0,
          color: "${material.colorText}",
          fontSize: "14px",
          lineHeight: "1.5"
        }}>
          ${text}
        </p>
      </div>`
          : `<h5 style={{
        margin: 0,
        color: "${material.colorTitle}",
        fontSize: "14px",
        fontWeight: "500"
      }}>
        ${material.title}
      </h5>`
      }
    </div>
  );
}

export default ${material.name}${isMulti ? "Banner" : "SingleBanner"};`;
  }

  function handleCopy(material, text, type) {
    const code = generateComponent(material, text, type === "multi");

    navigator.clipboard.writeText(code);

    setCopiedId(`${type}-${material.id}`);

    setTimeout(() => setCopiedId(null), 1000);
  }

  return (
    <div className="banner">
      <h2 className="banner-title">Banners</h2>

      <div className="banner-inner">
        <div className="multi">
          <h3 className="multi-title">Multi line</h3>

          {materials.map((material) => (
            <div key={material.id} className="multi-block">
              <div className="multi-block__title">
                <h4>{material.name}</h4>
              </div>
              <Banner
                type="multi"
                material={material}
                copiedId={copiedId}
                editable={true}
                onCopy={(text) => handleCopy(material, text, "multi")}
              />
            </div>
          ))}
        </div>

        <div className="single">
          <h3 className="single-title">Single Line</h3>

          {materials.map((material) => (
            <div key={material.id} className="single-block">
              <Banner
                type="single"
                material={material}
                copiedId={copiedId}
                editable={false}
                onCopy={() => handleCopy(material, "", "single")}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
