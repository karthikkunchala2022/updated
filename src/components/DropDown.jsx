import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function DropDown({ buttonRef, children, onClose }) {
  const [position, setPosition] = useState(null);
  const dropdownRef = useRef();

  useEffect(() => {
    if (buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const dropdownHeight = 106; // Approximate height of dropdown (3 items * ~35px per item)
      const viewportHeight = window.innerHeight;
      
      // Check if there's enough space below
      const spaceBelow = viewportHeight - buttonRect.bottom;
      const showAbove = spaceBelow < dropdownHeight;
      
      setPosition({
        top: showAbove 
          ? buttonRect.top - dropdownHeight + window.scrollY // Position above
          : buttonRect.bottom + window.scrollY, // Position below
        left: buttonRect.right - 128 + window.scrollX, // assuming dropdown width ~128px
        transformOrigin: showAbove ? 'bottom' : 'top'
      });
    }

    const handleClickOutside = e => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        !buttonRef.current.contains(e.target)
      ) {
        onClose();
      }
    };

    // Also close dropdown when scrolling
    const handleScroll = () => {
      onClose();
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("scroll", handleScroll, true);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("scroll", handleScroll, true);
    };
  }, [buttonRef, onClose]);

  if (!position) return null;

  return createPortal(
    <div
      ref={dropdownRef}
      className="absolute z-50 w-32 bg-white border rounded shadow text-sm"
      style={{
        position: "absolute",
        top: position.top,
        left: position.left,
        transformOrigin: position.transformOrigin,
        animation: "scaleIn 0.15s ease-out forwards",
      }}
    >
      <style jsx>{`
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
      {children}
    </div>,
    document.body
  );
}