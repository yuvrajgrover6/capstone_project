import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LoginModal } from "../components/LoginModal";
import { SignupModal } from "../components/SignupModal";
import Modal from "../components/Modal";
import SignupForm from "../components/SignupForm";

const WelcomePage: React.FC = () => {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isSignupOpen, setSignupOpen] = useState(false);
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

  // const openFunderSignup = () => {
  //   setFunderSignup(true);
  //   setSignupOpen(true);
  // };
  // const openSignup = () => {
  //   setFunderSignup(false);
  //   setSignupOpen(true);
  // };
  return (
    <div className="min-h-screen w-screen w-full bg-gradient-to-r from-purple-400 to-indigo-500 text-white font-sans">
      {/* Header */}
      <header className="flex justify-between items-center py-4 px-8">
        <h1 className="text-3xl font-bold">CreativeHub</h1>
        <nav className="space-x-6">
          <button
            onClick={() => setLoginOpen(true)}
            className="hover:underline"
          >
            Login
          </button>
          <button
            onClick={() => setSignupOpen(true)}
            className="bg-white text-purple-700 px-4 py-2 rounded hover:bg-gray-100"
          >
            Sign Up
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center text-center px-6 py-16">
        <h2 className="text-5xl font-bold mb-4">
          Empowering Art Through Community
        </h2>
        <p className="max-w-2xl mb-8 text-lg">
          Join our platform to discover amazing art and support artists from
          around the world by funding their projects. Make a difference in the
          creative world!
        </p>

        <div className="flex space-x-4 mt-6">
          {/* <Link
            to="/explore"
            className="bg-white text-purple-700 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-gray-100 transition"
          >
            Explore Art
          </Link>

          <button
            onClick={openFunderSignup}
            className="bg-indigo-600 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-indigo-700 transition"
          >
            Join as Funder
          </button> */}
          <div className="mt-8 space-x-4">
            <button
              onClick={handleFunderSignupClick}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Join as Funder
            </button>

            <button
              onClick={handleArtistSignupClick}
              className="bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              Join as Artist
            </button>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="py-16 bg-white text-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-3xl font-semibold text-center mb-10">
            Why Join CreativeHub?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            <FeatureCard
              title="Support Talented Artists"
              description="Fund creative projects from talented artists and help bring their art to life."
            />
            <FeatureCard
              title="Discover Unique Creations"
              description="Browse through a diverse collection of artwork from artists around the world."
            />
            <FeatureCard
              title="Build a Thriving Community"
              description="Be a part of a community that celebrates and uplifts artistic talent."
            />
          </div>
        </div>
      </section>
      {/* Modals */}
      {isLoginOpen && <LoginModal onClose={() => setLoginOpen(false)} />}
      {isSignupOpen && (
        <SignupModal
          onClose={() => setSignupOpen(false)}
          isFunderSignup={isFunderSignup}
        />
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <SignupForm
          type={isFunderSignup ? "user" : "artist"}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>

      {/* Footer */}
      <footer className="bg-gray-900 py-8 text-center text-gray-400">
        <p>© 2024 CreativeHub. All rights reserved.</p>
      </footer>
    </div>
  );
};

const FeatureCard: React.FC<{ title: string; description: string }> = ({
  title,
  description,
}) => (
  <div className="p-6 bg-gray-100 rounded-lg shadow-md text-center">
    <h4 className="text-xl font-semibold mb-2">{title}</h4>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default WelcomePage;
