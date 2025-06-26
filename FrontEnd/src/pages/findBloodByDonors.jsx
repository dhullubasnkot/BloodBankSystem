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
    <>
      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-red-700 mb-8">
            Find Blood Donors
          </h2>

          <div className="flex justify-center mb-8">
            <input
              type="text"
              placeholder="Search by name, blood group, district or city..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full max-w-md px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-400"
            />
          </div>

          {loading && <div className="text-center">Loading...</div>}
          {error && (
            <div className="text-center text-red-500">Error: {error}</div>
          )}

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredDonors.length > 0 ? (
              filteredDonors.map((donor) => (
                <div key={donor.id} className="bg-white rounded-md shadow p-5">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {donor.user?.name || "Unknown"}
                  </h3>
                  <p className="text-sm text-gray-600">
                    <strong>Blood Group:</strong>{" "}
                    {donor.bloodGroup
                      .replace("_", " ")
                      .replace("POS", "+")
                      .replace("NEG", "-")}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>District:</strong> {donor.district}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>City:</strong> {donor.city}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Last Donated:</strong>{" "}
                    {donor.lastDonated
                      ? new Date(donor.lastDonated).toLocaleDateString()
                      : "N/A"}
                  </p>
                  <p className="text-sm mt-2 font-medium text-green-600">
                    {donor.available ? "Available" : "Unavailable"}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-full">
                No matching donors found.
              </p>
            )}
          </div>
          {/* <div className="flex justify-end mt-8">
            <button
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded shadow"
              onClick={() => (window.location.href = "/next-page")}
            >
              Next Page
            </button>
          </div> */}
        </div>
      </div>
    </>
  );
}
