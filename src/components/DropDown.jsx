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
        left: buttonRect.right - 160 + window.scrollX, // Adjusted for dropdown width
        transformOrigin: showAbove ? "bottom" : "top",
      });
    }

    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        !buttonRef.current.contains(e.target)
      ) {
        onClose();
      }
    };

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
      className="absolute z-50 w-40 bg-white border border-gray-200 rounded-lg shadow-lg text-sm animate-dropdown"
      style={{
        position: "absolute",
        top: position.top,
        left: position.left,
        transformOrigin: position.transformOrigin,
      }}
    >
      <style jsx>{`
        @keyframes dropdown {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-dropdown {
          animation: dropdown 0.2s ease-out forwards;
        }
      `}</style>
      <ul className="divide-y divide-gray-100">
        {children.map((child, index) => (
          <li key={index} className="hover:bg-gray-100">
            {child}
          </li>
        ))}
      </ul>
    </div>,
    document.body
  );
}