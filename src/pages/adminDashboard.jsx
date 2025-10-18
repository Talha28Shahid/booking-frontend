import { useState, useEffect } from "react";
import api from "../services/axios";

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [managers, setManagers] = useState([]);
  const [newManagerEmail, setNewManagerEmail] = useState("");
  const [newManagerPassword, setNewManagerPassword] = useState("");
  const [name, setName] = useState("");

  // Fetch all bookings
  const fetchBookings = async () => {
    try {
      const res = await api.get("/api/bookings");
      setBookings(res.data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };

  // Fetch all managers
  const fetchManagers = async () => {
    try {
      const res = await api.get("/api/users/manager");
      setManagers(res.data);
    } catch (err) {
      console.error("Error fetching managers:", err);
    }
  };

  // Update booking status
  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/api/bookings/${id}/status`, { status });
      fetchBookings();
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  // Create manager
  const createManager = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/users/manager", {
        email: newManagerEmail,
        password: newManagerPassword,
        name: name,
      });
      setNewManagerEmail("");
      setNewManagerPassword("");
      setName("");
      fetchManagers();
    } catch (err) {
      console.error("Error creating manager:", err);
    }
  };

  // Delete manager
  const deleteManager = async (id) => {
    try {
      await api.delete(`/api/users/manager/${id}`);
      fetchManagers();
    } catch (err) {
      console.error("Error deleting manager:", err);
    }
  };

  useEffect(() => {
    fetchBookings();
    fetchManagers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Bookings Section */}
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-2">All Bookings</h3>
            <ul className="space-y-4">
              {bookings.map((b) => (
                <li
                  key={b._id}
                  className="border p-4 rounded bg-gray-50"
                >
                  <p>
                    <strong>User:</strong> {b.user?.name || "Unknown"}
                  </p>
                  <p>
                    <strong>Vehicle:</strong> {b.vehicleType}
                  </p>
                  <p>
                    <strong>Issue:</strong> {b.issueDescription}
                  </p>
                  <p>
                    <strong>Date:</strong> {b.preferredDate}
                  </p>
                  <p>
                    <strong>Location:</strong> {b.location}
                  </p>
                  <p>
                    <strong>Status:</strong> {b.status}
                  </p>
                  <div className="mt-2 space-x-2">
                    {["Pending", "Approved", "Rejected"].map((status) => (
                      <button
                        key={status}
                        onClick={() => updateStatus(b._id, status)}
                        className={`px-3 py-1 rounded ${
                          b.status === status
                            ? "bg-gray-300"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Manager Section */}
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-2">Manage Managers</h3>
            <form
              onSubmit={createManager}
              className="grid grid-cols-1 gap-4 mb-6"
            >
              <input
                type="sring"
                placeholder="Manager Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border px-4 py-2 rounded"
                required
              />
              <input
                type="email"
                placeholder="Manager Email"
                value={newManagerEmail}
                onChange={(e) => setNewManagerEmail(e.target.value)}
                className="border px-4 py-2 rounded"
                required
              />
              <input
                type="password"
                placeholder="Manager Password"
                value={newManagerPassword}
                onChange={(e) => setNewManagerPassword(e.target.value)}
                className="border px-4 py-2 rounded"
                required
              />

              <button
                type="submit"
                className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
              >
                Create Manager
              </button>
            </form>

            <ul className="space-y-2">
              {managers.map((m) => (
                <li
                  key={m._id}
                  className="flex justify-between items-center border p-4 rounded bg-gray-50"
                >
                  <span>{m.email}</span>
                  <button
                    onClick={() => deleteManager(m._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
