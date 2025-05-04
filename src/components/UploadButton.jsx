// src/components/UploadButton.jsx
import { useRef } from "react";

export default function UploadButton({ files, setFiles, multiple = false }) {
  const inputRef = useRef();

  const handleChange = (e) => {
    const selected = Array.from(e.target.files);
    setFiles(multiple ? [...files, ...selected] : selected);
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => inputRef.current.click()}
        className="px-4 py-2 bg-orange-400 text-white rounded hover:bg-orange-600"
      >
        {multiple ? "Upload File(s)" : "Upload File"}
      </button>
      <input
        type="file"
        ref={inputRef}
        onChange={handleChange}
        className="hidden"
        {...(multiple ? { multiple: true } : {})}
      />
    </div>
  );
}
