import React, { useState } from "react";
import Modal from "../components/Modal";
import SignupForm from "../components/SignupForm";
import LoginForm from "../components/LoginForm";
import { FaPaintBrush, FaGlobe, FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import headerImage from "../assets/header_image.jpg";

const WelcomePage: React.FC = () => {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFunderSignup, setIsFunderSignup] = useState(false);
  const navigate = useNavigate();

  const openLogin = () => {
    setLoginOpen(true);
  };

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
          backgroundImage: `url(${headerImage})`,
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-purple-700/80"></div>

        {/* Header Content */}
        <div className="relative flex justify-between items-center py-6 px-8 z-10">
          {/* CreativeHub Logo Text with Multicolor Effect */}
          <h1 className="text-5xl font-extrabold tracking-wide bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent animate-gradient-slide">
            CreativeHub
          </h1>
          <nav className="space-x-6">
            <button
              onClick={() => setLoginOpen(true)}
              className="hover:underline text-lg"
              aria-label="Login"
            >
              Login
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-white text-purple-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition font-semibold"
              aria-label="Sign Up"
            >
              Sign Up
            </button>
            <button
              onClick={() => navigate("/guest-feed")}
              className="hover:underline text-lg text-gray-200"
              aria-label="View as Guest"
            >
              View as Guest
            </button>
          </nav>
        </div>

        {/* Hero Text with Gradient Effect */}
        <main className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-16 h-full">
          <h2 className="text-6xl font-extrabold mb-6 leading-tight max-w-4xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent">
            Empowering Art, One Fund at a Time
          </h2>
          <p className="max-w-3xl mb-10 text-lg text-gray-200">
            Welcome to CreativeHub - a platform dedicated to uplifting artists.
            Whether you're an artist looking to showcase your work or a funder
            eager to support the creative community, join us to make a
            difference in the world of art.
          </p>
          <div className="space-x-4">
            <button
              onClick={handleFunderSignupClick}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition text-lg font-medium animate-bounce"
            >
              Join as Funder
            </button>
            <button
              onClick={handleArtistSignupClick}
              className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition text-lg font-medium animate-bounce"
            >
              Join as Artist
            </button>
          </div>
        </main>
      </header>

      {/* About Section */}
      <section className="py-20 bg-white text-gray-800">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h3 className="text-4xl font-semibold text-gray-900 mb-4">
            Why Join CreativeHub?
          </h3>
          <p className="text-lg max-w-2xl mx-auto mb-12">
            CreativeHub is more than just a platform – it's a thriving community
            that empowers artists and enables funders to make an impact. Artists
            can showcase their art, attract patrons, and receive funding, while
            funders can explore unique pieces and contribute to a vibrant
            creative ecosystem.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            <FeatureCard
              icon={<FaPaintBrush />}
              title="Support Talented Artists"
              description="Fund creative projects and help bring artistic visions to life."
            />
            <FeatureCard
              icon={<FaGlobe />}
              title="Discover Unique Art"
              description="Browse a diverse collection of artworks from global artists."
            />
            <FeatureCard
              icon={<FaUsers />}
              title="Build a Community"
              description="Be part of a community that celebrates and supports creativity."
            />
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="bg-gradient-to-r from-purple-700 to-indigo-600 text-white py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Make an Impact?</h3>
          <p className="text-lg mb-8">
            Join CreativeHub today. Whether you're an artist seeking to inspire
            the world or a funder eager to support the creative journey, there’s
            a place for you here.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-white text-purple-700 px-6 py-3 rounded-lg shadow-md font-semibold text-lg hover:bg-gray-100 transition"
          >
            Get Started
          </button>
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
          openLogin={openLogin}
        />
      </Modal>

      {/* Footer */}
      <footer className="bg-gray-900 py-8 text-center text-gray-400">
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
  <div className="p-6 bg-gray-100 rounded-lg shadow-lg hover:shadow-2xl transition transform hover:scale-105 text-center">
    <div className="text-5xl mb-4 text-purple-700 flex justify-center items-center">
      {icon}
    </div>
    <h4 className="text-2xl font-semibold mb-2 text-gray-900">{title}</h4>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default WelcomePage;
