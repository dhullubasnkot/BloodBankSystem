import React, { useState, useEffect } from "react";
import GetAllDonors from "../api/donors/getAllDonors";

export default function FindBlood() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const donors = await GetAllDonors();
        setData(donors);
      } catch (err) {
        setError(err.message || "Failed to fetch donors");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredDonors = data.filter(
    (donor) =>
      donor.user?.name?.toLowerCase().includes(query.toLowerCase()) ||
      donor.district?.toLowerCase().includes(query.toLowerCase()) ||
      donor.city?.toLowerCase().includes(query.toLowerCase()) ||
      donor.bloodGroup?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center text-red-700 mb-10">
          Find Blood Donors
        </h2>

        <div className="flex justify-center mb-10">
          <input
            type="text"
            placeholder="Search by name, blood group, district, or city..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full max-w-lg px-5 py-3 border border-gray-300 rounded-lg shadow-sm
                       focus:outline-none focus:ring-2 focus:ring-red-500 transition"
          />
        </div>

        {loading && (
          <p className="text-center text-gray-600 text-lg">Loading donors...</p>
        )}

        {error && (
          <p className="text-center text-red-600 font-semibold">{error}</p>
        )}

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDonors.length > 0 ? (
            filteredDonors.map((donor) => (
              <div
                key={donor.id}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {donor.user?.name || "Unknown"}
                </h3>
                <p className="text-sm text-gray-700 mb-1">
                  <span className="font-medium">Blood Group:</span>{" "}
                  {donor.bloodGroup
                    .replace("_POS", "+")
                    .replace("_NEG", "-")
                    .replace("_", "")}
                </p>
                <p className="text-sm text-gray-700 mb-1">
                  <span className="font-medium">District:</span>{" "}
                  {donor.district}
                </p>
                <p className="text-sm text-gray-700 mb-1">
                  <span className="font-medium">City:</span> {donor.city}
                </p>
                <p className="text-sm text-gray-700 mb-2">
                  <span className="font-medium">Last Donated:</span>{" "}
                  {donor.lastDonated
                    ? new Date(donor.lastDonated).toLocaleDateString()
                    : "N/A"}
                </p>
                <p
                  className={`text-sm font-semibold ${
                    donor.available ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {donor.available ? "Available" : "Unavailable"}
                </p>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 text-lg">
              No matching donors found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
