import React from "react";

export default function ImageUploader({ src, onChange, style }) {
  function handleFile(e) {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      onChange(reader.result);
    };

    reader.readAsDataURL(file);
  }

  return (
    <label style={{ cursor: "pointer" }}>
      <img src={src} alt="" style={style} />

      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFile}
      />
    </label>
  );
}
