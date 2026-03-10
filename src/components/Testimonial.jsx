import React, { useState, useEffect } from "react";
import { iconCommas } from "../data.js";
import EditableText from "./EditableText";
import ImageUploader from "./ImageUploader";

// Кастомный хук для медиа-запросов
function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, [matches, query]);

  return matches;
}

export default function Testimonial({ data, setData }) {
  const [copied, setCopied] = useState(false);
  const isMobile = useMediaQuery("(max-width: 850px)");
  function update(field, value) {
    setData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }
  function generateComponent(data) {
    return `import React from "react";

export default function Testimonial() {
function useMediaQuery(query) {
  const [matches, setMatches] = React.useState(false);

  React.useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, [matches, query]);
  return matches;
}
  const isMobile = useMediaQuery("(max-width: 850px)");
  return (
    <div style={{
    maxWidth: isMobile ? "376px" : "1358px",
    backgroundColor: isMobile ? "#fff" : "transparent",
    paddingTop: "96px",
    paddingBottom: isMobile ? "0px" : "96px",
    position: "relative",
    marginBottom: "35px",
  }}>
      <div style={{
    width: isMobile ? "344px" : "384px",
    height: isMobile ? "206px" : "464px",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "12px",
    position: "absolute",
    top: isMobile ? "0px" : "64px",
    left: "16px",
  }}>
        <img
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          src="${data.avatar}"
          alt="Avatar"
        />
      </div>
      <div style={{
    backgroundColor: "#2545B8",
    padding: isMobile ? "151px 16px 64px 16px" : "80px 71px 80px 487px",
  }}>
        <div
          style={{
            marginBottom: "24px",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="44"
            height="36"
            viewBox="0 0 44 36"
            fill="none"
          >
            <path
              d="M12.528 0C5.184 5.184 0 13.68 0 23.04C0 30.672 4.608 35.136 9.936 35.136C14.976 35.136 18.72 31.104 18.72 26.352C18.72 21.6 15.408 18.144 11.088 18.144C10.224 18.144 9.072 18.288 8.784 18.432C9.504 13.536 14.112 7.776 18.72 4.896L12.528 0ZM37.296 0C30.096 5.184 24.912 13.68 24.912 23.04C24.912 30.672 29.52 35.136 34.848 35.136C39.744 35.136 43.632 31.104 43.632 26.352C43.632 21.6 40.176 18.144 35.856 18.144C34.992 18.144 33.984 18.288 33.696 18.432C34.416 13.536 38.88 7.776 43.488 4.896L37.296 0Z"
              fill="white"
              fillOpacity="0.25"
            />
          </svg>
        </div>
        <p
          style={{
            fontFamily: "Inter",
            fontSize: "24px",
            fontWeight: "500",
            lineHeight: "32px",
            marginBottom: "24px",
            color: "#ffffff",
          }}
        >
          ${data.text}
        </p>
        <p
          style={{
            fontFamily: "Inter",
            fontWeight: "700",
            fontSize: "16px",
            lineHeight: "24px",
            color: "#ffffff",
          }}
        >
          ${data.name}
        </p>
        <p
          style={{
            fontSize: "16px",
            fontFamily: "Inter",
            fontWeight: "500",
            lineHeight: "24px",
            color: "#ffffff",
          }}
        >
          ${data.position}
        </p>
      </div>
    </div>
  );
}
`;
  }
  function copyComponent(e) {
    const isEditable =
      e.target.closest(".editable-text") ||
      e.target.closest(".image-uploader") ||
      e.target.closest('input[type="file"]');

    if (isEditable) {
      return;
    }
    const componentCode = generateComponent(data);
   
    navigator.clipboard.writeText(componentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }
  const styleTestimonial = {
    maxWidth: isMobile ? "376px" : "1358px",
    backgroundColor: isMobile ? "#fff" : "transparent",
    paddingTop: "96px",
    paddingBottom: isMobile ? "0px" : "96px",
    position: "relative",
    marginBottom: "35px",
  };

  const styleAvatar = {
    width: isMobile ? "344px" : "384px",
    height: isMobile ? "206px" : "464px",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "12px",
    position: "absolute",
    top: isMobile ? "0px" : "64px",
    left: "16px",
  };
  const styleBlue = {
    backgroundColor: "#2545B8",
    padding: isMobile ? "151px 16px 64px 16px" : "80px 71px 80px 487px",
  };
  const styleText = {
    fontFamily: "Inter",
    fontSize: "24px",
    fontWeight: "500",
    lineHeight: "32px",
    marginBottom: "24px",
    color: "#ffffff",
  };
  const styleName = {
    fontFamily: "Inter",
    fontSize: "16px",
    fontWeight: "500",
    lineHeight: "24px",
    color: "#ffffff",
  };
  const stylePosition = {
    fontSize: "16px",
    fontFamily: "Inter",
    fontWeight: "500",
    lineHeight: "24px",
    color: "#ffffff",
  };
  const handleChildClick = (e) => {
    e.stopPropagation();
  };
  return (
    <div style={styleTestimonial} onClick={copyComponent}>
      {copied && (
        <div
          style={{
            position: "absolute",
            top: -20,
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
      <div style={styleAvatar} onClick={handleChildClick}>
        <ImageUploader
          className="image-uploader"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          src={data.avatar}
          onChange={(v) => update("avatar", v)}
          alt={data.alt}
        />
      </div>
      <div style={styleBlue}>
        <div
          style={{
            marginBottom: "24px",
          }}
          dangerouslySetInnerHTML={{
            __html: iconCommas,
          }}
        />
        <EditableText
          className="editable-text"
          style={styleText}
          value={data.text}
          onChange={(v) => update("text", v)}
          onClick={handleChildClick}
        />
        <EditableText
          className="editable-text"
          style={styleName}
          value={data.name}
          onChange={(v) => update("name", v)}
          onClick={handleChildClick}
        />
        <EditableText
          className="editable-text"
          style={stylePosition}
          value={data.position}
          onChange={(v) => update("position", v)}
          onClick={handleChildClick}
        />
      </div>
    </div>
  );
}
