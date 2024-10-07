// src/pages/HomePage.tsx
import React from "react";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { Feed } from "../components/Feed";
import { RightSidebar } from "../components/RightSidebar";

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen w-screen  bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Content */}
      <div className="pt-20 w-full w-screen max-w-screen-lg mx-auto flex justify-between space-x-6">
        <Sidebar />
        <Feed />
        <RightSidebar />
      </div>
    </div>
  );
};

export default HomePage;
