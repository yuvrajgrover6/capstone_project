import React, { useState } from "react";
import Modal from "../components/Modal";
import SignupForm from "../components/SignupForm";
import LoginForm from "../components/LoginForm";
import { FaPaintBrush, FaGlobe, FaUsers } from "react-icons/fa";

const WelcomePage: React.FC = () => {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFunderSignup, setIsFunderSignup] = useState(false);

  const handleFunderSignupClick = () => {
    setIsFunderSignup(true);
    setIsModalOpen(true);
  };

  const handleArtistSignupClick = () => {
    setIsFunderSignup(false);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen w-screen text-white font-sans">
      {/* Header with Background Image */}
      <header
        className="relative h-screen w-full bg-cover bg-center"
        style={{
          backgroundImage: `url(("./assets/your-image.jpg")})`,
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-purple-500/70"></div>

        {/* Header Content */}
        <div className="relative flex justify-between items-center py-6 px-8 z-10">
          <h1 className="text-4xl font-bold tracking-wide">CreativeHub</h1>
          <nav className="space-x-6">
            <button
              onClick={() => setLoginOpen(true)}
              className="hover:underline"
            >
              Login
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-white text-purple-700 px-4 py-2 rounded hover:bg-gray-100"
            >
              Sign Up
            </button>
          </nav>
        </div>

        {/* Hero Text */}
        <main className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-16 h-full">
          <h2 className="text-6xl font-bold mb-6 leading-tight">
            Empowering Art <br /> Through Community
          </h2>
          <p className="max-w-2xl mb-10 text-lg">
            Join our platform to discover amazing art and support artists from
            around the world by funding their projects.
          </p>
          <div className="space-x-4">
            <button
              onClick={handleFunderSignupClick}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
            >
              Join as Funder
            </button>
            <button
              onClick={handleArtistSignupClick}
              className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition"
            >
              Join as Artist
            </button>
          </div>
        </main>
      </header>

      {/* Features Section */}
      <section className="py-16 bg-gray-100 text-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-4xl font-semibold text-center mb-12 text-gray-900">
            Why Join CreativeHub?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            <FeatureCard
              icon={<FaPaintBrush />}
              title="Support Talented Artists"
              description="Fund creative projects from talented artists and help bring their art to life."
            />
            <FeatureCard
              icon={<FaGlobe />}
              title="Discover Unique Creations"
              description="Browse through a diverse collection of artwork from artists around the world."
            />
            <FeatureCard
              icon={<FaUsers />}
              title="Build a Thriving Community"
              description="Be a part of a community that celebrates and uplifts artistic talent."
            />
          </div>
        </div>
      </section>

      {/* Modals */}
      <Modal isOpen={isLoginOpen} onClose={() => setLoginOpen(false)}>
        <LoginForm onClose={() => setLoginOpen(false)} />
      </Modal>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <SignupForm
          type={isFunderSignup ? "user" : "artist"}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-indigo-900 to-purple-800 py-8 text-center text-gray-200">
        <p>© 2024 CreativeHub. All rights reserved.</p>
      </footer>
    </div>
  );
};

// Feature Card Component
const FeatureCard: React.FC<{
  icon: any;
  title: string;
  description: string;
}> = ({ icon, title, description }) => (
  <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition transform hover:scale-105 text-center">
    <div className="text-5xl mb-4 flex justify-center items-center">{icon}</div>
    <h4 className="text-xl font-semibold mb-2 text-gray-900">{title}</h4>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default WelcomePage;
