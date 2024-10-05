// src/components/RightSidebar.tsx
import React from "react";

export const RightSidebar: React.FC = () => {
  return (
    <aside className="hidden lg:block lg:w-1/4 bg-white p-4 shadow-md rounded-lg">
      <h3 className="font-semibold mb-4">Popular Artists</h3>
      <ul className="space-y-4">
        <li>
          <a href="#" className="text-blue-600 hover:underline">
            Jane Doe
          </a>
        </li>
        <li>
          <a href="#" className="text-blue-600 hover:underline">
            John Smith
          </a>
        </li>
        <li>
          <a href="#" className="text-blue-600 hover:underline">
            Alice Johnson
          </a>
        </li>
      </ul>
    </aside>
  );
};
