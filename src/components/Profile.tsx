import React, { useState } from "react";

interface ProfileProps {
  role: "artist" | "funder";
}

const Profile: React.FC<ProfileProps> = ({ role }) => {
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  const handleProfileUpdate = () => {
    // Implement profile update functionality
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        className="w-full p-2 border rounded mb-4"
      />
      <textarea
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        placeholder="Bio"
        className="w-full p-2 border rounded mb-4"
      />
      <input
        type="url"
        value={photoUrl}
        onChange={(e) => setPhotoUrl(e.target.value)}
        placeholder="Profile Picture URL"
        className="w-full p-2 border rounded mb-4"
      />
      <button
        onClick={handleProfileUpdate}
        className="bg-purple-500 text-white px-6 py-2 rounded"
      >
        Update Profile
      </button>

      {role === "artist" && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold">Funds Received</h2>
          {/* Display received funds here */}
        </div>
      )}
    </div>
  );
};

export default Profile;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const ProfileSetup: React.FC = () => {
//   const [username, setUsername] = useState("");
//   const [bio, setBio] = useState("");
//   const [photo, setPhoto] = useState<File | null>(null);
//   const navigate = useNavigate();

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setPhoto(e.target.files[0]);
//     }
//   };

//   const handleProfileSetup = () => {
//     // Save user profile setup and navigate to feed page
//     navigate("/home");
//   };

//   return (
//     <div className="flex flex-col items-center min-h-screen bg-white">
//       <h1 className="text-2xl font-bold mb-6">Set Up Your Profile</h1>
//       <input
//         type="text"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//         placeholder="Username"
//         className="mb-4 px-4 py-2 border rounded w-80"
//       />
//       <textarea
//         value={bio}
//         onChange={(e) => setBio(e.target.value)}
//         placeholder="Bio"
//         className="mb-4 px-4 py-2 border rounded w-80"
//       />
//       <input type="file" onChange={handleFileChange} className="mb-4" />
//       <button onClick={handleProfileSetup} className="bg-purple-500 text-white px-6 py-2 rounded">
//         Save and Continue
//       </button>
//     </div>
//   );
// };

// export default ProfileSetup;
