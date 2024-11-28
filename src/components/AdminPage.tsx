import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { AdminService } from "../services/AdminServices";
import { useUser } from "../context/UserContext";
import { Navbar } from "./Navbar";

export const AdminPage: React.FC = () => {
  const [users, setUsers] = useState([]);
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"users" | "artists" | "all">("all");
  const { user } = useUser();
  const token = user?.token || "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userResponse, artistResponse] = await Promise.all([
          AdminService.getAllUsers(1, 10, token),
          AdminService.getAllArtists(1, 10, token),
        ]);
        console.log("usersss", userResponse);
        console.log("artistss", artistResponse);

        setUsers(userResponse.body.users);
        setArtists(artistResponse.body.artists);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  const handleDelete = async (id: string, type: "user" | "artist") => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete this ${type}?`
    );
    if (!confirmDelete) return;

    try {
      if (type === "user") {
        await AdminService.deleteUser(id, token);
        setUsers(users.filter((user: any) => user._id !== id));
      } else {
        await AdminService.deleteArtist(id, token);
        setArtists(artists.filter((artist: any) => artist._id !== id));
      }
    } catch (error) {
      console.error(`Error deleting ${type}:`, error);
    }
  };

  const renderTable = (data: any[], type: "user" | "artist") => (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-4">
        {type === "user" ? "Users" : "Artists"}
      </h2>
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Photo</th>
            <th className="border p-2">Created At</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: any) => (
            <tr key={item._id} className="text-center">
              <td className="border p-2">{item.name || "N/A"}</td>
              <td className="border p-2">{item.email || "N/A"}</td>
              <td className="border p-2">
                {item.photoUrl ? (
                  <img
                    src={item.photoUrl}
                    alt="Photo"
                    className="w-8 h-8 rounded-full mx-auto"
                  />
                ) : (
                  "N/A"
                )}
              </td>
              <td className="border p-2">
                {new Date(item.createdAt).toLocaleDateString()}
              </td>
              <td className="border p-2">
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDelete(item._id, type)}
                >
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  if (loading) return <div className="text-center mt-8">Loading...</div>;

  return (
    <div className="min-h-screen w-screen bg-gray-100">
      <Navbar />
      <div className="admin-page p-20 text-black bg-gray-100 min-h-screen p-6">
        <div className="bg-white p-6 shadow-md rounded-lg mb-6">
          <h1 className="text-2xl font-bold text-black mb-4">
            Admin Dashboard
          </h1>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <button
              className={`p-4 rounded-lg text-center ${
                view === "users"
                  ? "bg-blue-700 text-white"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
              onClick={() => setView("users")}
            >
              <h2 className="text-xl font-bold">Total Users</h2>
              <p className="text-3xl">{users.length}</p>
            </button>
            <button
              className={`p-4 rounded-lg text-center ${
                view === "artists"
                  ? "bg-green-700 text-white"
                  : "bg-green-500 text-white hover:bg-green-600"
              }`}
              onClick={() => setView("artists")}
            >
              <h2 className="text-xl font-bold">Total Artists</h2>
              <p className="text-3xl">{artists.length}</p>
            </button>
            <button
              className={`p-4 rounded-lg text-center ${
                view === "all"
                  ? "bg-gray-700 text-white"
                  : "bg-gray-500 text-white hover:bg-gray-600"
              }`}
              onClick={() => setView("all")}
            >
              <h2 className="text-xl font-bold">View All</h2>
            </button>
          </div>
        </div>

        {view === "users" && renderTable(users, "user")}
        {view === "artists" && renderTable(artists, "artist")}
        {view === "all" && (
          <>
            {renderTable(users, "user")}
            {renderTable(artists, "artist")}
          </>
        )}
      </div>
    </div>
  );
};
