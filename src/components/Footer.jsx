import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4 text-center fixed bottom-0 w-full mt-10">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} Career Path Advisor. All rights
        reserved.
      </p>
    </footer>
  );
}

export default Footer;
