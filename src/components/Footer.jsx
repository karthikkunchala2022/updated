import React from "react";

function Footer() {
  return (
    <footer className="bg-black text-gray-400 text-sm py-4">
      <div className="max-w-7xl mx-auto px-4 text-center">
        © {new Date().getFullYear()} Admin Module. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
