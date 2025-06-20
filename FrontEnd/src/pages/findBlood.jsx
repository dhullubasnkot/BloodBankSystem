"use client";

import { useState, useEffect } from "react";
import { getAllDonors } from "../api/getAllDonors";

export default function FindBlood() {
  const [searchTerm, setSearchTerm] = useState("");
  const [donors, setDonors] = useState([]);
  const [filteredDonors, setFilteredDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showAll, setShowAll] = useState(false);
  const initialDisplayCount = 5;

  const fetchDonors = async () => {
    setLoading(true);
    setError("");
    setShowAll(false);
    try {
      const data = await getAllDonors();
      setDonors(data);
    } catch (err) {
      setError("Failed to load donor data.");
      setDonors([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (donors.length > 0) {
      const term = searchTerm.trim().toLowerCase();

      if (!term) {
        setFilteredDonors(donors);
        return;
      }

      const results = donors.filter((d) => {
        return (
          d.bloodGroup?.toLowerCase().includes(term) ||
          d.district?.toLowerCase().includes(term) ||
          d.city?.toLowerCase().includes(term)
        );
      });

      setFilteredDonors(results);
    } else {
      setFilteredDonors([]);
    }
  }, [searchTerm, donors]);

  const donorsToDisplay = showAll
    ? filteredDonors
    : filteredDonors.slice(0, initialDisplayCount);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-center mb-6 text-red-700">
        Find Blood Donors
      </h1>

      <div className="flex justify-center mb-8 gap-4">
        <input
          type="text"
          placeholder="Search by blood group, district or city"
          className="border border-gray-300 rounded-md p-2 w-80"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") fetchDonors();
          }}
        />
        <button
          className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition"
          onClick={fetchDonors}
          disabled={loading}
        >
          {loading ? "Loading..." : "Search"}
        </button>
      </div>

      {error && <p className="text-center text-red-500 mb-4">{error}</p>}

      {donorsToDisplay.length > 0 ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {donorsToDisplay.map((donor) => (
            <div
              key={donor.id}
              className="bg-white p-4 border rounded-lg shadow-md hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold text-red-600 mb-1">
                {donor.name}
              </h2>
              <p>
                <strong>Blood Group:</strong> {donor.bloodGroup}
              </p>
              <p>
                <strong>Contact:</strong>{" "}
                <a
                  href={`tel:${donor.contact}`}
                  className="text-blue-600 underline"
                >
                  {donor.contact}
                </a>
              </p>
              <p>
                <strong>District:</strong> {donor.district}
              </p>
              <p>
                <strong>City:</strong> {donor.city}
              </p>
            </div>
          ))}
        </div>
      ) : (
        !loading && (
          <p className="text-center text-gray-500 mt-6">
            No donors found matching "{searchTerm}"
          </p>
        )
      )}

      {filteredDonors.length > initialDisplayCount && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition"
          >
            {showAll ? "Show Less" : "See More"}
          </button>
        </div>
      )}
    </div>
  );
}
