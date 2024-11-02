import React, { useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { Feed } from "../components/Feed";
import { RightSidebar } from "../components/RightSidebar";
import { useUser } from "../context/UserContext";

const HomePage: React.FC = () => {
  const { user } = useUser();
  useEffect(() => {
    console.log("user", user);
  }),
    [];

  return (
    <div className="min-h-screen w-screen bg-gray-100">
      <Navbar />

      <div className="pt-20 w-full w-screen max-w-screen-lg mx-auto flex justify-between space-x-6">
        <Sidebar user={user} />
        <Feed />
        <RightSidebar />
      </div>
    </div>
  );
};

export default HomePage;
