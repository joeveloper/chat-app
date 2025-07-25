"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ROOM_API } from "@/services/roomService";
import { ROUTES } from "@/constants/routes";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useAuth } from "@/hooks/useAuth";
interface Room {
  id: string;
  name: string;
}

const Rooms: React.FC = () => {
  const { logOut } = useAuth();

  const [rooms, setRooms] = useState<Room[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [loading, setLoading] = useState(false);
  const [creatingRoom, setCreatingRoom] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (!token) {
      router.replace(ROUTES.SIGN_IN);
    }
  }, []);

  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true);
      try {
        const data = await ROOM_API.getRooms();
        console.log("here", data);
        setRooms(data);
      } catch (error) {
        alert("Error fetching rooms");
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  const handleCreateRoom = async () => {
    if (!roomName.trim()) return alert("Room name cannot be empty!");

    setCreatingRoom(true);
    try {
      const newRoom = await ROOM_API.createRoom(roomName);

      if (!newRoom || !newRoom.id || !newRoom.name) {
        console.error("Invalid room data:", newRoom);
        alert("Room created, but response was invalid.");
      }
      setRooms([...rooms, { id: newRoom.id, name: newRoom.name }]);

      setShowModal(false);
    } catch (error: any) {
      console.error(
        "Error creating room:",
        error.response ? error.response.data : error.message
      );
      alert("Failed to create room. Try again!");
    } finally {
      setCreatingRoom(false);
    }
  };

  const handleSignOut = () => {
    logOut();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="flex items-center justify-evenly mb-6">
        <div className="text-2xl font-bold text-gray-800">
          Available Chat Rooms
        </div>
        <button
          title="Create a new room"
          onClick={() => setShowModal(true)}
          className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full text-lg font-bold"
        >
          +
        </button>
        <button onClick={handleSignOut} className="w-6">
          Logout
        </button>
      </header>

      <main className="bg-white rounded-lg shadow p-6">
        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : rooms?.length === 0 ? (
          <p className="text-center text-gray-500">
            No rooms available. Create a new one!
          </p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {rooms?.map((room) => (
              <li key={room.id}>
                <Link
                  href={ROUTES.CHAT(room.id)}
                  className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                >
                  <div className="w-12 h-12 bg-blue-500 text-white flex items-center justify-center rounded-full text-xl font-bold">
                    {room.name ? room.name.charAt(0).toUpperCase() : "?"}
                  </div>
                  <span className="text-lg text-gray-800 font-medium">
                    {room.name || "Unnamed Room"}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Create Room</h2>
            <input
              type="text"
              placeholder="Enter room name"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-400"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={handleCreateRoom}
                disabled={creatingRoom}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {creatingRoom ? "Creating..." : "Create"}
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rooms;
