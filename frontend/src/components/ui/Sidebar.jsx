// src/components/Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom"; // Assuming you might want navigation links in a sidebar

function Sidebar() {
  return (
    <aside className="w-64 bg-gray-800 text-white p-6 flex flex-col">
      <h2 className="text-2xl font-bold mb-6">Docs Agent</h2>
      <nav className="flex-1">
        <ul className="space-y-2">
          <li>
            <Link to="/Dashboard" className="block py-2 px-4 rounded hover:bg-gray-700">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/upload" className="block py-2 px-4 rounded hover:bg-gray-700">
              Upload Docs
            </Link>
          </li>
          <li>
            <Link to="/chat" className="block py-2 px-4 rounded hover:bg-gray-700">
              Chat Q&A
            </Link>
          </li>
          <li>
            <Link to="/docs" className="block py-2 px-4 rounded hover:bg-gray-700">
              View Docs
            </Link>
          </li>
          <li>
            <Link to="/profile" className="block py-2 px-4 rounded hover:bg-gray-700">
              Profile
            </Link>
          </li>
        </ul>
      </nav>
      <div className="mt-auto">
        {/* You can add logout button or user info here later */}
        <Link to="/" className="block py-2 px-4 rounded hover:bg-gray-700">
          Logout
        </Link>
      </div>
    </aside>
  );
}

export default Sidebar;