import { useState, useEffect } from "react";
import api from "../services/axios";

export default function ManagerDashboard() {
  const [bookings, setBookings] = useState([]);

  const fetchAllBookings = async () => {
    try {
      const res = await api.get("/api/bookings"); // Manager sees all bookings
      setBookings(res.data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await api.patch(`/api/bookings/${id}/status`, { status: newStatus });
      fetchAllBookings(); // refresh after update
    } catch (err) {
      console.error("Status update failed:", err);
    }
  };

  useEffect(() => {
    fetchAllBookings();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Manager Dashboard</h2>
        {bookings.length === 0 ? (
          <p className="text-gray-500">No bookings found.</p>
        ) : (
          <ul className="space-y-4">
            {bookings.map((b) => (
              <li
                key={b._id}
                className="border p-4 rounded bg-gray-50"
              >
                <p>
                  <strong>User:</strong> {b.userId?.name || "Unknown"}
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
        )}
      </div>
    </div>
  );
}
